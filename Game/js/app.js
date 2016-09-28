(function(document){
	var gameInset;
	function DomObject(dom){
		this.dom = dom;
	};
	DomObject.prototype.get = function(){
		return this.dom;
	};
	DomObject.prototype.on = function(eventName,eventHandler){
		this.get().addEventListener(eventName,eventHandler);
	};
	DomObject.prototype.css = function(styleKey,styleValue){
		this.get().style[styleKey] = styleValue
	};
	function $(selector,context){
		return new DomObject((context||document).querySelector(selector));	
	};
	function startGame(){
		resourceManager.onResourceLoaded = function(){
			gameInset = new Tetris();
			gameInset.startGame();
		};
		resourceManager.init();
	}
	
	function _init(){
		$('#start-btn').on('click',function(ev){
			$('.start-container').css('display','none');
			$('.game-container').css('display','block');
			startGame();
		});
		$('#setting-btn').on('click',function(ev){
			alert("you click the setting button");
		});
		$('#btn-game-pause').on('click',function(ev){
			var el = ev.target;
			if(el.innerText === '暂停'){
				el.innerText = '继续';
				gameInset.pause();
			}else{
				el.innerText = '暂停';
				gameInset.resume();
			}
		})
	};
	document.addEventListener("DOMContentLoaded",function(ev){
		_init();	
	});
})(document)
