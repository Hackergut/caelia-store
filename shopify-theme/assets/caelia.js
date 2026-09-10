(() => {
  const cfg = window.CAELIA || { drawer: true, routes: {} };

  const menu = document.querySelector("[data-menu]");
  const toggle = document.querySelector("[data-menu-toggle]");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = !menu.hasAttribute("hidden");
      if (open) menu.setAttribute("hidden", "");
      else menu.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", String(!open));
      document.body.style.overflow = open ? "" : "hidden";
    });
  }

  document.querySelectorAll("[data-parallax] img").forEach((img) => {
    const frame = img.parentElement;
    const onScroll = () => {
      const r = frame.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      img.style.transform = `translate3d(0, ${p * -12}%, 0) scale(1.08)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  });

  const hero = document.querySelector("[data-hero]");
  if (hero) {
    const media = hero.querySelector(".c-hero__media");
    const veil = hero.querySelector(".c-hero__veil");
    const lock = hero.querySelector(".c-hero__lockup");
    const onScroll = () => {
      const r = hero.getBoundingClientRect();
      const total = hero.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
      if (media) {
        media.style.filter = `blur(${(1 - p) * 22}px)`;
        media.style.transform = `scale(${1.18 + p * 0.16})`;
      }
      if (veil) veil.style.opacity = String(0.5 - p * 0.35);
      if (lock) {
        lock.style.opacity = String(Math.min(1, Math.max(0, (p - 0.12) / 0.25)));
        lock.style.filter = `blur(${Math.max(0, 10 - p * 28)}px)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const drip = document.querySelector("[data-drip]");
  if (drip) {
    const frames = [...drip.querySelectorAll("[data-drip-frame]")];
    const stage = drip.querySelector("[data-drip-stage]");
    const cap = drip.querySelector("[data-drip-cap]");
    const onDrip = () => {
      const r = drip.getBoundingClientRect();
      const total = drip.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
      const x = p * Math.max(1, frames.length - 1);
      const a = Math.min(frames.length - 1, Math.floor(x));
      const b = Math.min(frames.length - 1, a + 1);
      const t = x - a;
      frames.forEach((img, i) => {
        img.style.opacity = i === a ? "1" : i === b ? String(t) : "0";
      });
      if (stage) {
        stage.style.transform = `scale(${1.04 + p * 0.14})`;
        stage.style.filter = `blur(${Math.max(0, 10 - p * 55)}px)`;
      }
      if (cap) {
        const op = p < 0.1 ? p / 0.1 : p > 0.88 ? Math.max(0.45, 1 - (p - 0.88) / 0.12) : 1;
        cap.style.opacity = String(op);
        cap.style.transform = `translate3d(0, ${p < 0.16 ? (1 - p / 0.16) * 28 : p > 0.88 ? (p - 0.88) * -120 : 0}px, 0)`;
      }
    };
    frames.forEach((img, i) => {
      img.style.opacity = i === 0 ? "1" : "0";
    });
    onDrip();
    window.addEventListener("scroll", onDrip, { passive: true });
  }

  const map = document.querySelector("[data-map]");
  if (map) {
    const card = map.querySelector("[data-map-card]");
    const pins = [...map.querySelectorAll("[data-pin]")];
    pins.forEach((pin) => {
      pin.addEventListener("pointerenter", () => show(pin));
      pin.addEventListener("focus", () => show(pin));
      pin.addEventListener("click", () => show(pin));
    });
    map.querySelectorAll("[data-map-item]").forEach((item) => {
      item.addEventListener("click", () => {
        const pin = pins.find((p) => p.dataset.id === item.dataset.id);
        if (pin) show(pin);
      });
    });
    const show = (pin) => {
      if (!card || !pin) return;
      card.hidden = false;
      card.querySelector("[data-map-n]").textContent = pin.textContent.trim();
      card.querySelector("[data-map-t]").textContent = pin.dataset.title || "";
      card.querySelector("[data-map-b]").textContent = pin.dataset.body || "";
      pins.forEach((p) => p.classList.toggle("is-on", p === pin));
      map.querySelectorAll("[data-map-item]").forEach((el) => {
        el.classList.toggle("is-on", el.dataset.id === pin.dataset.id);
      });
    };
    if (pins[0]) show(pins[0]);
  }

  const thumbs = document.querySelectorAll("[data-thumb]");
  const main = document.getElementById("ProductImage");
  thumbs.forEach((btn) => {
    btn.addEventListener("click", () => {
      thumbs.forEach((b) => b.classList.toggle("is-on", b === btn));
      if (main) main.src = btn.dataset.thumb;
    });
  });

  document.querySelectorAll("[data-product]").forEach((product) => {
    const script = product.querySelector("[data-variants]");
    const idInput = product.querySelector("[data-variant-id]");
    const selects = [...product.querySelectorAll("[data-option]")];
    if (script && idInput && selects.length) {
      const variants = JSON.parse(script.textContent);
      const sync = () => {
        const key = selects.map((s) => s.value).join(" / ");
        const v = variants.find((x) => x.title === key || (x.options || []).join(" / ") === key);
        if (v) idInput.value = v.id;
      };
      selects.forEach((s) => s.addEventListener("change", sync));
    }
  });

  const ctaBtn = document.querySelector("[data-cta-btn]");
  if (ctaBtn && !ctaBtn.disabled) {
    const variant = document.documentElement.getAttribute("data-cta") || "A";
    const track = (action) => {
      const payload = { event: `cta_ab_${action}`, variant, experiment: "buy_button" };
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
      if (window.Shopify && Shopify.analytics && typeof Shopify.analytics.publish === "function") {
        Shopify.analytics.publish(payload.event, { variant, experiment: "buy_button" });
      }
    };
    track("view");
    ctaBtn.addEventListener("click", () => track("click"));
  }

  const setOpen = (open) => {
    const drawer = document.querySelector("[data-cart-drawer]");
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  const refreshDrawer = async () => {
    const root = cfg.routes.root || "/";
    const res = await fetch(`${root}?section_id=cart-drawer`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const next = doc.querySelector("[data-cart-drawer]");
    const cur = document.querySelector("[data-cart-drawer]");
    if (next && cur) cur.replaceWith(next);
    const cart = await fetch(cfg.routes.cart || "/cart.js").then((r) => r.json()).catch(() => null);
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = cart && cart.item_count ? ` (${cart.item_count})` : "";
    });
  };

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-cart-toggle]");
    if (openBtn && cfg.drawer) {
      e.preventDefault();
      setOpen(true);
    }
    if (e.target.closest("[data-cart-close]")) setOpen(false);
  });

  document.addEventListener("submit", async (e) => {
    const form = e.target.closest("[data-product-form]");
    if (!form || !cfg.drawer) return;
    e.preventDefault();
    const btn = form.querySelector("[data-cta-btn]");
    if (btn) btn.disabled = true;
    try {
      await fetch(cfg.routes.cartAdd || "/cart/add.js", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      await refreshDrawer();
      setOpen(true);
    } finally {
      if (btn) btn.disabled = false;
    }
  });
})();
