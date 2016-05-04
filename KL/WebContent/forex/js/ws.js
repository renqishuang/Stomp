(function(){
	WSClient={
		isConnect:false,
		heartInterval:120000,
		againConnectTime:2000,
		connect:function(url,successcallback,failcallback,messagecallback,
				closecallback){
			if(url == '') return;
			this.url = url;
			this.ws = new WebSocket(url);
			if(typeof successcallback == 'function'){
				this.successcallback=successcallback;
				this.ws.onopen=(function(_this){
					return function(){
						_this.isConnect = true;
						_this.sendHeart();
						if(_this.againConnectInterval){
							clearInterval(_this.againConnectInterval);
						}
						successcallback(_this.ws);
					};
				})(this);
			}
			
			if(typeof failcallback == 'function'){
				this.failcallback = failcallback;
				this.ws.onerror=failcallback;
			}
			
			if(typeof messagecallback == 'function'){
				this.messagecallback = messagecallback;
				this.ws.onmessage=messagecallback;
			}
			
			if(typeof closecallback == 'function'){
				this.closecallback=closecallback;
				this.ws.onclose=(function(_this){
					return function(){
						_this.isConnect = false;
						//server request close , client need invoke close function
						_this.ws.close();
						_this.reconnect();
						closecallback();
					};
				})(this);
			}
			return this.ws;
		},
		sendHeart:function(){
			var me = this;
			if(me.ws && me.ws.readyState === 1){
				me.setHeartInterval = setInterval(function(){
					console.log('send heart -beat');
					me.ws.send('send heart beat');
				},me.heartInterval);
			}
		},
		reconnect:function(){
			var me = this;
			me.againConnectInterval = setInterval(function(){
				if(me.isConnect == true) return;
				console.log('again connect');
				me.connect(me.url,me.successcallback,me.failcallback,me.messagecallback,
						me.closecallback);
			},me.againConnectTime);
		}
	};
})();