function Enemies(num) {
	PIXI.Container.call(this);
	this.guys = [];
	num.id = num.id||"0";
	this.num = num;
	this.speed = num.s || 0.5;
	this.tex = g.ui.sprites["enemy"+num.id];
	this.scaler = 0.5;
	this.spacing = 10;
	this.width = num.x * this.tex.width;
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
	this.anchor = {x: 0.5,y: 0.5};
	//this.pivot.set(this.width / 2, this.height / 2);
}
Enemies.prototype = Object.create(PIXI.Container.prototype);
Enemies.prototype.update = function() {
	if (this.y + this.height > g.ui.playzone) {
		return g.entity.remove(this);
	} else if (this.x <= 0 || this.x + this.width >= g.ui.width) {
		//this.y += this.tex.height*this.scaler/2;
		if (this.x <= 0) this.x = 10; else this.x -= 10;
		dp(this.x, this.y, this.tex.height)
		this.speed *= -1;
	} else {
		this.y += this.speed;
		let d = (this.y - g.ui.horizon)/g.ui.horizon;
		this.scale = new PIXI.Point(d,d);
	}
}
