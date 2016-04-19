//系统数据加载完成后调用
function afterInitSysInfo(){
	//获取盘口数据
	getTapeInfo();
	//获取交易数据
	getTradeInfoInstStat();
	if(window.WebSocket) {
	    var destination;
	    //订阅KL数据
	    KLWSClient = Stomp.client(KLWebSocketUrl);
	    KLWSClient.connect("","", klConnectOpenCallBack,klConnectCloseCallBack);
	    //订阅资金(交易)数据
	    TradeWSClient = Stomp.client(TradeWebSocketUrl);
	    TradeWSClient.connect('','',aidConnectOpenCallBack,aidConnectOpenCallBack);
	}
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
	
	//当前屏幕显示的最大K线个数
	getMaxKLShowCount();
	//禁用右键菜单事件
	document.oncontextmenu = function(){return false;}; 
	
	//获取MA设置
	getMAInitDT();
	
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
	
	//账户信息界面设置
	var KLFooterWrap = $('.KL_FooterRegion');
	if(KLFooterWrap.length != 0){
		KLFooterWrap.find('li').css('width',KLFooterWrap.width()/9-2);
	}
	//return;
	//账户资金信息设置
	getAccountInfo();
});