let Ticker = function(fps, updateCallBack, renderCallback) {
	this.state = "stop";
	this._fps = fps;
	this._frameMillis = 1000 / fps;
	this._updateCallBack = updateCallBack;
	this._renderCallback = renderCallback;
};

Ticker.prototype.start = function() {
	this.state = "go";
	this.lastUpdate=this.lastDraw=window.performance.now();
	this.loop();
}

Ticker.prototype.loop = function() {
	
	if (this.state=="stop") return;
	
	window.requestAnimationFrame(this.loop.bind(this));

	let now = window.performance.now();
	let drawDiff = now - this.lastDraw;
	let updateDiff = now - this.lastUpdate||0;
	
	// 2s passed without drawing -> halt game
	//if (drawDiff>2000) return this.state="stop";

	this._updateCallBack(updateDiff/this._frameMillis);
	this.lastUpdate = now;

	// if enough time has elapsed, draw the next frame
	if (drawDiff > this._frameMillis) {
		this.lastDraw = now - (drawDiff % this._frameMillis);
		this._renderCallback();
	}
}

Ticker.prototype.stop = function() {
	this.state="stop";
}