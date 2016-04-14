//K线客户端打开连接回调
function klConnectOpenCallBack(){
	console.log('connect-----------------ws');
	if(typeof KLClientAgainConnect != 'undefined' &&
			KLClientAgainConnect) clearInterval(KLClientAgainConnect);
	console.log('已连接----------------');
	//连接后设置连接状态
	$('.KL_Singal_State_Info').html('');
	$('.KL_Signals_Connect').removeClass('KL_Signals_Connect_Anim');
	//KL_Signals_Connect_Anim
	//给合约添加K线订阅
	addAllInstruKLSubscribe();
	//给合约添加盘口订阅
	addInstruTapeSubscribe(CurrentInstrumentID);
}
//K线客户端关闭连接回调
function klConnectCloseCallBack(){
	console.log('关闭连接回调--------------------ws');
	$('.KL_Singal_State_Info').html('行情连接已断开,正在重新连接');
	$('.KL_Signals_Connect').addClass('KL_Signals_Connect_Anim');
	KLWSClient = null;
	window.KLClientAgainConnect = setInterval(function(){
		/*KLWSClient.disconnect(function(){
			console.log('手动断开连接');
		});
		KLWSClient = null;
		KLWSClient = Stomp.client(KLWebSocketUrl);
		KLWSClient.connect("","", klConnectOpenCallBack,klConnectCloseCallBack);*/
	},1000);
}
//账户AID客户端打开连接回调
function aidConnectOpenCallBack(){
	//监听AID
	listenerAccountID();
}
//账户AID客户端关闭连接回调
function aidConnectOpenCallBack(){
	
}