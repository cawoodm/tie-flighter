/*global Bullet*/
g.ui.keys = {
	left: keyboard(["a", "ArrowLeft"]) // left arrow
	,right: keyboard(["d", "ArrowRight"]) // right arrow
	,fire: keyboard(" ") // space
	,fireM: keyboard("click") // space
};

g.ui.keys.left.down = function() {
	if(g.player.acc.x>-0.2) g.player.acc.x -= 0.1;
	if (g.player.speed.x>=0) {g.player.acc.x = -0.1; g.player.speed.x = -0.75;}
	//dp("Left", g.player.speed.x,g.player.acc.x);
};
g.ui.keys.right.down = function() {
	if(g.player.acc.x<0.2) g.player.acc.x += 0.1;
	if (g.player.speed.x<=0) {g.player.acc.x = 0.1; g.player.speed.x = 0.75;}
	//dp("Right", g.player.speed.x,g.player.acc.x);
};
g.ui.keys.fire.press = function() {
	if (g.player) g.entity.add(new Bullet(g.player.position));
}
g.ui.keys.fireM.press = g.ui.keys.fire.press;

function keyboard(keyCode) {
	var key = {};
	key.codes = keyCode;
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
		key.press();
		event.preventDefault();
	}

	if (keyCode!="click") {
		window.addEventListener("keydown", key.downHandler.bind(key), false);
		window.addEventListener("keyup", key.upHandler.bind(key), false);
	} else {
		window.addEventListener("mousedown", key.clickHandler.bind(key), false);
		window.addEventListener("touchstart", key.clickHandler.bind(key), false);
	}
	return key;
}