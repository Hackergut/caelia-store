import { chromium, devices } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const BASE = "http://127.0.0.1:8080";
const DIR = "/workspace/screenshots/mobile";
mkdirSync(DIR, { recursive: true });

const out = [];
const issues = [];
const note = (ok, msg) => {
  out.push(`${ok ? "OK  " : "FAIL"} ${msg}`);
  if (!ok) issues.push(msg);
};

async function overflow(page) {
  return page.evaluate(() => {
    const dx = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth;
    const offenders = [...document.querySelectorAll("section, header, nav, img, h1, h2")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.right > window.innerWidth + 3 || r.left < -3;
      })
      .slice(0, 6)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return `${el.tagName}.${String(el.className).split(" ")[0] || "?"}`.trim() + `@${Math.round(r.width)}`;
      });
    return { dx, offenders };
  });
}

async function pressZoom(page, x, y) {
  await page.evaluate(({ x, y }) => {
    const t = document.elementFromPoint(x, y)?.closest("[data-zoom-stage]") || document.querySelector("[data-zoom-stage]");
    if (!t) return;
    const fire = (type) =>
      t.dispatchEvent(
        new PointerEvent(type, {
          bubbles: true,
          cancelable: true,
          pointerId: 1,
          pointerType: "touch",
          clientX: x,
          clientY: y,
          buttons: type === "pointerup" ? 0 : 1,
        }),
      );
    fire("pointerdown");
    fire("pointermove");
  }, { x, y });
  await page.waitForTimeout(200);
}

const browser = await chromium.launch({ headless: true });

for (const spec of [
  { name: "iphone", ...devices["iPhone 14"] },
  { name: "pixel", ...devices["Pixel 7"] },
]) {
  const context = await browser.newContext({ ...spec, locale: "it-IT" });
  const page = await context.newPage();
  page.setDefaultTimeout(25000);

  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  const heroWord = await page.locator("h1").first().innerText().catch(() => "");
  note(/CAELIA/i.test(heroWord), `${spec.name} hero word "${heroWord.slice(0, 40)}"`);
  await page.screenshot({ path: `${DIR}/${spec.name}-home-top.png` });

  const ovHome = await overflow(page);
  note(ovHome.dx <= 10, `${spec.name} home overflow dx=${ovHome.dx} ${ovHome.offenders.join(" ")}`);

  await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 0.9)));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${DIR}/${spec.name}-home-scrolled.png` });

  const burger = page.getByRole("button", { name: /menu/i }).first();
  const hasBurger = await burger.count();
  note(!!hasBurger, `${spec.name} burger`);
  if (hasBurger) {
    const box = await burger.boundingBox();
    note(!!box && box.height >= 40 && box.width >= 40, `${spec.name} burger ${Math.round(box?.width || 0)}×${Math.round(box?.height || 0)}`);
    await burger.click({ force: true });
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${DIR}/${spec.name}-menu.png` });
    const open = await page.locator("#menu-tenda").first().isVisible().catch(() => false);
    note(open, `${spec.name} menu opens`);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(150);
  }

  const info = page.locator("#info");
  if (await info.count()) {
    await info.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${DIR}/${spec.name}-info.png` });
    const infoBox = await info.boundingBox();
    note(!!infoBox && infoBox.height < 1500, `${spec.name} info h=${Math.round(infoBox?.height || 0)}`);

    const stage = info.locator("[data-zoom-stage]").first();
    const sbox = await stage.boundingBox();
    if (sbox) {
      note(sbox.height <= spec.viewport.height * 0.65, `${spec.name} stage h=${Math.round(sbox.height)} vh=${spec.viewport.height}`);
      const x = sbox.x + sbox.width * 0.36;
      const y = sbox.y + sbox.height * 0.42;
      await pressZoom(page, x, y);
      const loupe = await page.evaluate(() => {
        const lens = document.querySelector("#info div[aria-hidden].rounded-full");
        if (!lens) return { found: false };
        const s = getComputedStyle(lens);
        const r = lens.getBoundingClientRect();
        return { found: true, opacity: Number(s.opacity), w: r.width, pos: s.position };
      });
      await page.screenshot({ path: `${DIR}/${spec.name}-zoom.png` });
      await page.evaluate(() => {
        document.querySelector("#info div.relative")?.dispatchEvent(
          new PointerEvent("pointerup", { bubbles: true, pointerId: 1, pointerType: "touch" }),
        );
      });
      note(
        loupe.found && loupe.opacity > 0.4 && loupe.w > 70,
        `${spec.name} loupe opacity=${loupe.opacity} w=${Math.round(loupe.w || 0)} pos=${loupe.pos}`,
      );
    }
  } else {
    note(false, `${spec.name} #info missing`);
  }

  await page.goto(`${BASE}/products/burgundy-caelia`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${DIR}/${spec.name}-pdp.png` });
  const ovPdp = await overflow(page);
  note(ovPdp.dx <= 10, `${spec.name} pdp overflow dx=${ovPdp.dx}`);

  const zoomStage = page.locator(".cursor-crosshair").first();
  if (await zoomStage.count()) {
    const zb = await zoomStage.boundingBox();
    note(!!zb && zb.height <= spec.viewport.height * 0.65, `${spec.name} pdp stage h=${Math.round(zb?.height || 0)}`);
    if (zb) {
      await pressZoom(page, zb.x + zb.width * 0.5, zb.y + zb.height * 0.5);
      const scaled = await zoomStage.locator("img").evaluate((img) => img.style.transform || getComputedStyle(img).transform);
      await page.screenshot({ path: `${DIR}/${spec.name}-pdp-zoom.png` });
      note(/scale\(2|matrix\(/.test(scaled) && !/^matrix\(1,\s*0/.test(scaled), `${spec.name} pdp zoom ${scaled}`);
    }
  }

  const cta = page.locator("button.btn-primary").first();
  if (await cta.count()) {
    const cb = await cta.boundingBox();
    note(!!cb && cb.height >= 44, `${spec.name} CTA h=${Math.round(cb?.height || 0)}`);
  }

  await context.close();
}

await browser.close();
writeFileSync(`${DIR}/report.json`, JSON.stringify({ ok: issues.length === 0, issues, log: out }, null, 2));
console.log(out.join("\n"));
console.log("\nISSUES", issues.length);
if (issues.length) console.log(issues.join("\n"));
process.exit(issues.length ? 1 : 0);
