(() => {
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

  const map = document.querySelector("[data-map]");
  if (map) {
    const card = map.querySelector("[data-map-card]");
    const pins = [...map.querySelectorAll("[data-pin]")];
    const show = (pin) => {
      if (!card || !pin) return;
      card.hidden = false;
      card.querySelector("[data-map-n]").textContent = pin.textContent.trim();
      card.querySelector("[data-map-t]").textContent = pin.dataset.title || "";
      card.querySelector("[data-map-b]").textContent = pin.dataset.body || "";
      pins.forEach((p) => p.classList.toggle("is-on", p === pin));
    };
    pins.forEach((pin) => {
      pin.addEventListener("pointerenter", () => show(pin));
      pin.addEventListener("focus", () => show(pin));
    });
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

  const product = document.querySelector("[data-product]");
  if (product) {
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
  }
})();
