function Enemies(num) {
	PIXI.Container.call(this);
	this.guys = [];
	num.id = num.num||"0";
	this.num = num;
	this.speed = num.hasOwnProperty("s")?num.s:0.5;
	this.tex = g.ui.sprites.enemies[num.id+".png"];
	this.spacing = 30;
	//this.width = this.num.x * (this.tex.width + this.spacing);
	this.scaler = 0.2; //100/this.tex.width;
	this.visible = false;
	//this.scaler = 1;
	for (let i=0; i < num.x; i++) {
		this.guys[i] = [];
		for (let j=0; j < num.y; j++) {
			let guy = this.guys[i][j] = new PIXI.Sprite(this.tex);
			guy.x = this.scaler*(this.tex.width + this.spacing) * i;
			dp(i, guy.x)
			guy.y = this.scaler*(this.tex.height + this.spacing) * j;
			guy.tag = i+","+j;
			guy.scale = new PIXI.Point(this.scaler, this.scaler);
			this.addChild(guy);
		}
	}
	dp(this.children[0].width, this.children[1].x)
	this.x = g.ui.width/2 - this.width/2;
	this.y = g.ui.horizon;
	this.tag = "enemies";
}
Enemies.add = function(options) {
	let o = options||{};
	o.x = o.x||rnd(3,8);
	o.y = o.y||rnd(1,2);
	o.num = o.num||rnd(0,53);
	if (g.enemies && g.enemies.children) g.entity.remove(g.enemies);
	g.enemies = new Enemies(o);
	g.entity.add(g.enemies);
}
Enemies.initSprites = function() {
	this.explosion = [];
	for (let i=0; i<10; i++)
		this.explosion.push(PIXI.Texture.fromFrame("ex" + i + ".png"));
};
Enemies.prototype = Object.create(PIXI.Container.prototype);
Enemies.prototype.update = function() {
	this.visible = true;
	let d = 0.8 + 0.5*(this.y - g.ui.horizon)/g.ui.horizon;
	this.scale = new PIXI.Point(d,d);
	this.myWidth = (this.children[0].width)*this.num.x + this.spacing*d;
	this.x = g.ui.width/2 - this.myWidth/2;
	this.y += this.speed; 
	if (this.y + this.height > g.ui.playzone) {
		return Enemies.add();
	}
};
Enemies.prototype.collision = function(bb) {
	let collided = false;
	for (let i in this.children) {
		let enemy = this.children[i];
		if (enemy.alpha==0) continue;
		let ab = enemy.getBounds();
		if (ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height) {
			//console.log("Hit", enemy.tag, bb, ab)
			enemy.destroy();collided=true;
			//enemy.visible=false; // destroy() messes up parent container	
			enemy.alpha=0; // destroy() messes up parent container
			let exploder = new PIXI.extras.AnimatedSprite(Enemies.explosion);
			exploder.loop=false;
			exploder.x = ab.x+ab.width/2;
			exploder.y = ab.y+ab.height/2;
			exploder.anchor.set(0.5);
			exploder.animationSpeed = 0.5;
			exploder.play()
			exploder.scale = this.scale;
			g.ui.stage.addChild(exploder);
			exploder.onComplete = function(){exploder.destroy()};
			collided = true;
			break;
		}
		if (collided) break;
	}
	if (!collided) return;
	if (this.children.length==0) {
		Enemies.add();
	}
	return true;
};
