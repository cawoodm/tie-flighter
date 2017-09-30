const dp = function() {
	let args = [];
	for (let a in arguments) args.push(typeof arguments[a] == "number"?arguments[a].toFixed(2):arguments[a])
	console.log.apply(console, args);
};
const dpu = function(msg) {
	g.debugText=msg;
}
const dpuu = function() {
	if(!g || !g.ctx) return;
	g.debugText = "x:"+g.ui.renderer.plugins.interaction.mouse.global.x+",y:"+g.ui.renderer.plugins.interaction.mouse.global.y;
	g.ctx.save();
	g.ctx.fillStyle="#000";
	g.ctx.fillRect(200,20,300,20);
	g.ctx.fillStyle="#fff";
	g.ctx.fillText(g.debugText,200,20);
	g.ctx.restore();
};
const $ = document.querySelector.bind(document);
const rnd = function(min, max) {return Math.round(Math.random() * (max - min) + min)};