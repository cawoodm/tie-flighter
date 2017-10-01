/*global Bullet*/
g.ui.keys = {
	left: Keyboard(["a", "ArrowLeft"]) // left arrow
	,right: Keyboard(["d", "ArrowRight"]) // right arrow
	,fire: Keyboard(" ") // space
	,fireM: Keyboard("click") // Mouse click
	,debug: Keyboard("clickCtrl") // Mouse click
};

g.ui.keys.left.down = function() {
	if (g.state!="play") return;
	if(g.player.acc.x>-0.2) g.player.acc.x -= 0.1;
	if (g.player.speed.x>=0) {g.player.acc.x = -0.1; g.player.speed.x = -0.75;}
	//dp("Left", g.player.speed.x,g.player.acc.x);
};
g.ui.keys.right.down = function() {
	if (g.state!="play") return;
	if(g.player.acc.x<0.2) g.player.acc.x += 0.1;
	if (g.player.speed.x<=0) {g.player.acc.x = 0.1; g.player.speed.x = 0.75;}
	//dp("Right", g.player.speed.x,g.player.acc.x);
};
g.ui.keys.fire.press = function(e) {
	if (g.state=="gameOver" || g.state=="title") return g.restart();
	if (g.state!="play") return;
	if (e && e.ctrlKey) {
		//Enemies.add();
		return;
	}
	if (g.player.position) {
		if (e && e.touches) g.player.setPosition({x:e.touches[0].clientX-g.ui.canvas.offsetLeft},true);
		g.entity.add(new Bullet(g.player.position));
	}
}
g.ui.keys.fireM.press = g.ui.keys.fire.press;

function Keyboard(keyCode) {
	var key = {};
	key.codes = Array.isArray(keyCode)?keyCode:[keyCode];
	key.isDown = false;
	key.isUp = true;

	key.downHandler = function(event) {
		if (event.key === key.codes || key.codes.includes(event.key)) {
			if (key.down) key.down();
			else if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
			event.preventDefault();
		}
	};

	key.upHandler = function(event) {
		if (event.key === key.codes || key.codes.includes(event.key)) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
			event.preventDefault();
		}
	};
	key.clickHandler = function(event) {
		key.press(event);
		event.preventDefault();
	}

	if (keyCode!=="click") {
		window.addEventListener("keydown", key.downHandler.bind(key), false);
		window.addEventListener("keyup", key.upHandler.bind(key), false);
	} else {
		//g.ui.canvas
		document.addEventListener("mousedown", key.clickHandler.bind(key), false);
		document.addEventListener("touchstart", key.clickHandler.bind(key), false);
	}
	return key;
}
