(function(window){
	var intercalId;
	var speed = 1000;
	function Tetris(){
		this.board = new Board(this);
		this.score = new Score();
		this.timer = new Timer();
		this.level = new Level();
		this.nextShape = new NextShape();
		this.sound;
		this._state = 'playing';
		(new KeyBoard()).init(this.board);
	}
	
	Tetris.prototype = {
		constructor:Tetris,
		_initAudio:function(){
			this.sound = new Howl({src:['audio/bg.wav'],
			loop:true,
			vulume:0.3});
			this.sound.play();
		},
		startGame:function(){
			var self = this;
			intercalId = window.setInterval(function(){
				self.board.tick();
			},speed);
			this._initAudio();
			
		},
		endGame:function(){
			this.sound.stop();
			this.timer.stop();
		},
		pause:function(){
			if (this._state === 'over') {
				return;
			}
			this.sound.pause();
			this._state = 'pause';
			this.timer.pause();
			
		},
		resume:function(){
			if (this._state === 'over') {
				return;
			}
			this.sound.play();
			this._state = 'playing'
			this.timer.resume();
		}
	};
	window.Tetris= Tetris
})(window)
