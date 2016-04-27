(function(){
	window.WSClient={
		connect:function(url,successcallback,failcallback,messagecallback,
				closecallback){
			this.ws = new WebSocket(url);
			if(typeof successcallback == 'function'){
				this.ws.onopen=(function(_this){
					return function(){
						successcallback(_this.ws);
					};
				})(this);
			}
			this.ws.onerror=failcallback;
			this.ws.onmessage=messagecallback;
			this.ws.onclose=closecallback;
			return this.ws;
		}
	};
})();