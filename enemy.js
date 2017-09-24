/*global Vector*/
function Enemy(pos, num) {
	PIXI.Sprite.call(this, g.ui.sprites.bullet);
	this.tag = "enemy";
  this.pivot.set(this.width / 2, this.height / 2);
  this.num = num;
	this.x = pos.x;
	this.y = pos.y;
  this.z = 0;
  this.speed = {x:1, y:0, z: 0}
}
Enemy.prototype = Object.create(PIXI.Sprite.prototype);
Enemy.prototype.update = function() {
	this.z += this.speed.z;
	this.x += this.speed.x;
  this.y += this.speed.y;
  if (this.x>=g.ui.width/2)
}
