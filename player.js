/*global Vector*/
function Player() {
	PIXI.Sprite.call(this, g.ui.sprites.player);
	this.tag = "player";
	this.scale = new PIXI.Point(0.5, 0.5);
	this.anchor = {x:0.5, y:0.5}
	this.speed = new Vector(0, 0);
	this.acc = new Vector(0, 0);
	this.position.x=200;
	this.position.y=g.ui.playzone;
	this.zOrder = 10;
}

Player.prototype = Object.create(PIXI.Sprite.prototype);
Player.prototype.init = function() {
	// TODO: Make a force shield child toggle visibility via mySprite.alpha = 0;
	//this.circle = new PIXI.Graphics();
	// circle.beginFill(0x5cafe2);
	// circle.drawCircle(0, 0, 80);
	// circle.x = 320;
	// circle.y = 180;
	// g.app.stage.addChild(circle);
}
Player.prototype.update = function(delta) {
	if (this.dieNext) return g.entity.remove(this);
	// Move with mouse
	this.setPosition({x:g.ui.renderer.plugins.interaction.mouse.global.x});
}
Player.prototype.postRenderer = function() {
	//let box = new PIXI.Rectangle(this.x-this.collider.width/2, this.y-this.collider.height/2,this.collider.width, this.collider.height);
	if (g.enemies.collision(this, "player")) this.dieNext=true;
}
Player.prototype.setPosition = function(pos,a) {
	if (pos.x<0) return; // Mobile device
	this.position.x = Math.max(this.width/2, Math.min(pos.x, g.ui.width-this.width/2))
}
