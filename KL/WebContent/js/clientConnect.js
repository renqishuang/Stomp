//K线客户端打开连接回调
function klConnectOpenCallBack(client){
	if(KLWSClient == null){
		KLWSClient = client;//重连后,重新赋值KLWSClient
	}
	console.log('connect-----------------ws');
	KLWebSocketConnect = true;
	if(typeof KLClientAgainConnect != 'undefined' &&
			KLClientAgainConnect) {
		clearInterval(KLClientAgainConnect);
	}
	console.log('已连接----------------');
	//连接后设置连接状态
	$('.KL_Singal_State_Info').html('');
	$('.KL_Signals_Connect').removeClass('KL_Signals_Connect_Anim');
	//KL_Signals_Connect_Anim
	//判断WS的连接状态
	//if(KLWSClient.ws.readyState == 1){
		//给合约添加K线订阅
		addAllInstruKLSubscribe();
		//给合约添加盘口订阅
		addInstruTapeSubscribe(CurrentInstrumentID);
	//}
}
//K线客户端关闭连接回调
function klConnectCloseCallBack(){
	KLWebSocketConnect = false;
	KLWebSocketCloseMark = true;
	console.log('关闭连接回调--------------------ws');
	$('.KL_Singal_State_Info').html('行情连接已断开,正在重新连接...');
	$('.KL_Signals_Connect').addClass('KL_Signals_Connect_Anim');
	window.KLClientAgainConnect = setInterval(function(){
		if(KLWebSocketConnect == true) return;
		/*KLWSClient.disconnect(function(){
			console.log('手动断开连接');
		});*/
		KLWSClient = null;
		var tempClient = Stomp.client(KLWebSocketUrl);
		tempClient.connect("","", klConnectOpenCallBack,klConnectCloseCallBack);
	},2000);
}
//账户AID客户端打开连接回调
function aidConnectOpenCallBack(client){
	if(TradeWSClient == null){
		TradeWSClient = client;
	}
	if(typeof TradeClientAgainConnect != 'undefined' && 
			TradeClientAgainConnect){
		clearInterval(TradeClientAgainConnect);
	}
	TradeWebSocketConnect = true;
	console.log('客户端AID监听成功');
	//监听AID
	//if(TradeWSClient.ws.readyState == 1){
		listenerAccountID();
	//}
}
//账户AID客户端关闭连接回调
function aidConnectCloseCallBack(){
	TradeWebSocketConnect = false;
	window.TradeClientAgainConnect = setInterval(function(){
		if(TradeWebSocketConnect == true) return;
		TradeWSClient = null;
		var tempClient = Stomp.client(TradeWebSocketUrl);
		tempClient.connect('','',aidConnectOpenCallBack,aidConnectCloseCallBack);
	},2000);
	console.log('客户端AID监听失败');
}