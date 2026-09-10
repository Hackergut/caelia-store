(() => {
  const cfg = window.CAELIA || { drawer: true, routes: {} };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const visibleFocusable = (root) =>
    [...root.querySelectorAll(FOCUSABLE)].filter((el) => {
      if (el.hasAttribute("hidden") || el.getAttribute("aria-hidden") === "true") return false;
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden";
    });

  const announce = (msg) => {
    const el = document.querySelector("[data-cart-status]");
    if (!el) return;
    el.textContent = "";
    requestAnimationFrame(() => {
      el.textContent = msg;
    });
  };

  let trapRoot = null;
  let lastFocus = null;

  const onTrapTab = (e) => {
    if (e.key !== "Tab" || !trapRoot) return;
    const nodes = visibleFocusable(trapRoot);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const lockPage = (lock) => {
    document.body.style.overflow = lock ? "hidden" : "";
    const main = document.getElementById("MainContent");
    const footer = document.querySelector(".c-footer");
    const announceBar = document.querySelector(".c-announce");
    [main, footer, announceBar].forEach((n) => {
      if (!n) return;
      if (lock) n.setAttribute("inert", "");
      else n.removeAttribute("inert");
    });
  };

  const startTrap = (root) => {
    trapRoot = root;
    document.addEventListener("keydown", onTrapTab);
    const nodes = visibleFocusable(root);
    (nodes[0] || root).focus();
  };

  const endTrap = () => {
    document.removeEventListener("keydown", onTrapTab);
    trapRoot = null;
    lockPage(false);
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    lastFocus = null;
  };

  const menu = document.querySelector("[data-menu]");
  const toggle = document.querySelector("[data-menu-toggle]");

  const setMenu = (open) => {
    if (!menu || !toggle) return;
    if (open) {
      lastFocus = document.activeElement;
      menu.removeAttribute("hidden");
      menu.removeAttribute("inert");
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      lockPage(true);
      startTrap(menu);
    } else {
      menu.setAttribute("hidden", "");
      menu.setAttribute("inert", "");
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      endTrap();
    }
  };

  if (toggle && menu) {
    menu.setAttribute("inert", "");
    toggle.addEventListener("click", () => setMenu(menu.hasAttribute("hidden")));
    menu.querySelector("[data-menu-close]")?.addEventListener("click", () => setMenu(false));
  }

  const drawerEl = () => document.querySelector("[data-cart-drawer]");
  const cartToggle = () => document.querySelector("[data-cart-toggle]");

  const setOpen = (open) => {
    const drawer = drawerEl();
    if (!drawer) return;
    const panel = drawer.querySelector(".c-drawer__panel") || drawer;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) drawer.removeAttribute("inert");
    else drawer.setAttribute("inert", "");
    cartToggle()?.setAttribute("aria-expanded", String(open));
    if (open) {
      lastFocus = document.activeElement;
      lockPage(true);
      startTrap(panel);
    } else {
      endTrap();
    }
  };

  const refreshDrawer = async () => {
    const root = cfg.routes.root || "/";
    const res = await fetch(`${root}?section_id=cart-drawer`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const next = doc.querySelector("[data-cart-drawer]");
    const cur = drawerEl();
    if (next && cur) cur.replaceWith(next);
    const cart = await fetch(cfg.routes.cart || "/cart.js")
      .then((r) => r.json())
      .catch(() => null);
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      const n = cart && cart.item_count ? cart.item_count : 0;
      el.textContent = n ? ` (${n})` : "";
    });
    const label = document.querySelector("[data-cart-toggle]");
    if (label && cart) {
      label.setAttribute(
        "aria-label",
        `${label.dataset.cartLabel || "Carrello"}${cart.item_count ? `, ${cart.item_count}` : ""}`,
      );
    }
  };

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-cart-toggle]");
    if (openBtn && cfg.drawer) {
      e.preventDefault();
      setOpen(true);
    }
    if (e.target.closest("[data-cart-close]")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (drawerEl()?.classList.contains("is-open")) setOpen(false);
    else if (menu && !menu.hasAttribute("hidden")) setMenu(false);
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
      announce(cfg.added || "Aggiunto al carrello");
      setOpen(true);
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  if (reduce) {
    document.documentElement.classList.add("reduce-motion");
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.removeAttribute("autoplay");
      v.setAttribute("aria-hidden", "true");
    });
  } else {
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
      pins.forEach((p) => {
        const on = p === pin;
        p.classList.toggle("is-on", on);
        p.setAttribute("aria-pressed", String(on));
      });
      map.querySelectorAll("[data-map-item]").forEach((el) => {
        const on = el.dataset.id === pin.dataset.id;
        el.classList.toggle("is-on", on);
        el.setAttribute("aria-pressed", String(on));
      });
    };
    pins.forEach((pin) => {
      pin.setAttribute("aria-pressed", pin.classList.contains("is-on") ? "true" : "false");
      pin.addEventListener("pointerenter", () => show(pin));
      pin.addEventListener("focus", () => show(pin));
      pin.addEventListener("click", () => show(pin));
    });
    map.querySelectorAll("[data-map-item]").forEach((item) => {
      item.setAttribute("aria-pressed", item.classList.contains("is-on") ? "true" : "false");
      item.addEventListener("click", () => {
        const pin = pins.find((p) => p.dataset.id === item.dataset.id);
        if (pin) show(pin);
      });
    });
    if (pins[0]) show(pins[0]);
  }

  const thumbs = document.querySelectorAll("[data-thumb]");
  const main = document.getElementById("ProductImage");
  thumbs.forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.classList.contains("is-on") ? "true" : "false");
    btn.addEventListener("click", () => {
      thumbs.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", String(on));
      });
      if (main) {
        main.src = btn.dataset.thumb;
        const label = btn.getAttribute("aria-label");
        if (label) main.alt = label;
      }
    });
  });

  document.querySelectorAll("[data-zoom]").forEach((stage) => {
    const img = stage.querySelector("img");
    if (!img) return;
    const origin = (e) => {
      const r = stage.getBoundingClientRect();
      const x = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
      const y = Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100));
      img.style.transformOrigin = `${x}% ${y}%`;
    };
    const on = (e) => {
      e.preventDefault();
      stage.setPointerCapture(e.pointerId);
      origin(e);
      img.style.transform = "scale(2.2)";
      img.style.transition = "transform 80ms linear";
    };
    const move = (e) => {
      if (e.pointerType !== "mouse" && !stage.hasPointerCapture(e.pointerId)) return;
      origin(e);
    };
    const off = () => {
      img.style.transform = "scale(1)";
      img.style.transition = "transform 400ms cubic-bezier(0.23,1,0.32,1)";
    };
    stage.addEventListener("pointerdown", on);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", off);
    stage.addEventListener("pointercancel", off);
    stage.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "mouse") off();
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
})();
