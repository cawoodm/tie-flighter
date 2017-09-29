// Setup rendering surface
//g.app = new PIXI.Application({width: 400, height:400});
/*global Ticker Player Background Enemies Starfield*/
g.start = function() {
	this.ticker = new Ticker(this.ui.fps, function (delta) {
		g.gameUpdate(delta);
	}, function() {
		g.gameRender();
	});
	g.ticker.start();
};

g.halt=function() {
	if (g.ticker.state=="stop") {
		g.ticker.start();
	} else {
		g.ticker.stop();
	}
};

g.restart = function() {
	g.scenes = {
		menu: {entities: []}
		,level1: {entities: []}
	};
	g.scene = g.scenes.level1;
	g.scene.entities.push(new Background());
	//g.entity.add(new Bullet());
	g.player = new Player();
	g.entity.add(g.player);
	g.entity.add(new Starfield());
	Enemies.add();
	g.start();
};
g.entity.add = function(ent) {
	g.scene.entities.push(ent);
	if (typeof ent.renderer === "undefined") g.ui.stage.addChild(ent);
	if (typeof ent.init === "function") ent.init();
};
g.entity.remove = function(ent) {
	ent.destroy();
	g.ui.stage.removeChild(ent);
	for(let i=0; i < g.scene.entities.length; i++)
		if (g.scene.entities[i] == ent) g.scene.entities.splice(i,1);
};
g.gameUpdate = function(delta) {
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.update === "function") ent.update(delta);
	}, this);
};
g.gameRender = function() {
	
	if (g.fpsMeter) g.fpsMeter.tick();

	g.ctx.clearRect(0, 0, g.ui.canvas.width, g.ui.canvas.height);
	
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.renderer === "function") ent.renderer(g.ctx);
	}, this);
	
	g.ctx.save();
	g.ui.renderer.render(g.ui.stage);
	g.ctx.restore();
};
