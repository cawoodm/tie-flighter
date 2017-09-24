let g = {
	ui: {
		fps:60
		,width:400
		,height:400
		,sprites: {}
	}
	,state: ""
	,entity: {}
	,player: {}
	,keys: {}
};

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

//let circle = new PIXI.Graphics();circle.beginFill(0x5cafe2);circle.drawCircle(0, 0, 80);circle.x = 100;circle.y = 100;
//g.ui.stage.addChild(circle);

g.fpsMeter = new FPSMeter($("#debug"), {graph: 1, history: 20, theme: "transparent", heat: 1});

PIXI.loader
	.add("sprites", "sprites.png")
	.load(function() {
		g.ui.sprites.base = PIXI.loader.resources.sprites.texture.baseTexture;
		g.ui.sprites.player = new PIXI.Texture(g.ui.sprites.base, new PIXI.Rectangle(0, 0, 160, 110));
		g.ui.sprites.bullet = new PIXI.Texture(g.ui.sprites.base, new PIXI.Rectangle(0, 110, 60, 110));
		g.restart();
	});