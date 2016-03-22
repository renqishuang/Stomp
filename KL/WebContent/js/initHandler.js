function afterInitSysInfo(){
	//委托挂单
	getTradeInfoPendingDepute();
	//获取盘口数据
	getTapeInfo();
	//获取交易数据
	getTradeInfoInstStat();
	//持仓信息
	getTradeInfoMP();
	//当日委托
	getTradeInfoAllDepute();
	//当日成交
	getTradeInfoAllOrder();
	//条件单查询
	getTradeInfoConOrder();
	
	var re_oper = "";
	
}
$(document).ready(function() {
	window.KLWSClient = null;
	window.KLWSSubscribe = null;
	window.KLMQMessageMonitor = false;
	window.TradeWSClient = null;
	window.LoadHisKLData = false;
	window.CurrentDataTime = null;
	window.LoadHisLineFinish = false;
	window.LoadTapeFinish = false;
	window.CurrentInstrumentDigits = 0;
	console.log(Math.round(499.9));
	if(window.WebSocket) {
	    var destination;
	    //订阅KL数据
	    KLWSClient = Stomp.client(KLWebSocketUrl);
	    KLWSClient.connect("","", function(frame) {
			console.log('connect-----------------ws');
	    });
	    //订阅资金(交易)数据
	    TradeWSClient = Stomp.client(TradeWebSocketUrl);
	    TradeWSClient.connect('','',function(){
	    	
	    });
	 }else {
	    return;
	 }
	
	 //分时段设置
	var KLTimeShareDiv = $('div.KL_TimeShareChart_Interval');
	var KLTimeShareList = KLTimeShareDiv.find("li");
	setKLIntervalEvent(KLTimeShareList);
	
	//下单器界面设置
	var orderManagerFirstWrap = $('.KL_OrderManager_FirstWrap');
	if(orderManagerFirstWrap.length != 0){
		orderManagerLeftRegion(orderManagerFirstWrap);
	}
	var orderManagerSecondWrap = $('.KL_OrderManager_SecondWrap');
	if(orderManagerSecondWrap.length != 0 ){
		orderManagerRightRegion(orderManagerSecondWrap);
	}
	//账户资金信息设置
	getAccountInfo();
});