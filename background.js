function Background() {
	PIXI.Graphics.call(this);
}
Background.prototype = Object.create(PIXI.Graphics.prototype);
Background.prototype.init = function() {
	this.lineStyle(2, 0xFF0000, 1);
	this.drawRect(1, 1, g.ui.canvas.width-2, g.ui.canvas.height-2);
	g.ui.stage.addChild(this);
}
