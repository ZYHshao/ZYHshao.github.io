(function(window){
	function Board(gameInset){
	this.gameInset = gameInset;
	this.blockSize = 30;
	this.rows = 20;
	this.clos = 13;
	this.canvas = new Canvas('c_game_main',390,600);
	this.context = this.canvas.context;
	this.boradList = [];
	this.shape = new window.Shape();
	this._init();
	
}

Board.prototype = {
	constructor:Board,
	_init:function(){
		this._buildGridData();
		this._initGrid();
		this.shape.draw(this.context);
		var self= this;
		setTimeout(function(){
			self._buildNextShape();
		});
	},
	_buildGridData(){
		for(var i = 0;i<this	.rows;i++){
			this.boradList[i] = [];
			for (var j=0;j<this.clos;j++) {
				this.boradList[i][j]=0;
			}
		}
		console.log(this.boradList);
	},
	_buildNextShape:function(){
		this.nextShape = new window.Shape();
		this.gameInset.nextShape.render(this.nextShape);
	},
	_initGrid(){
		var i;
		this.context.strokeStyle = 'green'
		this.context.lineWidth = 0.5;
		//绘制
		for(i=0;i<this.rows;i++){
			this.context.moveTo(0,i*this.blockSize);
			this.context.lineTo(this.canvas.width,i*this.blockSize);
		}
		for (i=0;i<this.clos;i++) {
			this.context.moveTo(i*this.blockSize,0);
			this.context.lineTo(i*this.blockSize,this.canvas.height);
		}
		this.context.stroke();
		//缓存数据
		this.gridImageData = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
	},
	tick:function(){
		if(this.gameInset._state === 'pause'||this.gameInset._state==='over'){
			return;
		}
		if(this.vaildMove(0,1)){
			this.shape.y += 1;
		}else{
			this.addShapeBoardList();
			if(this.gameInset._state === 'over'){
				this.gameInset.endGame();
				return;
			}
			this.shape = this.nextShape;
			this._buildNextShape();
			
			this.clearFullRows();
		}
		this.refresh();
	},
	refresh:function(){
		this.canvas.clear();
		this.context.putImageData(this.gridImageData,0,0);
		this.shape.draw(this.context);
		this.drawBlocks();
	},
	vaildMove:function(moveX,moveY){
		var nextX = this.shape.x+moveX;
		var nextY = this.shape.y+moveY;
		for (var y=0;y<this.shape.layout.length;y++) {
			for (var x=0;x<this.shape.layout[y].length;x++) {
				if(this.shape.layout[y][x]){
					if(typeof this.boradList[nextY+y]==='undefined'||
					typeof this.boradList[nextY+y][nextX+x]==='undefined'||
					this.boradList[nextY+y][nextX+x]||
					nextX+x<0||
					nextX+x>=this.cols||
					nextY+y>=this.rows){
						return false;
					}
				}
			}
		}
		return true;
	},
	addShapeBoardList:function(){
		for (var y=0;y<this.shape.layout.length;y++) {
			for (var x=0;x<this.shape.layout[y].length;x++) {
				if(this.shape.layout[y][x]){
					var boardX = this.shape.x+x;
					var boardY = this.shape.y+y;
					if(this.boradList[boardY][boardX]){
						this.gameInset._state = 'over';
						return;
					}else{
						this.boradList[boardY][boardX] = this.shape.blockType;
					}
				}
			}
		}
	},
	drawBlocks:function(){
		for (var y=0;y<this.rows;y++) {
			for (var x=0;x<this.clos;x++) {
				if(this.boradList[y][x]){
					this.shape.block.draw(this.context,x,y,this.boradList[y][x]);
				}
			}
		}
	},
	creatEmptyRow(){
		var emptyArr = [];
		for (var i=0;i<this.clos;i++) {
			emptyArr.push(0);
		}
		return emptyArr;
	},
	clearFullRows:function(){
		var lines = 0;
		for(var y=this.rows-1;y>=0;y--){
			var filled = this.boradList[y].filter(function(item){return item>0;}).length === this.clos;
			if(filled&&y){
				this.boradList.splice(y,1);
			    this.boradList.unshift(this.creatEmptyRow());
			    y++;
			    lines++;
			}
		}
		var score = lines*100*lines;
		var score = this.gameInset.score.addScore(score);
		var level = this.gameInset.level.checkLevel(score);
		if (level) {
			this.gameInset.pause();
			var self= this;
			setTimeout(function(){
				window.alert('恭喜您升级了！');
				self.gameInset.resume();
			});
		}
		
	}
}
window.Board = Board
})(window)


