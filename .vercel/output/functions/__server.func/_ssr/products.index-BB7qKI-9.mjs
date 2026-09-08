import { _ as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as products } from "./products-CdfswR-M.mjs";
import { t as formatEUR } from "./utils-C22h05P4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.index-BB7qKI-9.js
var import_jsx_runtime = require_jsx_runtime();
function ProductsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell section-y",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Volume 01"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-serif text-5xl font-light",
					children: "La collezione"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-ink/65",
					children: "Tre colori. Una forma. Beauty Mirror Case."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-8 sm:grid-cols-3",
					children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/products/$handle",
						params: { handle: p.handle },
						className: "group block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-3/4 overflow-hidden bg-cream-deep",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.images[0].src,
								alt: p.images[0].alt,
								className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-xl",
								children: p.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs uppercase tracking-[0.18em] text-ink/50",
								children: p.tagline
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular-nums text-sm",
								children: formatEUR(p.price)
							})]
						})]
					}, p.handle))
				})
			]
		})
	});
}
//#endregion
export { ProductsPage as component };
