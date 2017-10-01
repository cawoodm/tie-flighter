/*global Enemies*/
const g = {
	ui: {
		fps: 60
		,size: 400
		,scale: 1
		,sprites: {}
	}
	,state: ""
	,entity: {}
	,player: {}
	,keys: {}
};

// Use max of screen
g.ui.win = {
	width: window.innerWidth||document.documentElement.clientWidth||document.body.offsetWidth
	,height: window.innerHeight||document.documentElement.clientHeight||document.body.offsetHeight
};
g.ui.scale = Math.min(g.ui.win.width, g.ui.win.height)/400;
g.ui.width = g.ui.scale * g.ui.size;
g.ui.height = g.ui.scale * g.ui.size;
g.ui.horizon = g.ui.height * 0.3;
g.ui.playzone = g.ui.height * 0.9;

//PIXI.utils.skipHello()
g.ui.renderer = new PIXI.CanvasRenderer({
	width: g.ui.width
	,height: g.ui.height
	,clearBeforeRender: false
	,preserveDrawingBuffer: true
});
console.clear();
g.ui.canvas = g.ui.renderer.view;
g.ctx = g.ui.canvas.getContext("2d");
document.body.appendChild(g.ui.canvas);
g.ui.stage = new PIXI.Container();
g.ui.renderer.render(g.ui.stage)
g.ui.interaction = new PIXI.interaction.InteractionData();
//window.setInterval(dpuu, 100);
//window.DEBUG=1;

PIXI.loader
	.add("sprites", "./resources/sprites/sprites.png")
	.add("enemies", "./resources/sprites/enemies.sprites.json")
	.add("explosion", "./resources/sprites/explosion.sprites.json")
	.add("sfxLaser0", "./resources/sfx/sfx.laser0.mp3")
	.add("sfxExplosion0", "./resources/sfx/sfx.explosion0.mp3")
	.add("sfxExplosion1", "./resources/sfx/sfx.explosion1.mp3")
	.load(function(loader, resources) {
		g.resources = resources;
		g.ui.sprites.base = resources.sprites.texture.baseTexture;
		g.ui.sprites.enemies = resources.enemies.textures;
		g.ui.sprites.player = new PIXI.Texture(g.ui.sprites.base, new PIXI.Rectangle(0, 0, 160, 110));
		g.ui.sprites.bullet = new PIXI.Texture(g.ui.sprites.base, new PIXI.Rectangle(0, 110, 60, 110));
		g.ui.sprites.gameOver = new PIXI.Texture(g.ui.sprites.base, new PIXI.Rectangle(0, 220, 220, 110));
		Enemies.initSprites();
		g.restart();
	});
	