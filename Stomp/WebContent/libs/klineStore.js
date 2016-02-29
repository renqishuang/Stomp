window.GlobalKLData = {
		ks:[]
};
//还需要当前合约的名字
function loadHisKLineData(interval){
	GlobalKLData.ks.length = 0;
	var data = null;
	//console.log(interval+"----");
	//return;
	if(interval == "interval_1"){
		data = InitTestDataOne;
	}else if(interval == "interval_3"){
		data = InitTestDataThree;
	}else if(interval == "interval_5"){
		data = InitTestDataFive;
	}else if(interval == "interval_10"){
		data = InitTestDataTen;
	}else if(interval == "interval_15"){
		data = InitTestDataFifteen;
	}else if(interval == "interval_30"){
		data = InitTestDataThirty;
	}else if(interval == "interval_daily"){
		data = InitTestDataDaily;
	}
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