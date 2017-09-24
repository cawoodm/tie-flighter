/*global Vector*/
function Bullet(pos) {
	PIXI.Sprite.call(this, g.ui.sprites.bullet);
	this.size = new Vector(this.width, this.height);
	this.tag = "bullet";
	this.pivot.set(this.width/2, this.height/2);
	this.x = pos.x;
	this.y = pos.y;
	this.dx = g.ui.width/2 - pos.x;
	this.dy = g.ui.height/2 - pos.y;
	this.lifetime = 10;
	this.speed = new Vector(this.dx/this.lifetime, this.dy/this.lifetime);
	this.rotation = Math.PI/2+Math.atan2(this.dy,this.dx);
	this.zOrder = g.player.zOrder-1
}

Bullet.prototype = Object.create(PIXI.Sprite.prototype);
Bullet.prototype.init = function() {
}
Bullet.prototype.update = function() {
	let delta = new Vector(g.ui.width/2 - this.x, g.ui.height/2 - this.y);
	if (delta.y/this.dy<0.1) return g.entity.remove(this);
	this.scale =new PIXI.Point(delta.y/this.dy,delta.y/this.dy);
	this.x += this.speed.x;
	this.y += this.speed.y;
	//dp(this.x, this.y, delta)
	//this.scale = new PIXI.Point(24/this.z,24/this.z);
}