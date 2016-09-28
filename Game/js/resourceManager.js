(function(window){
	//缓存Map
	var cacheMap = new Map();
	//资源总数
	var resourceTotalCount = 1;
	//当前加载的资源
	var currentLoaded = 0;
	var isAddLoaded = function(){
		currentLoaded += 1;
		if(currentLoaded===resourceTotalCount && typeof window.resourceManager.onResourceLoaded==='function' ){
			window.resourceManager.onResourceLoaded();
		}
	};
	
	var init = function(){
		var image = new Image();
		image.onload = function(){
			cacheMap.set('blocks',image);
			isAddLoaded();
		}
		image.src = 'img/blocks.png';
	}
	
	var getResource = function(key){
		return cacheMap.get(key);
	}
	window.resourceManager = {
		getResource:getResource,
		init:init,
		onResourceLoaded:null
	}
	
})(window)
