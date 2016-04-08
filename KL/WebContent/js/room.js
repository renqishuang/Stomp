//获取房间合约集合信息
function roomInstrumentListInfo(iidArr){
	if(iidArr.length == 0){//无合约
		//获取委托单,持仓数据
		$('.KL_OrderManager_FirstWrap').find('div:first-child span').eq(0).trigger('click');
		//获取行情-合约
		getMarketInstruInfo();
		//获取交易数据
		getTradeInfoInstStat();
		//监听MQ
		addMQTopicSubscribe();
		
		//红色边框闪烁
		var firstLi = $('.KL_Instrument_Wrap').find('li:nth-child(1)');
		var animationFrag = '<div class="addInstrumentAnimate"></div>';
		firstLi.append($(animationFrag));
		//添加  '请加入合约' 文字提示
		var addInstruFrag = '<div class="addInstrumentPrompt">请加入合约</div>';
		var mainViewWrap =$('.KL_MainView_Wrap'); 
		mainViewWrap.append($(addInstruFrag));
		var promptObj = $('.addInstrumentPrompt');
		promptObj.css('left',mainViewWrap.width()/2-promptObj.width()/2);
		return;
	}
	
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
			console.log('room instrument list info');
			console.log(data);
			if(state === 0){
				var res = data.res,dt = res.data,len = dt.length;
				console.log(dt);
				for(var i=0;i<len;i++){
					var tempDt = dt[i];
					var digits = tempDt.digits;
					var iid = tempDt.instrumentid;
					RoomInstrumentListInfo[iid].digits=digits;
					if(i == 0){
						CurrentInstrumentDigits = digits;
					}
				}
				var KLTimeShareDiv = $('div.KL_TimeShareChart_Interval');
				var KLTimeShareList = KLTimeShareDiv.find("li");
				//默认触发1分钟K线图
				KLTimeShareList.eq(0).trigger('mousedown');
				setTimeout(function(){
					afterInitSysInfo();
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

//房间合约设置
function roomInstrumentSet(dt){
	var len = dt.length;
	var wrap = $('.KL_OrderManager_SecondWrap');
	if(wrap.length == 0) return;
	var selectObj = wrap.find('select.Order_Instrument_Select');
	var iidArr = [];
	for(var i=0;i<len;i++){
		var iid = dt[i].iid;
		var iname = dt[i].iname;
		var htmlFrag='';
		/*if(iid == 'IF1603') continue;*/
		iidArr.push(iid);
		var price = dt[i].price,
			step = dt[i].step,
			volmul = dt[i].volmul,//合约乘数
			deprate = dt[i].deprate;//保证金率
			step = dt[i].step;
		var tempObj = {
			iid:iid,
			volmul:volmul,
			deprate:deprate,
			price:price,
			step:step
		};
		RoomInstrumentListInfo[iid]=tempObj;
		if(i == 0){
			CurrentInstrumentID = iid;
			htmlFrag = "<option selected='true' value='"+iid+"'>"+iid+"</option>";
			//下单器设置
			
			wrap.find('div.KL_OM_Price_Number input[type=text]').val(price);
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
		//在添加合约界面显示所有合约
		var addInstruWrap = $('.KL_Instrument_Wrap');
		var addInstruBg = 'url(images/dingbumorenjiaoyi.png)';
		var isSelect = false;
		var pricecolor = '#06E65A';
		var li = addInstruWrap.find('li').eq(i);
		if(i == 0) {
			addInstruBg = 'url(images/dingbuxuanzhongjiaoyi.png)';
			isSelect = true;
			pricecolor='#E60302';
			var textWrap = li.find('span[name=instru_text_bg]');
			textWrap.css('background-image','url(images/heyueItemtxt_bg.png)');
			textWrap.css('color','white');
		}
		var inameSpan = li.find('span[name=instru_name]');
		inameSpan.html(iname);
		var iidSpan = li.find('span[name=instru_id]');
		iidSpan.html(iid);
		li.css('background-image',addInstruBg);
		li.attr('hasInstru',true);
		li.attr('isSelect',isSelect);
		li.attr('value',iid);
		var priceSpan = li.find('span[name=instru_price]');
		priceSpan.html(price);
		priceSpan.css('color',pricecolor);
	}
	//房-间合约集合信息
	roomInstrumentListInfo(iidArr);
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
			console.log('room instrument list');
			console.log(data);
			if(state === 0){
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