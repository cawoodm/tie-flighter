function Background() {
	PIXI.Graphics.call(this);
}
Background.prototype = Object.create(PIXI.Graphics.prototype);
Background.prototype.init = function() {
	this.lineStyle(2, 0x333333, 1);
	this.drawRect(0, 0, g.ui.canvas.width-1, g.ui.canvas.height-1);
	g.ui.stage.addChild(this);
}
Background.prototype.renderer = function(ctx) {
	ctx.save();
	ctx.fillStyle="#000";
	ctx.fillRect(1, 1, g.ui.canvas.width, g.ui.canvas.height);
	ctx.strokeStyle="rgba(100, 100, 100, 0.3)";
	for (let x=0; x<g.ui.width; x+=5) {
		ctx.moveTo(x, g.ui.horizon);
		let d = (g.ui.width/2-x)*40;
		ctx.lineTo(g.ui.width/2-d, g.ui.height);
	}
	let d = 1;
	for (let y=g.ui.horizon; y<g.ui.height; y+=d) {
		ctx.moveTo(0, y);
		ctx.lineTo(g.ui.width, y);
		d+=10;
	}
	ctx.stroke();
	ctx.restore();
}
Background.drawHazeGrid = function() {
	g.ctx.save();
	g.ctx.strokeStyle="rgba(1, 1, 1, 0.8)";
	for (let y=0; y<g.ui.height; y+=2) {
		g.ctx.moveTo(0, y);
		g.ctx.lineTo(g.ui.width, y);
	}
	g.ctx.stroke();
	g.ctx.restore();
}