//import {pixi} from "./pixi.js";

let g = {
	ui: {
		fps:60
	}
	,loop: {}
	,state: ""
};

// Setup rendering surface
//g.app = new PIXI.Application({width: 400, height:400});
PIXI.utils.skipHello()
g.ui.renderer = new PIXI.CanvasRenderer({
	width: 400
	,height: 400
	,clearBeforeRender: false
	,preserveDrawingBuffer: true
});
g.ui.canvas = g.ui.renderer.view;
g.ctx = g.ui.canvas.getContext("2d");
document.body.appendChild(g.ui.canvas);
g.ui.stage = new PIXI.Container();
g.ui.renderer.render(g.ui.stage)

g.ui.draw = new PIXI.Graphics();
g.ui.draw.lineStyle(2, 0x0000FF, 1);
g.ui.draw.drawRect(0, 0, 10, 10);
g.ui.stage.addChild(g.ui.draw);

let circle = new PIXI.Graphics();circle.beginFill(0x5cafe2);circle.drawCircle(0, 0, 80);circle.x = 100;circle.y = 100;
//g.ui.stage.addChild(circle);

PIXI.loader
.add("s1", "sprite.png")
.load(function() {
	g.loop.graph = new FPSMeter($("#debug"), {graph: 1, history: 20, theme: "transparent", heat: 1});
	var sprite = new PIXI.Sprite(
		PIXI.loader.resources.s1.texture
	);
	sprite.position.x=200;
	sprite.position.y=200;
	//g.ui.stage.addChild(sprite);
	g.restart();
});

g.start = function() {
	g.ui.frameMillis = 1000 / g.ui.fps;
	g.loop.lastUpdate=g.loop.lastDraw=window.performance.now();
	//console.clear();
	g.loop.main();
}

g.loop.main = function() {
	requestAnimationFrame(g.loop.main);
	
	if (g.state=="halt") return;
	
	let now = window.performance.now();
	let drawDiff = now - g.loop.lastDraw;
	let updateDiff = now - g.loop.lastUpdate||0;
	//dp("Loop", now, updateDiff)
	
	// 2s passed without drawing -> halt game
	if (drawDiff>200) dp("Dropping Framerate!", drawDiff);
	if (drawDiff>2000) return g.state="halt";

	g.gameUpdate(updateDiff);
	g.loop.lastUpdate = now;

	// if enough time has elapsed, draw the next frame
	if (drawDiff > g.ui.frameMillis) {
		g.loop.lastDraw = now - (drawDiff % g.ui.frameMillis);
		
		
		// draw
		g.gameRender();
		g.loop.graph.tick();
	}
}
g.halt=function() {
	if (g.state=="halt") {
		g.state="";
		g.loop.lastUpdate=g.loop.lastDraw=window.performance.now();
	} else {
		g.state="halt";
	}
}

let Vector = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
	this.area = () => this.x * this.y;
};

g.restart = function() {
	g.scenes = {
		menu: {entities: []}
		,level1: {entities: []}
	};
	g.scene = g.scenes.level1;
	g.scene.entities.push({
		init: function() {
			this.position = new Vector(0, 30);
			this.speed = new Vector(400/30, 0); // speed per frame = 60px per sec
			this.size = new Vector(60, 60);
			//this.circle = new PIXI.Graphics();
      // circle.beginFill(0x5cafe2);
      // circle.drawCircle(0, 0, 80);
      // circle.x = 320;
      // circle.y = 180;
      // g.app.stage.addChild(circle);
		}
		, update: function(delta) {
			// dp("DRAWING blue ", this.position.x, this.position.y, delta.toFixed(2), (delta/g.ui.frameMillis).toFixed(2));
			bounce(this,"blue");
			this.position.x+=this.speed.x*delta/g.ui.frameMillis;
			this.position.y+=this.speed.y*delta/g.ui.frameMillis;
		}
		, renderer: function() {
			g.ctx.save();
			if (1==1) {
				g.ui.draw.clear();
				g.ui.draw.beginFill(0x0000FF);
				g.ui.draw.drawRect(this.position.x, this.position.y, this.size.x, this.size.y); 
			} else {
				g.ctx.fillStyle = "blue";
				g.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
				g.ctx.restore();
			}
		}
	});
	g.scene.entities.push({
		init: function() {
			this.position = new Vector(0, 100);
			this.speed = new Vector(400/30, 0); // speed per frame = 60px per sec
			this.size = new Vector(60, 60);
		}
		, update: function(delta) {
			// dp("DRAWING red ", this.position.x, this.position.y, delta.toFixed(2), (delta/g.ui.frameMillis).toFixed(2));
			bounce(this,"red");
			this.position.x+=this.speed.x//*delta/g.ui.frameMillis;
			this.position.y+=this.speed.y//*delta/g.ui.frameMillis;
		}
		, renderer: function() {
			g.ctx.save();
			g.ctx.fillStyle = "red";
			g.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
			g.ctx.restore();
		}
	});
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.init === "function") ent.init();
	});
	g.start();
}
function bounce(ent, name) {
	if (ent.position.x<=0 || ent.position.x>=g.ui.canvas.width) {
		let now = window.performance.now();
		//dp("%ca", `color: ${name}`, now, "Diff", name, ent.position.x, now-ent.lastBounce||0, Math.abs(500-(now-ent.lastBounce)))
		ent.lastBounce = now
	}
	if (ent.position.x<=0) {ent.position.x=0;ent.speed.x=Math.abs(ent.speed.x);}
	if (ent.position.x>=g.ui.canvas.width) {ent.position.x=g.ui.canvas.width; ent.speed.x=-Math.abs(ent.speed.x);}
	if (ent.position.y<=0) ent.speed.y=Math.abs(ent.speed.y);
	if (ent.position.y>=g.ui.canvas.height) ent.speed.y=-Math.abs(ent.speed.y);
}
g.gameUpdate = function(delta) {
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.update === "function") ent.update(delta);
	}, this);
}
g.gameRender = function(delta) {
	
	g.ctx.clearRect(0, 0, g.ui.canvas.width, g.ui.canvas.height);
	
	g.scene.entities.forEach(function(ent) {
		if (typeof ent.renderer === "function") ent.renderer();
	}, this);
	
	g.ctx.save();
	g.ui.renderer.render(g.ui.stage);
	g.ctx.restore();

	//TODO: PIXI.CanvasRenderer#registerPlugin
}