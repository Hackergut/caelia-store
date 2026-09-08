import { i as __toESM } from "../_runtime.mjs";
import { L as notFound, R as require_react, _ as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as products, t as getProduct } from "./products-CdfswR-M.mjs";
import { i as useCart, n as Route } from "./router-jPjuKsHW.mjs";
import { t as formatEUR } from "./utils-C22h05P4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._handle-DKPs34He.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { handle } = Route.useParams();
	const product = getProduct(handle);
	const add = useCart((s) => s.add);
	const [active, setActive] = (0, import_react.useState)(0);
	const [added, setAdded] = (0, import_react.useState)(false);
	if (!product) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell section-y grid gap-10 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-4/5 overflow-hidden bg-cream-deep",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.images[active]?.src,
					alt: product.images[active]?.alt,
					className: "h-full w-full object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-5 gap-2",
				children: product.images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActive(i),
					className: `aspect-square overflow-hidden bg-cream-deep ${i === active ? "ring-1 ring-burgundy" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: img.src,
						alt: "",
						className: "h-full w-full object-cover"
					})
				}, img.src))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: product.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-serif text-5xl font-light",
					children: product.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 tabular-nums text-lg",
					children: formatEUR(product.price)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md leading-relaxed text-ink/70",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 space-y-2 text-sm text-ink/70",
					children: product.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-t border-mist/70 py-3",
						children: f
					}, f))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn-press mt-8 inline-flex min-h-12 w-full items-center justify-center bg-burgundy px-8 text-[11px] uppercase tracking-[0.22em] text-cream-fg sm:w-auto",
					onClick: () => {
						add(product.handle);
						setAdded(true);
					},
					children: added ? "Aggiunto al carrello" : "Aggiungi al carrello"
				}),
				added ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cart",
					className: "mt-4 block text-[11px] uppercase tracking-[0.22em] text-burgundy",
					children: "Vai al carrello"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Altri colori"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex gap-3",
						children: products.filter((p) => p.handle !== product.handle).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/products/$handle",
							params: { handle: p.handle },
							className: "w-24",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.images[0].src,
								alt: p.title,
								className: "aspect-3/4 w-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[10px] uppercase tracking-[0.16em]",
								children: p.title.replace(" Caelia", "")
							})]
						}, p.handle))
					})]
				})
			] })]
		})
	});
}
//#endregion
export { ProductPage as component };
