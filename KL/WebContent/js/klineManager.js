//计算屏幕显示的最多K线个数
function getMaxKLShowCount(){
	if(CurrentMaxKLShowCount != 0) return;
	var canvasObj = $('#canvasKL');
	var initialWidth = canvasObj[0].clientWidth;
	var width = initialWidth - 45;
	CurrentMaxKLShowCount = Math.ceil(width / (CurrentSpaceWidth + CurrentBarWidth))-1;
}

//根据类型转换数据格式
function KLDataDecimalHandler(dt){
	if(!dt) return;
	var time=dt.datetime;
	var date = new Date(time);
	var dateNumber =converDateStrByDate(date);
	var item = {
		//开盘时间
		openTime:time,
		//收盘时间
		closeTime:time+CurrentKLInterval*1000,
	    quoteTime: dateNumber,
	    open: parseFloat(dt.open),
	    high: parseFloat(dt.high),
	    low: parseFloat(dt.low),
	    close: parseFloat(dt.close),
	    volume: parseFloat(dt.volume),
	    amount: 2939,
	    openchg:Number(dt.openchg),
		highchg:Number(dt.highchg),
		lowchg:Number(dt.lowchg),
		closechg:Number(dt.closechg),
		pricechg:Number(dt.pricechg),
		pricechgrate:dt.pricechgrate,
		volume:Number(dt.volume),
		volumechg:Number(dt.volumechg),
		openinterest:Number(dt.openinterest),
		openinterestchg:Number(dt.openinterestchg)
	};
	return item;
}
//收到订阅数据后调用     K线订阅处理器
function KLSubscribeHandler(dt){
	if(!CurrentKLObj) return;
	//对订阅数据的小数位数进行判断
	var item = KLDataDecimalHandler(dt);		
	var time=dt.datetime;
	if(!CurrentDataTime){
		CurrentDataTime = time;
		CurrentKLObj.addCandleToKL(item);//收到订阅数据后, 先添加第一条数据
		//GlobalKLData.ks[GlobalKLData.ks.length-1] = item;//临时修改最后一条数据
		this.lastUpdateDt = item;
		drawKL();//重新画图
		CurrentKLObj.updateKLOnCandle(item);
	}else{
		//return;
		if(CurrentDataTime == time){
			//修改一条数据
			//console.log("修改一条数据");
			this.lastUpdateDt = item;
			//GlobalKLData.ks[GlobalKLData.ks.length-1] = item;//临时修改最后一条数据
			//CurrentKLObj.addCandleToKL(item);
			//drawKL();
			CurrentKLObj.updateKLOnCandle(item);
		}else{
			//添加一条数据
			var lastItem = KLDataDecimalHandler(this.lastUpdateDt);
			CurrentKLObj.updateGlobalKLLastDt(lastItem);//更新最后一条数据
			//drawKL();
			//CurrentKLObj.addCandleToKL(lastItem); //添加最后更新的数据 
			CurrentKLObj.addCandleToKL(item);//添加新数据
			drawKL();
			//调取交易历史数据
			getHisTradeInfo();
			CurrentDataTime = time;
		}
	}
}
//针对当天K线数据不足以填满整个屏幕时,对历史K线数据的处理
function originalDataHandleSplice(data){
	var len = data.length;//原始数据是倒序的, 在这里正序过来,并封装成自己想要的数据
	for(var i=0;i<len;i++){
		var tempData=[];
		var dt = data[i];
		var time=dt.datetime;
		var date = new Date(time);
		var dateNumber =converDateStrByDate(date);
		var item = {
			//开盘时间
			openTime:time,
			//收盘时间
			closeTime:time+CurrentKLInterval*1000,
		    quoteTime: dateNumber,
		    open: parseFloat(dt.open),
		    high: parseFloat(dt.high),
		    low: parseFloat(dt.low),
		    close: parseFloat(dt.close),
		    volume: parseFloat(dt.volume),
		    amount: 2939,
		    openchg:Number(dt.openchg),
			highchg:Number(dt.highchg),
			lowchg:Number(dt.lowchg),
			closechg:Number(dt.closechg),
			pricechg:Number(dt.pricechg),
			pricechgrate:dt.pricechgrate,
			volume:Number(dt.volume),
			volumechg:Number(dt.volumechg),
			openinterest:Number(dt.openinterest),
			openinterestchg:Number(dt.openinterestchg)
		};
		GlobalKLData.ks.splice(0,0,item);
	}
}

//对原始数据进行处理(针对当天K线数据或没有当天数据时历史K线数据)
function originalDataHandle(data){
	var len = data.length;//原始数据是倒序的, 在这里正序过来,并封装成自己想要的数据
	var endIndex = 0;
	if(len > CurrentMaxKLShowCount) len = CurrentMaxKLShowCount;
	for(var i=0;i<len;i++){
		var tempData=[];
		var dt = data[i];
		var time=dt.datetime;
		var date = new Date(time);
		var dateNumber =converDateStrByDate(date);
		var item = {
			//开盘时间
			openTime:time,
			//收盘时间
			closeTime:time+CurrentKLInterval*1000,
		    quoteTime: dateNumber,
		    open: parseFloat(dt.open),
		    high: parseFloat(dt.high),
		    low: parseFloat(dt.low),
		    close: parseFloat(dt.close),
		    volume: parseFloat(dt.volume),
		    amount: 2939,
		    openchg:Number(dt.openchg),
			highchg:Number(dt.highchg),
			lowchg:Number(dt.lowchg),
			closechg:Number(dt.closechg),
			pricechg:Number(dt.pricechg),
			pricechgrate:dt.pricechgrate,
			volume:Number(dt.volume),
			volumechg:Number(dt.volumechg),
			openinterest:Number(dt.openinterest),
			openinterestchg:Number(dt.openinterestchg)
		};
		GlobalKLData.ks.splice(0,0,item);
	}
}
//画K线
function drawKLHandler(interval){
	LoadKLineDataFinish = true;//标识数据加载完成
	if(GlobalKLData.ks.length == 0)return;
	drawKL();//画图
	//调取交易历史数据
	getHisTradeInfo();
	var destination = "/topic/"+CurrentInstrumentID+"_"+interval; 
	if(!KLWSClient) return;
	//console.log("添加监听");
	KLWSSubscribe = KLWSClient.subscribe(destination,function(message){
		if(!LoadKLineDataFinish)return;
		var tempData = message.body;
		KLSubscribeHandler(JSON.parse(tempData));//实时K线变化
	});
}

//获取当天K线数据
function getCurrentDateKLines(interval){
	CurrentKLInterval = interval;
	GlobalKLData.ks.length = 0;
	var method = 'getKlines';
	var data = {
		"rid":CurrentRoomID,
		"lc":CurrentLC,
		"startdate":getCurrentYMD,
		"enddate":getCurrentYMD,
		"rmc":CurrentRMC,
		"klname":CurrentInstrumentID+"_"+CurrentKLInterval,
		"uid":CurrentUserId,
		"interval":CurrentKLInterval,
		"aid":CurrentAccountID
	};
	var param = JSON.stringify(data);
	$.ajax({
		url:WebServiceTransferUrl+'/call_ws/output',
		type:'post',
		dataType:"json",
		data:{
			ws_url:WebServiceStrageUrl,
			ws_func:method,
			ws_param:param
		},
		timeout:AjaxTimeOut, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			console.log("get today K line data");
			//数据是倒序的
			console.log(data);
			if(state === 0){
				var obj = data.res.data;
				if(obj.length == 0){
					//如果当天没有数据,请求历史数据
					getHisKLines(interval,getCurrentTimes,CurrentMaxKLShowCount,'not');
				}else{
					originalDataHandle(obj);
					//判断是否加载历史数据
					if(obj.length < CurrentMaxKLShowCount){
						var amount = CurrentMaxKLShowCount - obj.length;
						getHisKLines(interval,obj[obj.length-1].datetime,amount,'yes');
					}else{
						drawKLHandler(interval);
					}
				}
			}else{
				//alert("请求服务器出错");	
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

//ajax请求获取历史数据
function getHisKLines(interval,time,amount,have){
	var method = 'getHisKlines';
	var data = {
		instrumentid:CurrentInstrumentID,
		startdate:time,
		amount:amount,
		type:2,
		action:1,
		interval:parseInt(interval)
	};
	var param = JSON.stringify(data);
	$.ajax({
		url:WebServiceTransferUrl+'/call_ws/output',
		type:'post',
		dataType:"json",
		data:{
			ws_url:WebServiceStrageUrl,
			ws_func:method,
			ws_param:param
		},
		timeout:AjaxTimeOut, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			console.log("get his K line data");
			//数据是倒序的
			console.log(data);
			if(state === 0){
				var obj = data.res.data;
				LoadKLineDataFinish = true;
				if(have == 'not'){
					originalDataHandle(obj);
				}else if(have == 'yes'){
					originalDataHandleSplice(obj);
				}
				drawKLHandler(interval);
			}else{
				//alert("请求服务器出错");	
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
//还需要当前合约的名字
function loadHisKLineData(interval){
	GlobalKLData.ks.length = 0;
	var data = null;
	var time = 0;
	getCurrentDateKLines(interval);
}

//设置其他分段按钮的样式
function setKLIntervalStyle(list){
	var i=0,length=list.length;
	for(;i<length;i++){
		var li = list[i];
		if($(li).attr('isMouseDown') == 'true'){
			$(li).attr('isMouseDown','false');
			$(li).css('backgroundColor','transparent');
			$(li).css('color','#8494A4');
		}
	}
}
//设置K线周期事件
function setKLIntervalEvent(KLTimeShareList){
	var i=0,length=KLTimeShareList.length;
	//设置分时段按钮的点击事件
	for(;i<length;i++){
		var li = KLTimeShareList[i];
		var value = $(li).val();
		$(li).attr('isMouseDown','false');
		$('li').mousedown(function(e){
			if($(this).attr('isMouseDown') == 'false'){
				CurrentDataTime = null;
				LoadKLineDataFinish = false;
				setKLIntervalStyle(KLTimeShareList);//设置其他分时样式
				$(this).attr('isMouseDown','true');
				$(this).css('backgroundColor','#8494A4');
				$(this).css('color','black');
				//取消原来的订阅 ,开始新的订阅
				if(KLWSSubscribe) KLWSSubscribe.unsubscribe();
				var val = $(this).val();
				loadHisKLineData(val);//加载数据  
				//drawKL();//画图
			}
		});
	}
}