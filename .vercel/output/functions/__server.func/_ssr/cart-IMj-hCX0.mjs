import { _ as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getProduct } from "./products-CdfswR-M.mjs";
import { i as useCart, r as cartTotal } from "./router-jPjuKsHW.mjs";
import { t as formatEUR } from "./utils-C22h05P4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-IMj-hCX0.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { lines, setQty, remove, clear } = useCart();
	const total = cartTotal(lines);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell section-y max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-5xl font-light",
				children: "Carrello"
			}), lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-ink/65",
					children: "Il carrello è vuoto."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/products",
					className: "btn-press mt-6 inline-flex min-h-12 items-center bg-burgundy px-8 text-[11px] uppercase tracking-[0.22em] text-cream-fg",
					children: "La collezione"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-6",
				children: [
					lines.map((line) => {
						const p = getProduct(line.handle);
						if (!p) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 border-b border-mist/70 pb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.images[0].src,
								alt: "",
								className: "h-28 w-20 object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-serif text-xl",
										children: p.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 tabular-nums text-sm",
										children: formatEUR(p.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "min-h-10 min-w-10 border border-mist",
												onClick: () => setQty(line.handle, line.qty - 1),
												children: "−"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums w-6 text-center",
												children: line.qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "min-h-10 min-w-10 border border-mist",
												onClick: () => setQty(line.handle, line.qty + 1),
												children: "+"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "ml-auto text-[11px] uppercase tracking-[0.18em] text-ink/45",
												onClick: () => remove(line.handle),
												children: "Rimuovi"
											})
										]
									})
								]
							})]
						}, line.handle);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm uppercase tracking-[0.2em] text-ink/50",
							children: "Totale"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tabular-nums text-xl",
							children: formatEUR(total)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink/55",
						children: "Checkout demo: il carrello resta sul dispositivo. Spedizione gratuita oltre 60€."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-press inline-flex min-h-12 items-center bg-burgundy px-8 text-[11px] uppercase tracking-[0.22em] text-cream-fg",
							onClick: () => clear(),
							children: "Completa (demo)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products",
							className: "inline-flex min-h-12 items-center text-[11px] uppercase tracking-[0.22em]",
							children: "Continua"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { CartPage as component };
