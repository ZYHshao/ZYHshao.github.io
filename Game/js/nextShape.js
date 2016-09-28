(function(window){
	function NextShape(){
		this.canvas = new Canvas('nextShape',100,70);
		this._init();
	}
	
	NextShape.prototype = {
		constructor:NextShape,
		_init:function(){
		
		},
		render:function(shape){
			this.canvas.clear();
			shape.draw(this.canvas.context,20);
		},

	};
	window.NextShape = NextShape;
})(window)