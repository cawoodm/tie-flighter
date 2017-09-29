function Enemies(num) {
	PIXI.Container.call(this);
	this.guys = [];
	num.id = num.id||"0";
	this.num = num;
	this.speed = num.hasOwnProperty("s")?num.s:0.2;
	this.tex = g.ui.sprites.enemies[num.id+".png"];
	this.spacing = 30;
	//this.width = this.num.x * (this.tex.width + this.spacing);
	this.scaler = 0.2; //100/this.tex.width;
	for (let i=0; i < num.x; i++) {
		this.guys[i] = [];
		for (let j=0; j < num.y; j++) {
			let guy = this.guys[i][j] = new PIXI.Sprite(this.tex);
			guy.x = this.scaler*(this.tex.width + this.spacing) * i;
			guy.y = this.scaler*(this.tex.height + this.spacing) * j;
			guy.tag = i+","+j;
			guy.scale = new PIXI.Point(this.scaler, this.scaler);
			this.addChild(guy);
		}
	}
	
	this.x = g.ui.width/2 - this.width/2;
	this.y = g.ui.horizon;
	this.tag = "enemies";
}
Enemies.add = function(options) {
	let o = options||{};
	o.x = o.x||3;
	o.y = o.y||1;//rnd(1,2);
	o.num = o.num||rnd(0,53);
	if (g.enemies && g.enemies.children) g.entity.remove(g.enemies);
	g.enemies = new Enemies(o);
	g.entity.add(g.enemies);
}
Enemies.initSprites = function() {
	var frames = [];
	for (let i=0; i<10; i++)
		frames.push(PIXI.Texture.fromFrame("ex" + i + ".png"));
	this.exploder = new PIXI.extras.AnimatedSprite(frames);
};
Enemies.prototype = Object.create(PIXI.Container.prototype);
Enemies.prototype.update = function() {
	let d = 0.3 + 0.5*(this.y - g.ui.horizon)/g.ui.horizon;
	this.scale = new PIXI.Point(d,d);
	this.x = g.ui.width/2 - this.width/2;
	this.y += this.speed; 
	if (this.y + this.height > g.ui.playzone) {
		return g.entity.remove(this);
	}
};
Enemies.prototype.collision = function(bb) {
	
	let collided = false;
	for (let i in this.children) {
		let enemy = this.children[i];
		if (!enemy.visible) continue;
		let ab = enemy.getBounds();
		dp(ab.x + ab.width, bb.x, ab.x + ab.width > bb.x)
		if (ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height) {
			console.log("Hit", enemy.tag, bb, ab)
			enemy.visible=false; // destroy() messes up parent container	
			Enemies.exploder.x = ab.x;
			Enemies.exploder.y = ab.y;
			Enemies.exploder.anchor.set(0.5);
			Enemies.exploder.animationSpeed = 0.5;
			Enemies.exploder.play()
			collided = true;
		}
		if (collided) break;
	}
	if (!collided) return;
	let vis = this.children.reduce(function(acc, curr) {
		return parseInt(acc.visible?1:acc) + parseInt(curr.visible?1:0);
	});
	dp("enemies left=", vis)
	if (vis==0) {
		dp("destroyed")
		g.entity.remove(this);
		Enemies.add();
	}
};
