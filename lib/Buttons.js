SimpleButtons = {};

SimpleButtons.Button = function(x, y, sprite, click) {
	this.x = x;
	this.y = y;
	this.w = sprite[3];
	this.h = sprite[4];
	this.img = sprite[0];
    this.xOff = sprite[1];
    this.yOff = sprite[2];
	this.click = click;
};

SimpleButtons.Button.prototype.render = function(ctx) {
    ctx.drawImage(this.img,
                  this.xOff,
                  this.yOff,
                  this.w,
                  this.h,
                  this.x,
                  this.y,
                  this.w,
                  this.h);
};

SimpleButtons.Buttons = function() {
	this.buttonList = [];
	
	this.addButton = function(x, y, sprite, click) {
		var newButton = new SimpleButtons.Button(x, y, sprite, click);
		this.buttonList.push(newButton);
	};
	
	this.render = function(ctx) {
		for (var i = 0; i < this.buttonList.length; i++) {
			this.buttonList[i].render(ctx);
		}
	};
	
	this.mouseClick = function(mX, mY) {
		for (var i = 0; i < this.buttonList.length; i++) {
			if (mY >= this.buttonList[i].y && mY <= this.buttonList[i].y + this.buttonList[i].h) {
				if (mX >= this.buttonList[i].x && mX <= this.buttonList[i].x + this.buttonList[i].w) {
					this.buttonList[i].click();
				}
			}
		}
	};

};