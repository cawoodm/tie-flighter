/*global Starfield */
function Starfield() {
	this.stars = [];
}
Starfield.prototype.init = function() {
	let n = this.n = 80;
	let w = this.w = g.ui.width;
	let h = this.h = g.ui.height;
	let x = this.x=Math.round(w/2);
	let y = this.y=Math.round(h/2);
	let z = this.z=(w+h)/2;
	this.star_color_ratio=1/z;
	for (let i=0; i < n; i++) {
		this.stars[i]=new Array(5);
		this.stars[i][0]=Math.random()*w*2-x*2;
		this.stars[i][1]=Math.random()*h*2-y*2;
		this.stars[i][2]=Math.round(Math.random()*z);
		this.stars[i][3]=0;
		this.stars[i][4]=0;
	}
}
Starfield.prototype.renderer = function(ctx) {
	ctx.save();
	ctx.fillStyle="#000";
	ctx.strokeStyle="#FFF";
	let star_ratio=256;
	let star_speed=4;
	let mouse_x=(g.player.position.x-this.w/2)/8; // Horizontal angle of stars
	let mouse_y=g.player.y/8; // Vertical angle of stars
	let w = this.w;
	let h = this.h;
	let x = this.x;
	let y = this.y;
	let z = this.z;
	for(let i=0; i<this.n; i++) 	{
		let test=true;
		let star_x_save=this.stars[i][3];
		let star_y_save=this.stars[i][4];
		this.stars[i][0]+=mouse_x>>4; if(this.stars[i][0]>x<<1) { this.stars[i][0]-=w<<1; test=false; } if(this.stars[i][0]<-x<<1) { this.stars[i][0]+=w<<1; test=false; }
		this.stars[i][1]+=mouse_y>>4; if(this.stars[i][1]>y<<1) { this.stars[i][1]-=h<<1; test=false; } if(this.stars[i][1]<-y<<1) { this.stars[i][1]+=h<<1; test=false; }
		this.stars[i][2]-=star_speed; if(this.stars[i][2]>z) { this.stars[i][2]-=z; test=false; } if(this.stars[i][2]<0) { this.stars[i][2]+=z; test=false; }
		this.stars[i][3]=x+(this.stars[i][0]/this.stars[i][2])*star_ratio;
		this.stars[i][4]=y+(this.stars[i][1]/this.stars[i][2])*star_ratio;
		if(star_x_save > 0 && star_x_save < this.w && star_y_save>0 && star_y_save < this.h && test) {
			ctx.lineWidth=(1-this.star_color_ratio*this.stars[i][2])*2;
			ctx.beginPath();
			ctx.moveTo(star_x_save,star_y_save);
			ctx.lineTo(this.stars[i][3],this.stars[i][4]);
			ctx.stroke();
			ctx.closePath();
		}
	}
	ctx.restore();
}
Starfield.prototype.render2 = function() {
}