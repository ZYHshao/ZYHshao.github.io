(function(window){
	function Block(blockType){
		this.blockType = blockType;
		this.size = 30;
		this.originalSize = 32;
		this.sprite = window.resourceManager.getResource("blocks");
	}
	Block.prototype = {
		constructor:Block,
		draw: function(context,x,y,blockType,size){
			size = size||this.size;
			var blT = blockType||this.blockType;
			context.drawImage(this.sprite,(blT-1)*this.originalSize,0,this.originalSize,this.originalSize,x*size,y*size,size,size);
		}
	};
	window.Block = Block;
})(window)
