//获取房间合约集合信息
function roomInstrumentListInfo(iidArr){
	//获取合约集合信息, 调用合约历史数据前调用
	var method = 'sysInfo';//方法
	var data = {
		"value":1,
		"ints":iidArr,
		"rmc":CurrentRMC,
		"datatype":2,
		"lc":CurrentLC,
		"uid":CurrentUserId
	};
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
				console.log('sysInfo');
				var res = data.res,dt = res.data,len = dt.length;
				console.log(dt);
				for(var i=0;i<len;i++){
					var tempDt = dt[i];
					var digits = tempDt.digits;
					var tempObj = {
						digits: digits	
					};
					//存储合约对应的Digits
					CurrentInstrumentInfo[tempDt.instrumentid]=tempObj;
					CurrentInstrumentDigits = digits;
				}
				console.log(CurrentInstrumentInfo);
				var KLTimeShareDiv = $('div.KL_TimeShareChart_Interval');
				var KLTimeShareList = KLTimeShareDiv.find("li");
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
}

//房间合约设置
function roomInstrumentSet(dt){
	var len = dt.length;
	var wrap = $('.KL_OrderManager_SecondWrap');
	if(wrap.length == 0) return;
	var selectObj = wrap.find('select.Order_Instrument_Select');
	var iidArr = [];
	for(var i=0;i<len;i++){
		var iid = dt[i].iid;
		var htmlFrag='';
		if(iid == 'IF1603') continue;
		iidArr.push(iid);
		if(i == 2){
			CurrentInstrumentID = iid;
			htmlFrag = "<option selected='true' value='"+iid+"'>"+iid+"</option>";
			//下单器设置
			var price = dt[i].price;
			wrap.find('div.KL_OM_Price_Number input[type=text]').val(price);
			var step = dt[i].step;
			var volmul = dt[i].volmul;//合约乘数
			var deprate = dt[i].deprate;//保证金率
			var volumeWrap = wrap.find('div.KL_OM_Volume_Number');
			var maxVol = 0;
			//最大手数=可用/(价格*合约乘数*保证金率)
			if(price*volmul*deprate != 0){
				maxVol = AvalibleAmount / (price*volmul*deprate);
				volumeWrap.prev().html(parseInt(maxVol));
			}else{
				volumeWrap.prev().html(maxVol);
			}
			//手数
			if(maxVol > 0){
				volumeWrap.find('input[type=text]').val(1);
			}else{
				volumeWrap.find('input[type=text]').val(0);
			}
		}else{
			htmlFrag = "<option value='"+iid+"'>"+iid+"</option>";
		}
		selectObj.append($(htmlFrag));
	}
	if(iidArr.length != 0){
		//房-间合约集合信息
		roomInstrumentListInfo(iidArr);
	}
}

//获取房间合约信息
function getRoomInstrumentInfo(){
	var method = 'room';//方法
	var data = {
		"aid":CurrentAccountID,
		"rmc":CurrentRMC,
		"uid":CurrentUserId,
		"lc":CurrentLC,
		"oper":"search",
		"rid":CurrentRoomID,
		"pflag":0
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
			if(state === 0){
				console.log('room instrument');
				console.log(data);
				var res = data.res,dt = res.inst,len = dt.length;
				if(!dt) return;
				//房间合约设置
				roomInstrumentSet(dt);
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