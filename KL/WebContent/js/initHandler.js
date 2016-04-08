//添加MQ订阅
function addMQTopicSubscribe(){
	setTimeout(function(){
		//监听AID
		listenerAccountID();
	},500);
	setTimeout(function(){
		if(TapWSSubscribe) TapWSSubscribe.unsubscribe();
		//监听盘口数据
		TapWSSubscribe = KLWSClient.subscribe('/topic/'+CurrentInstrumentID+'_TAPE',function(message){
			//console.log("盘口数据");
			console.log('topic-tape------------------------');
			var tempData = JSON.parse(message.body);
			if(tempData.instrumentid == CurrentInstrumentID){
				TapeOneViewerHandler(tempData);
				TapeTwoViewerHandler(tempData);
				TapeThreeViewerHandler(tempData);
			}
		});
	},500);
}

function afterInitSysInfo(){
	//获取盘口数据
	getTapeInfo();
	setTimeout(function(){
		//获取交易数据
		getTradeInfoInstStat();
	},200);
	setTimeout(function(){
		//监听MQ
		addMQTopicSubscribe();
	},500);
}

$(document).ready(function() {
	//设置Canvas的宽度
	var mainViewCenter = $('.KL_MainView_Region_Center');
	var moveWidth = $('.KL_Canvas_Move_Wrap').width();
	var yAxisWidth = $('.KL_Canvas_Y_Axis_Region').width();
	var initWidth = mainViewCenter.width()-moveWidth-yAxisWidth-10;
	$('.KL_Canvas')[0].width = 1500;
	$('.KL_Canvas')[0].width = initWidth;
	//获取Canvas相对于页面的偏移量
	var canvas = $id('canvasKL');
	CanvasPagePosition = getPageCoord(canvas);
	CanvasPagePosition.width = initWidth;
	//return;
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
	//当前屏幕显示的最大K线个数
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