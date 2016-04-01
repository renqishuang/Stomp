function afterInitSysInfo(){
	/*//委托挂单
	getTradeInfoPendingDepute();
	//持仓信息
	getTradeInfoMP();*/
	
	//获取盘口数据
	getTapeInfo();
	//获取交易数据
	getTradeInfoInstStat();
	
	/*//当日委托
	getTradeInfoAllDepute();
	//当日成交
	getTradeInfoAllOrder();
	//条件单查询
	getTradeInfoConOrder();*/
}

$(document).ready(function() {
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
	//获取Canvas相对于页面的偏移量
	var canvas = $id('canvasKL');
	CanvasPagePosition = getPageCoord(canvas);
	CanvasPagePosition.width = canvas.width;
	
	//最大K线个数
	getMaxKLShowCount();
	
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