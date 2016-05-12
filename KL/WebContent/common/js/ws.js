(function(){
	CreateWSClient={
		create:function(){
			function WSClient(){}
			WSClient.prototype={
				isConnect:false,
				heartInterval:120000,
				againConnectTime:5000,
				isConnecting:false,
				timeout:5,
				timeoutCallBack:function(){
					var me = this;
					var timeout = me.timeout;
					if(typeof this.timeoutInterval === 'undefined' || 
							this.timeoutInterval === null){
						this.timeoutInterval = setInterval(function(){
							if(me.isConnect){
								clearInterval(me.timeoutInterval);
								me.timeoutInterval = null;
								return;
							}
							if(timeout === 0){
								console.log('---------超时了');
								if(me.ws != null){
									me.ws.close();
								}
								clearInterval(me.timeoutInterval);
								me.timeoutInterval = null;
							}
							timeout -= 1;
						},1000);
					}
				},
				connect:function(url,successcallback,failcallback,messagecallback,
						closecallback){
					if(url == '') return;
					this.url = url;
					this.ws = new WebSocket(url);
					this.isConnecting=true;
					if(typeof successcallback == 'function'){
						this.successcallback=successcallback;
						this.ws.onopen=(function(_this){
							return function(){
								_this.isConnect = true;
								_this.sendHeart();
								if(typeof _this.againConnectInterval !== 'undefined'){
									clearInterval(_this.againConnectInterval);
									_this.againConnectInterval = null;
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
									//_this.ws.close();
									_this.ws=null;
								}
								console.log('-----------close');
								_this.isConnecting = false;
								_this.reconnect();
								closecallback();
							};
						})(this);
					}
					this.timeoutCallBack();
					return this;
				},
				closeHeart:function(){
					var me = this;
					if(typeof me.setHeartInterval !== 'undefined'){
						clearInterval(me.setHeartInterval);
						me.setHeartInterval = null;
					}
				},
				sendHeart:function(){
					var me = this;
					if(me.ws && me.ws.readyState === 1){
						if(typeof me.setHeartInterval === 'undefined'){
							me.setHeartInterval= setInterval(function(){
								console.log('---------send heart -beat');
								me.ws.send('send heart beat');
							},me.heartInterval);
						}
					}
				},
				sendMsg:function(msg){
					if(this.ws && this.ws.readyState === 1){
						//console.log(JSON.parse(msg));
						this.ws.send(msg);
					}
				},
				reconnect:function(){
					var me = this;
					if(typeof me.againConnectInterval === 'undefined' ||
							me.againConnectInterval === null){
						me.againConnectInterval = setInterval(function(){
							if(me.isConnect || me.isConnecting) return;
							console.log('----------重连');
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