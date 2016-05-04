function loadCashData(){
	var method = 'accountInfo';//方法
	var data = {
		"lc":CurrentLC,
		"uid":CurrentUserId,
		"aid":CurrentAccountID,
		"rmc":CurrentRMC,
		"rid":CurrentRoomID
	};
	var param = JSON.stringify(data);
	$.ajax({
		url:WebServiceTransferUrl+'/call_ws/output',
		type:'post',
		dataType:"json",
		//async:false,//同步请求
		data:{
			ws_url:WebServiceTradeUrl,
			ws_func:method,
			ws_param:param
		},
		timeout:AjaxTimeOut, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			console.log("get account info data");
			console.log(data);
			if(state === 0){
				//设置账户信息
				setInitAccountInfo(data.res);
				setTimeout(function(){
					//获取房间合约信息
					getRoomInstrumentInfo();
				},200);
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
}

$(function(){
	//加载头寸数据
	
	//监听头寸数据
	monitorCashData();
});