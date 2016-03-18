function afterInitSysInfo(){
	//获取盘口数据
	getTapeInfo();
	//获取交易数据
	getTradeInfoInstStat();
	//下单器界面设置
	var orderManagerFirstWrap = $('.KL_OrderManager_FirstWrap');
	if(orderManagerFirstWrap.length != 0){
		orderManagerLeftRegion(orderManagerFirstWrap);
	}
	var orderManagerSecondWrap = $('.KL_OrderManager_SecondWrap');
	if(orderManagerSecondWrap.length != 0 ){
		orderManagerRightRegion(orderManagerSecondWrap);
	}
	
	//持仓信息
	getTradeInfoMP();
	//委托挂单
	getTradeInfoPendingDepute();
	//当日委托
	getTradeInfoAllDepute();
	//当日成交
	getTradeInfoAllOrder();
	//条件单查询
	getTradeInfoConOrder();
	//账户资金信息设置
	setAccountInfo();
	
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
	/*$.ajax({
		url:'http://jyw.zlw.com/ajax/get_order?r=0.9790345039218664&oper=getPendingDepute__getMP&rid=1553&aid=3179&rmc=4928',
		type:'get',
		dataType:"html",
		timeout:5000, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			console.log('get html-----------');
			console.log(data);
			$('#room_deal_query').html(data);
		},
		error:function(xhr,state){
			console.log("get data error");
			//alert("请求服务器出错");
		},
		complete:function(xhr,state){
			//console.log('get data complete');
		}
	});*/
	
	 //分时段设置
	var KLTimeShareDiv = $('div.KL_TimeShareChart_Interval');
	var KLTimeShareList = KLTimeShareDiv.find("li");
	setKLIntervalEvent(KLTimeShareList);
	
	//获取合约集合信息, 调用合约历史数据前调用
	var method = 'sysInfo';//方法
	var data = {
		"value":1,
		"ints":['TF1606'],
		"rmc":34152,
		"userid":1212,
		"datatype":2,
		"lc":"dasdada",
		"uid":1212
	}
	var param = JSON.stringify(data);
	$.ajax({
		url:WebServiceTransferUrl+'/call_ws/output',
		type:'post',
		dataType:"json",
		//async:false,//同步请求
		data:{
			ws_url:WebServiceStrageUrl,
			ws_func:method,
			ws_param:param
		},
		timeout:AjaxTimeOut, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			if(state === 0){
				var res = data.res,dt = res.data,len = dt.length;
				for(var i=0;i<len;i++){
					var tempDt = dt[i];
					var digits = tempDt.digits;
					CurrentInstrumentDigits = digits;
				}
				//默认触发1分钟K线图
				$(KLTimeShareList[0]).trigger('mousedown');
				afterInitSysInfo();
			}
		},
		error:function(xhr,state){
			console.log("get data error");
			//alert("请求服务器出错");
		},
		complete:function(xhr,state){
			//console.log('get data complete');
		}
	});
});