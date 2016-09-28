(function(window){
	function Timer(){
		this.canvas = new Canvas('timer',100,70);
		this.time = 0;
		this.timeId;
		this._init();
	}
	
	Timer.prototype = {
		constructor:Timer,
		_init:function(){
			this._render();
			var self = this;
			this.timeId = setInterval(function(){
				self.time+=1;
				self._render();
			},1000);
		},
		_format:function(seconds){
			var 	hours = Math.floor(seconds/3600);
			seconds -= hours*3600;
			var minites = Math.floor(seconds/60);
			seconds -= minites*60;
			if (hours<10) {
				hours = '0'+hours;
			}
			if(minites<10){
				minites = '0' + minites;
			}
			if (seconds<10) {
				seconds = '0' + seconds;
			}
			return hours+':'+minites+':'+seconds;
		},
		_render:function(){
			this.canvas.drawText(this._format(this.time));
		},
		pause:function(){
			window.clearInterval(this.timeId);
		},
		resume:function(){
			var self = this;
			this.timeId = window.setInterval(function(){
				self.time+=1;
				self._render();
			},1000);
		},
		stop:function(){
			this.pause();
		}
	};
	window.Timer = Timer;
	
})(window)
