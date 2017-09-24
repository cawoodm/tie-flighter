function Background() {
	PIXI.Graphics.call(this);
}
Background.prototype = Object.create(PIXI.Graphics.prototype);
Background.prototype.init = function() {
	this.lineStyle(2, 0x0000FF, 1);
	this.drawRect(0, 0, g.ui.canvas.width-1, g.ui.canvas.height-2);
	g.ui.stage.addChild(this);
}