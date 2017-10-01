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
		g.state="play";
		g.ticker.start();
	} else {
		g.ticker.stop();
		g.music.stop();
		g.state="pause";
	}
};
g.halt=function(state){
	g.ticker.stop();
	g.state=state||"halt";
}
g.step=function() {
	g.gameUpdate(1);
	g.gameRender();
}
g.restart = function(title) {
	// Cleanup
	if (g.scene) {
		g.ui.stage.removeChildren();
		g.scene.entities.length = 0;
	}
	if (title) {
		g.state="title";
		g.scenes = {
			title: {entities: []}
		};
		g.scene = g.scenes.title;
		g.entity.add(new Background());
		g.entity.add(new Starfield());
		g.title = g.entity.add(new PIXI.Sprite(g.ui.sprites.title));
		g.title.anchor = {x:0.5, y:0.5};
		g.title.x = g.ui.width/2;
		g.title.y = g.ui.height/3;
		g.gameRender();
	} else {
		// New Game
		g.state="play";
		g.points=0;
		g.difficulty=1;
		g.scenes = {
			level1: {entities: []}
		};
		g.scene = g.scenes.level1;
		g.entity.add(new Background());
		g.player = g.entity.add(new Player());
		g.entity.add(new Starfield());
		g.pointsText = g.entity.add(new PIXI.Text(g.points, {
			fontFamily : "Arial", fontSize: 24, fill : 0xffff00, align: "right"
		}));
		g.pointsText.x = g.ui.width-30;
		g.pointsText.y = 10;
		Enemies.add();
		g.resources.musicBg0.sound.play({loop:true});
		g.start();
	}
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
	g.resources.musicBg0.sound.stop();
	let go = new PIXI.Sprite(g.ui.sprites.gameOver);
	go.anchor = {x:0.5, y:0.5};
	go.tag="gameOver";
	go.scale = new PIXI.Point(2,2);
	go.x = g.ui.width/2;
	go.y = g.ui.height/3;
	g.ui.stage.addChild(go);
};
g.gameUpdate = function(delta) {
	g.pointsText.text = g.points;
	g.pointsText.x = g.ui.width - 10 - (g.points.toString().length)*20;
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.update === "function") ent.update(delta);
	}, this);
};
g.gameRender = function() {
	
	g.ctx.clearRect(0, 0, g.ui.canvas.width, g.ui.canvas.height);
	
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.renderer === "function") ent.renderer(g.ctx);
	}, this);
	
	Background.drawFloorGrid();
	
	g.ctx.save();
	g.ui.renderer.render(g.ui.stage);
	g.ctx.restore();

	//if (g.state=="gameOver") Background.drawHazeGrid();
	
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.postRenderer === "function") ent.postRenderer();
	}, this);

	if (g.state=="gameOver") g.halt(g.state);
	
};
