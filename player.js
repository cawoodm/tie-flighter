/*global Vector*/
function Player() {
	PIXI.Sprite.call(this, g.ui.sprites.player);
	this.tag = "player";
	this.width /= 2; // Resize sprite
	//this.height /= 2;
	this.anchor.set(0.5, 0.5);
	this.size = new Vector(this.width, this.height);
	this.speed = new Vector(0, 0);
	this.acc = new Vector(0, 0);
	this.position.x=200;
	this.position.y=300;
	dp("1")//this.pivot)
	g.ui.stage.addChild(this);
}

Player.prototype = Object.create(PIXI.Sprite.prototype);
Player.prototype.init = function() {}
Player.prototype.update = function(delta) {
	//dp("DRAWING player ", this.position.x, this.position.y, delta.toFixed(2));
	//this.center = new Vector(Math.min(g.ui.width, this.position.x), this.position.y+this.height/2)
	this.position.x = g.ui.renderer.plugins.interaction.mouse.global.x;
	//dp(this.position.x)
	return
	if (this.position.x<0) {
		this.position.x=0;
		this.acc.x=0;
		this.speed.x=0;
	}
	if (this.position.x+this.size.x>g.ui.canvas.width) {
		this.position.x=g.ui.canvas.width-this.size.x;
		this.acc.x=0;
		this.speed.x=0;
	}
	this.speed.x+=this.acc.x;
	this.speed.x+=this.acc.y;
	this.position.x+=this.speed.x*delta;
	this.position.y+=this.speed.y*delta;
}