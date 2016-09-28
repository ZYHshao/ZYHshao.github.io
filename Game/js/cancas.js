(function(window) {
	/**
	 * Canvas 操作类 
	 * @param {Object} canvasId  
	 * @param {Object} width   宽度
	 * @param {Object} height  高度
	 */
	function Canvas(canvasId, width, height) {
		this.canvasId = canvasId;
		this.el = document.getElementById(canvasId);
		if(!this.el) {
			throw new Error("Must provider a right canvas");
		}
		this.context = this.el.getContext('2d');
		this.width = width;
		this.height = height;
		this._init();
	}
	//对原型进行设置
	Canvas.prototype = {
		constructor: Canvas,
		_init: function() {
			this.el.width = this.width;
			this.el.height = this.height;
		},
		clear: function(formX, formY, toX, toY) {
			formX = formX || 0;
			formY = formY || 0;
			toX = toX || this.width;
			toY = toY || this.height;
			this.context.clearRect(formX, formY, toX, toY);
		},
		drawText:function(text,x,y){
			this.clear(0,0);
			this.context.font = '25px Arial';
			this.context.fillStyle = 'purple';
			this.context.textAlign = 'center';
			this.context.fillText(text,x===undefined?(this.width/2):x,y===undefined?(this.height/2):y);
		}
	};
	window.Canvas = Canvas
})(window)