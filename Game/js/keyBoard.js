(function(window) {
	var Keys = {
		38: 'top',
		39: 'right',
		40: 'down',
		37: 'left'
	};

	function KeyBoard() {
		this.board;
	};
	KeyBoard.prototype = {
		constructor: KeyBoard,
		init: function(board) {
			var self = this;
			this.board = board;
			document.addEventListener('keydown', function(ev) {
				self.processKeyDown(ev);
			});
		},
		processKeyDown: function(ev) {
			if(this.board.gameInset._state === 'pause'||this.board.gameInset._state === 'over'){
				return;
			}
			if(Keys[ev.keyCode]) {
				this.press(Keys[ev.keyCode]);
			}
		},
		press: function(key) {
			var refresh = false;
			switch(key) {
				case 'top':
				{
					this.board.shape.rotate();
					refresh = true;
				}
					break;
				case 'right':
					if(this.board.vaildMove(1,0)){
						this.board.shape.x += 1;
						refresh = true;
					}
					break;
				case 'left':
					if(this.board.vaildMove(-1,0)){
						this.board.shape.x -= 1;
						refresh = true;
					}
					break;
				case 'down':
				    if(this.board.vaildMove(0,1)){
						this.board.shape.y += 1;
						refresh = true;
					}
					break;
			}
			if(refresh){
				this.board.refresh();
				this.board.shape.draw(this.board.context);
			}

		}
	};
	window.KeyBoard = KeyBoard;
})(window)