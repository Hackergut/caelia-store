//#region node_modules/.nitro/vite/services/ssr/assets/products-CdfswR-M.js
var products = [
	{
		handle: "burgundy-caelia",
		title: "Burgundy Caelia",
		price: 58,
		swatch: "#4a0e16",
		tagline: "Il bordeaux maison",
		description: "Beauty Mirror Case in Burgundy Caelia: il bordeaux maison. Specchio, matita e gloss in un astuccio compatto.",
		images: [
			{
				src: "/campaign/packshot-burgundy.jpg",
				alt: "Burgundy Caelia — packshot"
			},
			{
				src: "/campaign/splash-burgundy-drip.jpg",
				alt: "Gloss in caduta"
			},
			{
				src: "/campaign/splash-burgundy-pour.jpg",
				alt: "Pour sullo specchio"
			},
			{
				src: "/campaign/splash-burgundy-tools.jpg",
				alt: "Essentials e splash"
			},
			{
				src: "/campaign/fruit-editorial.jpg",
				alt: "Ciliegie e fichi"
			},
			{
				src: "/campaign/splash-burgundy-close.jpg",
				alt: "Dettaglio pelle e lucido"
			}
		],
		features: [
			"Specchio integrato, nitido",
			"Tasca per fino a 4 matite",
			"Pelle PU premium",
			"Logo debossato tono su tono"
		]
	},
	{
		handle: "cacao-caelia",
		title: "Cacao Caelia",
		price: 58,
		swatch: "#604c46",
		tagline: "Cuoio caldo",
		description: "Beauty Mirror Case in Cacao Caelia: cuoio caldo, marrone cacao. Stessa forma, solo il colore cambia.",
		images: [
			{
				src: "/campaign/packshot-cacao.jpg",
				alt: "Cacao Caelia — packshot"
			},
			{
				src: "/campaign/fruit-still.jpg",
				alt: "Cacao tra ciliegie e fichi"
			},
			{
				src: "/campaign/fruit-pour.jpg",
				alt: "Sciroppo e pelle"
			},
			{
				src: "/campaign/fruit-fall.jpg",
				alt: "Caduta di frutti"
			}
		],
		features: [
			"Specchio integrato, nitido",
			"Tasca per fino a 4 matite",
			"Pelle PU premium",
			"Finiture cucite a mano"
		]
	},
	{
		handle: "crema-caelia",
		title: "Crema Caelia",
		price: 58,
		swatch: "#dfc0b4",
		tagline: "Pelle luminosa",
		description: "Beauty Mirror Case in Crema Caelia: pelle chiara, luminosa. Specchio e tasca, stesso design.",
		images: [
			{
				src: "/campaign/packshot-crema.jpg",
				alt: "Crema Caelia — packshot"
			},
			{
				src: "/campaign/hero-splash-crema.jpg",
				alt: "Splash studio"
			},
			{
				src: "/campaign/splash-crema-open.jpg",
				alt: "Specchio e gel"
			},
			{
				src: "/campaign/lifestyle-vanity.jpg",
				alt: "Vanity con peonie"
			},
			{
				src: "/campaign/anatomy.jpg",
				alt: "Anatomia del prodotto"
			},
			{
				src: "/campaign/splash-crema-pour.jpg",
				alt: "Pour crema"
			}
		],
		features: [
			"Specchio integrato, nitido",
			"Tasca per fino a 4 matite",
			"Pelle PU premium",
			"Design sottile da borsa"
		]
	}
];
function getProduct(handle) {
	return products.find((p) => p.handle === handle);
}
//#endregion
export { products as n, getProduct as t };
