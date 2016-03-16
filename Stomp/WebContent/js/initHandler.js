$(document).ready(function() {
	window.KLWSClient = null;
	window.KLWSSubscribe = null;
	window.KLMQMessageMonitor = false;
	window.TradeWSClient = null;
	window.LoadHisKLData = false;
	window.CurrentDataTime = null;
	window.LoadHisLineFinish = false;
	window.LoadTapeFinish = false;
	if(window.WebSocket) {
	    var destination;
	    //订阅数据WS接口地址
	    KLWSClient = Stomp.client(KLWebSocketUrl);
	    KLWSClient.connect("","", function(frame) {
			//默认触发1分钟K线图
			$(KLTimeShareList[0]).trigger('mousedown');
	    });
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
	
	//获取盘口数据
	getTapeInfo();
	
	//获取交易数据
	getTradeInfo();
	
	//下单器界面设置
	var orderManagerFirstWrap = $('.KL_OrderManager_FirstWrap');
	if(orderManagerFirstWrap.length != 0){
		orderManagerLeftRegion(orderManagerFirstWrap);
	}
	var orderManagerSecondWrap = $('.KL_OrderManager_SecondWrap');
	if(orderManagerSecondWrap.length != 0 ){
		orderManagerRightRegion(orderManagerSecondWrap);
	}
	
	//下单器数据设置
	
	//账户资金信息设置
	setAccountInfo();
});