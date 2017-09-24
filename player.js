/*global Vector*/
function Player() {
	PIXI.Sprite.call(this, g.ui.sprites.player);
	this.tag = "player";
}

Player.prototype = Object.create(PIXI.Sprite.prototype);
Player.prototype.init = function() {
	this.scale = new PIXI.Point(0.5, 0.5);
	//this.pivot.set(this.width/2, this.height/2);
	this.anchor = {x:0.5, y:0.5}
	this.speed = new Vector(0, 0);
	this.acc = new Vector(0, 0);
	this.position.x=200;
	this.position.y=300;
	this.zOrder = 10;
	g.ui.stage.addChild(this);
	// TODO: Make a force shield child toggle visibility via mySprite.alpha = 0;
	//this.circle = new PIXI.Graphics();
	// circle.beginFill(0x5cafe2);
	// circle.drawCircle(0, 0, 80);
	// circle.x = 320;
	// circle.y = 180;
	// g.app.stage.addChild(circle);
}
Player.prototype.update = function(delta) {
	// Move with mouse
	this.position.x = g.ui.renderer.plugins.interaction.mouse.global.x;
	return
	if (this.position.x<0) {
		this.position.x=0;
		this.acc.x=0;
		this.speed.x=0;
	}
	if (this.position.x+this.width>g.ui.canvas.width) {
		this.position.x=g.ui.canvas.width-this.width;
		this.acc.x=0;
		this.speed.x=0;
	}
	this.speed.x+=this.acc.x;
	this.speed.x+=this.acc.y;
	this.position.x+=this.speed.x*delta;
	this.position.y+=this.speed.y*delta;
}