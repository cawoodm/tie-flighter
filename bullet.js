/*global Vector*/
function Bullet(pos) {
	PIXI.Sprite.call(this, g.ui.sprites.bullet);
	this.tag = "bullet";
	this.pivot.set(this.width / 2, this.height / 2);
	this.x = pos.x;
	this.y = pos.y;
	let dx1 = (g.ui.width / 2 - pos.x) / g.ui.width / 2;
	this.collider = new PIXI.Rectangle(26, 28, 6, 50);
	this.goal = {	
		x: g.ui.width / 2 - dx1 * g.ui.width
		,y: g.ui.height * 0.2
	};
	this.dx = this.goal.x - pos.x;
	this.dy = this.goal.y - pos.y;
	this.lifetime = 20;
	this.speed = new Vector(this.dx / this.lifetime,this.dy / this.lifetime);
	this.rotation = Math.PI / 2 + Math.atan2(this.dy, this.dx);
	this.zOrder = g.player.zOrder - 1
}
Bullet.prototype = Object.create(PIXI.Sprite.prototype);
Bullet.prototype.update = function() {
	if (this.dieNext) return g.entity.remove(this);
	let delta = new Vector(this.goal.x - this.x, this.goal.y - this.y);
	if (delta.y / this.dy < 0.1) return g.entity.remove(this);
	this.scale = new PIXI.Point(delta.y / this.dy,delta.y /this. dy);
	this.x += this.speed.x;
	this.y += this.speed.y;
}
Bullet.prototype.postRenderer = function() {
	let box = new PIXI.Rectangle(this.x-this.collider.width/2, this.y-this.collider.height/2,this.collider.width, this.collider.height);
	if (g.enemies.collision(box)) this.dieNext=true;
}
