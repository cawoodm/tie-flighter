const dp = function() {
	let args = [];
	for (let a in arguments) args.push(typeof arguments[a] == "number"?arguments[a].toFixed(2):arguments[a])
	console.log.apply(console, args);
}
const $ = document.querySelector.bind(document);