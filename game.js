/*global Ticker Player Background Enemies Starfield*/
g.start = function() {
	this.ticker = new Ticker(this.ui.fps, function (delta) {
		g.gameUpdate(delta);
	}, function() {
		g.gameRender();
	});
	g.ticker.start();
};
g.pause=function() {
	if (g.state=="gameOver") {
		g.restart();
	} else if (g.ticker.state=="stop") {
		g.ticker.start();
	} else {
		g.ticker.stop();
	}
};
g.halt=function(){
	g.ticker.stop();
}
g.step=function() {
	g.gameUpdate(1);
	g.gameRender();
}
g.restart = function() {
	// Cleanup
	if (g.scene) {
		g.ui.stage.removeChildren();
		g.scene.entities.length = 0;
	}
	g.state="play";
	g.difficulty=1;
	// New Game
	g.scenes = {
		menu: {entities: []}
		,level1: {entities: []}
	};
	g.scene = g.scenes.level1;
	g.entity.add(new Background());
	g.player = g.entity.add(new Player());
	g.entity.add(new Starfield());
	Enemies.add();
	g.start();
};
g.entity.add = function(ent) {
	g.scene.entities.push(ent);
	if (typeof ent.renderer === "undefined") g.ui.stage.addChild(ent);
	if (typeof ent.init === "function") ent.init();
	return ent;
};
g.entity.remove = function(ent) {
	ent.destroy();
	g.ui.stage.removeChild(ent);
	for(let i=0; i < g.scene.entities.length; i++)
		if (g.scene.entities[i] == ent) g.scene.entities.splice(i,1);
};

g.gameOver = function() {
	g.state="gameOver";
	let go = new PIXI.Sprite(g.ui.sprites.gameOver);
	go.anchor = {x:0.5, y:0.5};
	go.tag="gameOver";
	go.scale = new PIXI.Point(2,2);
	go.interactive=true;
	go.x = g.ui.width/2;
	go.y = g.ui.height/3;
	g.ui.stage.addChild(go);
	go.on("click", function() {g.restart()});
};
g.gameUpdate = function(delta) {
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.update === "function") ent.update(delta);
	}, this);
};
g.gameRender = function() {
	
	g.ctx.clearRect(0, 0, g.ui.canvas.width, g.ui.canvas.height);
	
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.renderer === "function") ent.renderer(g.ctx);
	}, this);
	
	g.drawGrid0();
	
	g.ctx.save();
	g.ui.renderer.render(g.ui.stage);
	g.ctx.restore();

	//g.drawGrid1();
	
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.postRenderer === "function") ent.postRenderer();
	}, this);

	if (g.state=="gameOver") g.halt();
	
};
g.drawGrid0 = function() {
	g.ctx.save();
	g.ctx.strokeStyle="rgba(100, 100, 100, 0.5)";
	for (let x=0; x<g.ui.width; x+=5) {
		g.ctx.moveTo(x, g.ui.horizon);
		let d = (g.ui.width/2-x)*30;
		g.ctx.lineTo(g.ui.width/2-d, g.ui.height);
	}
	let d = 1;
	for (let y=g.ui.horizon; y<g.ui.height; y+=d) {
		g.ctx.moveTo(0, y);
		g.ctx.lineTo(g.ui.width, y);
		d+=10;
	}
	g.ctx.stroke();
	g.ctx.restore();
}
g.drawGrid1 = function() {
	g.ctx.save();
	g.ctx.strokeStyle="rgba(1, 1, 1, 0.5)";
	for (let y=0; y<g.ui.height; y+=3) {
		g.ctx.moveTo(0, y);
		g.ctx.lineTo(g.ui.width, y);
	}
	g.ctx.stroke();
	g.ctx.restore();
}
