import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, _ as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useScroll, t as useTransform } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B4kB8vu_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ease = [
	.23,
	1,
	.32,
	1
];
var studio = [
	{
		src: "/campaign/hero-splash-crema.jpg",
		t: "Crema · impact",
		wide: true
	},
	{
		src: "/campaign/splash-crema-open.jpg",
		t: "Specchio · gel",
		wide: false
	},
	{
		src: "/campaign/splash-burgundy-pour.jpg",
		t: "Burgundy · pour",
		wide: false
	},
	{
		src: "/campaign/splash-burgundy-tools.jpg",
		t: "Essentials",
		wide: false
	},
	{
		src: "/campaign/fruit-editorial.jpg",
		t: "Ciliegia · fico",
		wide: true
	},
	{
		src: "/campaign/lifestyle-vanity.jpg",
		t: "Vanity",
		wide: false
	}
];
var chapters = [
	{
		handle: "burgundy-caelia",
		src: "/campaign/packshot-burgundy.jpg",
		hover: "/campaign/splash-burgundy-drip.jpg",
		n: "01",
		t: "Burgundy",
		d: "Il bordeaux maison"
	},
	{
		handle: "cacao-caelia",
		src: "/campaign/packshot-cacao.jpg",
		hover: "/campaign/fruit-still.jpg",
		n: "02",
		t: "Cacao",
		d: "Cuoio caldo"
	},
	{
		handle: "crema-caelia",
		src: "/campaign/packshot-crema.jpg",
		hover: "/campaign/hero-splash-crema.jpg",
		n: "03",
		t: "Crema",
		d: "Pelle luminosa"
	}
];
function HomeCampaign() {
	const heroRef = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
	const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		ref: heroRef,
		className: "relative overflow-hidden bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell grid items-center gap-8 pb-14 pt-6 lg:grid-cols-12 lg:gap-10 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "lg:col-span-5",
				initial: {
					opacity: 0,
					y: 18
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .55,
					ease
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Campaign 02 · Splash Studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 font-serif text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-7xl",
						children: [
							"Il gesto,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"in movimento."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-sm leading-relaxed text-ink/70",
						children: "Beauty Mirror Case. Pelle, specchio, colore che esplode. Un oggetto fermo — una scena viva."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products",
							className: "btn-press inline-flex min-h-12 items-center bg-burgundy px-8 text-[11px] uppercase tracking-[0.22em] text-cream-fg",
							children: "La collezione"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#studio",
							className: "btn-press inline-flex min-h-12 items-center border border-ink/15 px-8 text-[11px] uppercase tracking-[0.22em] text-ink",
							children: "Studio splash"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "relative -mx-5 aspect-4/5 overflow-hidden bg-cream-deep sm:mx-0 lg:col-span-7 lg:aspect-5/4",
				initial: {
					opacity: 0,
					y: 24
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .7,
					delay: .08,
					ease
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					style: {
						y,
						scale
					},
					src: "/campaign/hero-splash-crema.jpg",
					alt: "Crema Caelia — splash di gloss sulla pelle",
					className: "absolute inset-0 h-[115%] w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-linear-to-t from-night/35 to-transparent" })]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-[64svh] overflow-hidden bg-night md:min-h-[78vh]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				src: "/campaign/splash-burgundy-pour.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover brightness-55",
				initial: { scale: 1.08 },
				whileInView: { scale: 1 },
				viewport: { once: true },
				transition: {
					duration: 1.1,
					ease
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-night/35" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto flex min-h-[64svh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center md:min-h-[78vh]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						className: "text-[11px] uppercase tracking-[0.38em] text-cream-fg/70",
						initial: {
							opacity: 0,
							y: 10
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .45,
							ease
						},
						children: "Manifesto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
						className: "mt-6 font-serif text-2xl font-light leading-snug text-cream-fg sm:text-3xl lg:text-4xl",
						initial: {
							opacity: 0,
							y: 16
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .6,
							delay: .08,
							ease
						},
						children: [
							"«Il ritocco non è un incidente.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"È un gesto preciso.»"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-10 text-[11px] uppercase tracking-[0.28em] text-cream-fg/65",
						children: "Carla & Giulia — fondatrici"
					})
				]
			})
		]
	})] });
}
function CampaignStudio() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "studio",
		className: "bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell section-y",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 flex items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-serif text-4xl font-light",
					children: "Splash / still / fruit"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden max-w-xs text-right text-sm text-ink/55 md:block",
					children: "Nuove inquadrature campaign. Gel, ciliegie, vanity."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4",
				children: studio.map((shot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
					className: `group relative overflow-hidden bg-cream-deep ${shot.wide ? "col-span-2 aspect-16/10" : "aspect-3/4"}`,
					initial: {
						opacity: 0,
						y: 18
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: {
						duration: .5,
						delay: i * .06,
						ease
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: shot.src,
						alt: shot.t,
						className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "absolute inset-x-0 bottom-0 bg-linear-to-t from-night/55 to-transparent p-4 text-[11px] uppercase tracking-[0.2em] text-cream-fg",
						children: shot.t
					})]
				}, shot.src))
			})]
		})
	});
}
function RitualBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell section-y grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "aspect-3/4 overflow-hidden bg-cream-deep",
				initial: {
					opacity: 0,
					y: 20
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: {
					duration: .55,
					ease
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/campaign/anatomy.jpg",
					alt: "Anatomia del prodotto Caelia",
					className: "h-full w-full object-cover object-top"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Il rituale"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-5 font-serif text-4xl font-light",
					children: [
						"Tre gesti.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Pronta."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-8",
					children: [
						{
							n: "01",
							t: "Apri",
							d: "Una mano. Si apre."
						},
						{
							n: "02",
							t: "Ritocca",
							d: "Matita, gloss, specchio."
						},
						{
							n: "03",
							t: "Riparti",
							d: "Richiudi. Sei oltre."
						}
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
						className: "border-t border-mist/70 py-5",
						initial: {
							opacity: 0,
							y: 10
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .4,
							delay: i * .07,
							ease
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.28em] text-ink/40",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-serif text-2xl",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-ink/65",
								children: s.d
							})
						]
					}, s.n))
				})
			] })]
		})
	});
}
function ChapterGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell section-y",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-8 eyebrow",
				children: "Capitoli"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-6 sm:grid-cols-3",
				children: chapters.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .45,
						delay: i * .07,
						ease
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/products/$handle",
						params: { handle: c.handle },
						className: "group block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-3/4 overflow-hidden bg-cream-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.src,
									alt: c.t,
									className: "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.hover,
									alt: "",
									className: "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-[11px] uppercase tracking-[0.22em] text-ink/40",
								children: c.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-serif text-xl",
								children: c.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-ink/55",
								children: c.d
							})
						]
					})
				}, c.handle))
			})]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeCampaign, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignStudio, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RitualBlock, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChapterGrid, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-mist/40 bg-cream",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shell py-12 text-center text-[11px] uppercase tracking-[0.22em] text-ink/40",
				children: "Italia · Pelle vegana · Resi 30 giorni"
			})
		})
	] });
}
//#endregion
export { Home as component };
