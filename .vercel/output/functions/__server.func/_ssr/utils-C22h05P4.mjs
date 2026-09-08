//#region node_modules/.nitro/vite/services/ssr/assets/utils-C22h05P4.js
function formatEUR(amount) {
	return new Intl.NumberFormat("it-IT", {
		style: "currency",
		currency: "EUR"
	}).format(amount);
}
//#endregion
export { formatEUR as t };
