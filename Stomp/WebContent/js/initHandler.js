$(document).ready(function() {
	window.MQStompClient = null;
	window.MQStompSub = null;
	window.MQMessageMonitor = false;
	window.LoadHisKLData = false;
	window.CurrentDataTime = null;
	window.LoadHisLineFinish = false;
	window.LoadTapeFinish = false;
	if(window.WebSocket) {
	    var destination;
	    //订阅数据WS接口地址
	    MQStompClient = Stomp.client(MQWSFullUrl);
		MQStompClient.connect("","", function(frame) {
			//默认触发1分钟K线图
			$(KLTimeShareList[0]).trigger('mousedown');
			
			if(!MQStompClient) return;
			console.log("添加 资金数据监听--------->");
			var MQAccountSub = MQStompClient.subscribe('/topic/2380',function(message){
				console.log("资金数据");
			});
	    });
	 }else {
	    return;
	 }
	
	//分时段设置
	var KLTimeShareDiv = $('div.KL_TimeShareChart_Interval');
	var KLTimeShareList = KLTimeShareDiv.find("li");
	setKLIntervalEvent(KLTimeShareList);
	
	//获取盘口数据
	getTapeData();
	
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
	
	//账户信息设置
	setAccountInfo();
});