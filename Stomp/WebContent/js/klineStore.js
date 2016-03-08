//定义全局变量存储K线数据
window.GlobalKLData = {
	ks:[]
};

//根据类型转换数据格式
function KLDataDecimalHandler(dt,type){
	if(!dt) return;
	console.log(dt);
	var time=dt.datetime;
	var date = new Date(time);
	var dateNumber = converDateStrByDate(date);
	var open,high,low,close,volume,amount=2939,preClose=2985.8;
	if(type == 0){//整数
		open  = parseInt(dt.open);
		high = parseInt(dt.high);
		low = parseInt(dt.low);
		close = parseInt(dt.close);
		volume = parseInt(dt.volume);
	}else if(type == 1){//小数点后一位
		open  = parseFloat(dt.open);
		high = parseFloat(dt.high);
		low = parseFloat(dt.low);
		close = parseFloat(dt.close);
		volume = parseFloat(dt.volume);
	}
	var item = {
		quoteTime:dateNumber,
		open:open,
		high:high,
		low:low,
		close:close,
		volume:volume,
		amount:amount,
		preClose:preClose,
		openchg:Number(dt.openchg),
		highchg:Number(dt.highchg),
		lowchg:Number(dt.lowchg),
		closechg:Number(dt.lowchg)
	};
	return item;
}
//收到订阅数据后调用     K线订阅处理器
function KLSubscribeHandler(dt){
		/* GlobalKLData.high = Math.max(GlobalKLData.high,parseFloat(dt.high));
		GlobalKLData.low = Math.min(GlobalKLData.low,parseFloat(dt.low)); */
		//console.log(dt);
		if(!CurrentKLObj) return;
		//对订阅数据的小数位数进行判断
		var item = KLDataDecimalHandler(dt,1);
		//var item = dt;
		//console.log(item);
		//console.log("open:"+item.open+",high:"+item.high+",low:"+item.low+",close"+item.close);
	var time=dt.datetime;
	/* ////////////////
	//GlobalKLData.ks[GlobalKLData.ks.length-1] = item;//临时修改最后一条数据
	if(!this.isInit) this.isInit = 'yes';
	if(this.isInit == 'yes') {
		CurrentKLObj.addCandleToKL(item); //添加最后更新的数据    
		drawKL();
	}
	//console.log("..................item");
	//console.log(item);
	this.lastUpdateItem = item;
	if(!this.count) this.count = 2;
	if(this.count == 2){
		CurrentKLObj.updateKLOnCandle(item,"first");
	}else{
		CurrentKLObj.updateKLOnCandle(item,"more");	
	}
	this.count +=1;
	if(this.count == 7){
		if(isInit == "yes"){
			drawKL();
		} 
		GlobalKLData.ks[GlobalKLData.ks.length-1] = lastUpdateItem;
		drawKL();
		CurrentKLObj.addCandleToKL(item); //添加最后更新的数据
		this.count = 2;
	}
	this.isInit = 'no'; 
	//////////////// */
		if(!CurrentDataTime){
			CurrentDataTime = time;
			CurrentKLObj.addCandleToKL(item);//收到订阅数据后, 先添加第一条数据
			//GlobalKLData.ks[GlobalKLData.ks.length-1] = item;//临时修改最后一条数据
			drawKL();//重新画图
			CurrentKLObj.updateKLOnCandle(item);
		}else{
			//return;
			if(CurrentDataTime == time){
				//修改一条数据
				//console.log("修改一条数据");
				this.lastUpdateDt = dt;
				//GlobalKLData.ks[GlobalKLData.ks.length-1] = item;//临时修改最后一条数据
				//CurrentKLObj.addCandleToKL(item);
				//drawKL();
				CurrentKLObj.updateKLOnCandle(item);
				
			}else{
				//添加一条数据
				var lastItem = KLDataDecimalHandler(this.lastUpdateDt,1);
				CurrentKLObj.updateGlobalKLLastDt(lastItem);//更新最后一条数据
				drawKL();
				//CurrentKLObj.addCandleToKL(lastItem); //添加最后更新的数据 
				CurrentKLObj.addCandleToKL(item);//添加新数据
				drawKL();
				CurrentDataTime = time;
			}
		}
}

//对原始数据进行处理
function originalDataHandle(data){
	for(var i=0;i<data.length;i++){
		var tempData=[];
		var dt = data[i];
		var time=dt.datetime;
		var date = new Date(time);
		var dateNumber =converDateStrByDate(date);
		var item = {
		    quoteTime: dateNumber,
		    preClose: 2977.0,
		    open: parseFloat(dt.open),
		    high: parseFloat(dt.high),
		    low: parseFloat(dt.low),
		    close: parseFloat(dt.close),
		    volume: parseFloat(dt.volume),
		    amount: 2939,
		    openchg:Number(dt.openchg),
			highchg:Number(dt.highchg),
			lowchg:Number(dt.lowchg),
			closechg:Number(dt.closechg)
		};
		GlobalKLData.ks.push(item);
	}
}
//ajax请求获取历史数据
function getHisKLines(interval){
	GlobalKLData.ks.length = 0;
	var method = 'getHisKlines';//方法
	var instrumentId = "IF1603";
	var data = {
		instrumentid:instrumentId,
		startdate:1454256000000,  //2016年1月1日的数据
		enddate:1456988775044,     
		interval:parseInt(interval)
	};
	var param = JSON.stringify(data);
	$.ajax({
		url:WSFullUrl+'/call_ws/output',
		type:'post',
		dataType:"json",
		//async:false,//同步请求
		data:{
			ws_url:HisKLineUrl,
			ws_func:method,
			ws_param:param
		},
		timeout:5000, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			console.log("jquery post data");
			console.log(data);
			if(state === 0){
				var obj = data.res.data;
				LoadHisKLData = true;
				originalDataHandle(obj);
				drawKL();//画图
				var destination = "/topic/IF1603_"+interval; 
				if(!MQStompClient) return;
				console.log("添加监听");
				MQStompSub = MQStompClient.subscribe(destination,function(message){
					var tempData = message.body;
					MQMessageMonitor = true;
					console.log("新pong");
					KLSubscribeHandler(JSON.parse(tempData));
				});
			}else{
				alert("请求服务器出错");	
			}
		},
		error:function(xhr,state){
			console.log("get data error");
			alert("请求服务器出错");
		},
		complete:function(xhr,state){
			console.log('get data complete');
		}
	});
}
//还需要当前合约的名字
function loadHisKLineData(interval){
	GlobalKLData.ks.length = 0;
	var data = null;
	var time = 0;
	//console.log(interval+"----");
	getHisKLines(interval);
	//return;
	/*if(interval == "60"){
		data = InitTestDataOne;
	}else if(interval == "180"){
		data = InitTestDataThree;
	}else if(interval == "300"){
		data = InitTestDataFive;
	}else if(interval == "600"){
		data = InitTestDataTen;
	}else if(interval == "900"){
		data = InitTestDataFifteen;
	}else if(interval == "1800"){
		data = InitTestDataThirty;
	}else if(interval == "86400"){
		data = InitTestDataDaily;
	}*/
//	
//	for(var i=0;i<data.length;i++){
//		var tempData=[];
//		var dt = data[i];
//		var time=dt.datetime;
//		var date = new Date(time);
//		var dateNumber =converDateStrByDate(date);
//		var item = {
//		    quoteTime: dateNumber,
//		    preClose: 2977.0,
//		    open: parseFloat(dt.open),
//		    high: parseFloat(dt.high),
//		    low: parseFloat(dt.low),
//		    close: parseFloat(dt.close),
//		    volume: parseFloat(dt.volume),
//		    amount: 2939,
//		    openchg:Number(dt.openchg),
//			highchg:Number(dt.highchg),
//			lowchg:Number(dt.lowchg),
//			closechg:Number(dt.closechg)
//		};
//		GlobalKLData.ks.push(item);
//	}
}