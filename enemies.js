function Enemies(num) {
	PIXI.Container.call(this);
	this.guys = [];
	num.id = num.id||"0";
	//this.anchor.set(0.5, 0.5);// = {x: 0.5,y: 0.5};
	this.num = num;
	this.speed = num.s || 0.5;
	this.tex = g.ui.sprites["enemy"+num.id];
	this.scaler = 0.5;
	this.spacing = 10;
	this.width = this.num.x * (this.tex.width + this.spacing);
	for (let i=0; i < num.x; i++) {
		this.guys[i] = [];
		for (let j=0; j < num.y; j++) {
			let guy = this.guys[i][j] = new PIXI.Sprite(this.tex);
			guy.x = (this.tex.width + this.spacing) * i;
			guy.y = (this.tex.height + this.spacing) * j;
			guy.scale = new PIXI.Point(this.scaler, this.scaler);
			this.addChild(guy);
		}
	}
	
	this.x = g.ui.width/2 - this.width/2;
	this.y = g.ui.height * 0.2;
	this.tag = "enemies";
}
Enemies.prototype = Object.create(PIXI.Container.prototype);
Enemies.prototype.update = function() {
	//let d = (this.y - g.ui.horizon)/g.ui.horizon;
	let d = 1;
	this.scale = new PIXI.Point(d,d);
	this.width = d * this.num.x * (this.tex.width + this.spacing);
	this.x = g.ui.width/2 - this.width/2;
	this.y += this.speed; 
	if (this.y + this.height > g.ui.playzone) {
		return g.entity.remove(this);
	}// else if (this.x <= 0 || this.x + this.width >= g.ui.width) {
	return
	// 	//this.y += this.tex.height*this.scaler/2;
	// 	if (this.x <= 0) this.x = 10; else this.x -= 10;
	// 	this.speed *= -1;
	// } else {
	// 	this.y += this.speed;
	// 	dp(this.y)
	// 	let d = (this.y - g.ui.horizon)/g.ui.horizon;
	// 	//this.scale = new PIXI.Point(d,d);
	// }
};
Enemies.prototype.collision = function(ent) {
	for (let i in this.children) {
		let enemy = this.children[i];
		let ab = enemy.getBounds();
		let bb = ent.getBounds();
		if (ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height) {
			enemy.destroy();	
			return true;
		}
	}
};
