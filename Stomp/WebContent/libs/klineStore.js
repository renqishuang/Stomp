//定义全局变量存储K线数据
window.GlobalKLData = {
		ks:[]
};

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
	var url = "http://192.168.1.231:8080/axis2/services/StrategyEngine?wsdl"; 
	var method = 'getHisKlines';//方法
	var instrumentId = "IF1603";
	var data = {
		instrumentid:instrumentId,
		startdate:1454256000000,  //2016年1月1日的数据
		enddate:1456988775044,     
		interval:parseInt(interval)
	};
	var param = JSON.stringify(data);
	var wsUrl = 'http://jyw.zlw.com';
	//var wsUrl='http://192.168.1.189';
	$.ajax({
		url:wsUrl+'/call_ws/output',
		type:'post',
		dataType:"json",
		data:{
			ws_url:url,
			ws_func:method,
			ws_param:param
		},
		timeout:3000, //设置延迟3秒钟
		success:function(data){
			var state = data.rc;
			console.log(data);
			if(state === 0){
				var obj = data.res.data;
				originalDataHandle(obj);
				drawKL();//画图
			}else{
				alert("请求服务器出错");	
			}
		},
		error:function(xhr,state){
			
		},
		complete:function(xhr,state){
			
		}
	});
	/*$.post(
		wsUrl+'/call_ws/output',
		{
			ws_url:url,
			ws_func:method,
			ws_param:param
		},
		function(data){
			var state = data.rc;
			console.log(data);
			if(state === 0){
				var obj = data.res.data;
				originalDataHandle(obj);
				drawKL();//画图
			}else{
				alert("请求服务器出错");	
			}
		},
	'json');*/
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