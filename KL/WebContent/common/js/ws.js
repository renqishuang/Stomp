(function(){
	CreateWSClient={
		create:function(){
			function WSClient(){}
			WSClient.prototype={
				isConnect:false,
				heartInterval:120000,
				againConnectTime:5000,
				isConnecting:false,
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
								if(typeof againConnectInterval !== 'undefined'){
									clearInterval(againConnectInterval);
									againConnectInterval = null;
								}
								successcallback(_this);
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
								_this.closeHeart();
								_this.isConnect = false;
								//server request close , client need invoke close function
								if(_this.ws != null){
									_this.ws.close();
								}
								_this.ws=null;
								_this.reconnect();
								closecallback();
							};
						})(this);
					}
					return this;
				},
				closeHeart:function(){
					var me = this;
					if(typeof me.setHeartInterval !== 'undefined'){
						clearInterval(me.setHeartInterval);
					}
				},
				sendHeart:function(){
					var me = this;
					if(me.ws && me.ws.readyState === 1){
						if(typeof me.setHeartInterval === 'undefined'){
							me.setHeartInterval= setInterval(function(){
								console.log('send heart -beat');
								me.ws.send('send heart beat');
							},me.heartInterval);
						}
					}
				},
				sendMsg:function(msg){
					if(this.ws && this.ws.readyState === 1){
						//console.log('发送消息---------->');
						console.log(JSON.parse(msg));
						this.ws.send(msg);
					}
				},
				reconnect:function(){
					var me = this;
					if(typeof againConnectInterval === 'undefined' ||
							againConnectInterval === null){
						window.againConnectInterval = setInterval(function(){
							if(me.isConnect == true) return;
							console.log('重连');
							//console.log('again connect');
							me.connect(me.url,me.successcallback,me.failcallback,me.messagecallback,
									me.closecallback);
						},me.againConnectTime);
					}
				}
			};
			var client = new WSClient();
			return client;
		}	
	};
})();