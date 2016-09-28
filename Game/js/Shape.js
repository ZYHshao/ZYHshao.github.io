(function(window){
	function Shape(){
		this.blockType = this.random(1,7);
		this.block = new Block(this.blockType);
		this.x = 0;
		this.y = 0;
		this.Layouts = [
			[[0,1,0],[1,1,1]],
			[[1,1,1,1]],
			[[1,1],[1,1]],
			[[0,1],[1,1],[1,0]],
			[[1,0],[1,1],[0,1]],
			[[1,0,1],[1,1,1]],
			[[0,1],[1,1]],
			[[1,1]],
			[[1,1],[1,0],[1,0]],
			[[1,1],[0,1],[0,1]]			
		];
		this.typeCount = this.Layouts.length;
		this.layout = this.Layouts[this.random(0,this.typeCount)];
	};
	
	Shape.prototype = {
		constructor:Shape,
		draw: function(context,size){
			for (var i=0;i<this.layout.length;i++) {
				for(var j=0;j<this.layout[i].length;j++){
					if(this.layout[i][j]){
						this.block.draw(context,j+this.x,i+this.y,undefined,size);
					}
				}
			}
		},
		random(minValue,maxValue){
			return minValue + Math.floor(Math.random()*(maxValue-minValue))
		},
		rotate:function(){
			var newLayout = [];
			for (var y=0;y<this.layout[0].length;y++) {
				newLayout[y] = [];
				for (var x=0;x<this.layout.length;x++) {
					newLayout[y][x] = this.layout[this.layout.length-1-x][y];
				}
			}
			this.layout = newLayout;
			this.setLayout();
			
		},
		setLayout:function(){
			if(this.x<0){
				this.x=0;
			}
			if(this.y<0){
				this.y=0;
			}
			if (this.x+this.layout[0].length>13) {
				this.x = 13-this.layout[0].length;
			}
			if(this.y+this.layout.length>20){
				this.y = 20-this.layout.length;
			}
		}
	};
	window.Shape= Shape;
	
})(window);
