function getChgReasonValue(chgreson){
	switch (chgreson) {
		case 0:
			return '多开';
			break;
		case 1:
			return '空开';
			break;
		case 2:
			return '多平';
			break;
		case 3:
			return '空平';
			break;
		case 4:
			return '多换';
			break;
		case 5:
			return '空换';
			break;
		default:
			break;
	}
}

//设置盘口界面第2个区域
function setTwoViewerData(data){
	var twoViewerDiv = $('.Tape_Sub_Viewer_Two');
	if(twoViewerDiv.length == 0) return;
	var twoViewList = twoViewerDiv.find('li'),twoViewerLength = twoViewList.length;
	var presettlement = data.presettlement;//昨结价
	for(var i=0;i<twoViewerLength;i++){
		var li = $(twoViewList[i]);
		var value = li.attr('value');
		switch (value) {
		case 'lastprice':
			if(data.lastprice < presettlement){
				li.find('span').css('color','#06E65A');
			}else{
				li.find('span').css('color','#E60302');
			}
			li.find('span').html(data.lastprice);
			break;
		case 'presettlement':
			li.find('span').html(data.presettlement);
			break;
		case 'daychange':
			if(data.daychange < 0){
				li.find('span').css('color','#06E65A');
			}else{
				li.find('span').css('color','#E60302');
			}
			li.find('span').html(data.daychange);
			break;
		case 'daychangerate':
			if(data.daychangerate.indexOf('-') >= 0){
				li.find('span').css('color','#06E65A');
			}else{
				li.find('span').css('color','#E60302');
			}
			li.find('span').html(data.daychangerate);
			break;
		case 'volume':
			li.find('span').html(data.volume);
			break;
		case 'dayopen':
			if(data.dayopen < presettlement){
				li.find('span').css('color','#06E65A');
			}else{
				li.find('span').css('color','#E60302');
			}
			li.find('span').html(data.dayopen);
			break;
		case 'openinterest':
			li.find('span').html(data.openinterest);
			break;
		case 'highest':
			if(data.highest < presettlement){
				li.find('span').css('color','#06E65A');
			}else{
				li.find('span').css('color','#E60302');
			}
			li.find('span').html(data.highest);
			break;
		case 'openinterestchg':
			li.find('span').html(data.openinterestchg);
			break;
		case 'lowest':
			if(data.lowest < presettlement){
				li.find('span').css('color','#06E65A');
			}else{
				li.find('span').css('color','#E60302');
			}
			li.find('span').html(data.lowest);
			break;
		case 'upperlimit':
			li.find('span').html(data.upperlimit);
			break;
		case 'averageprice':
			if(data.averageprice < presettlement){
				li.find('span').css('color','#06E65A');
			}else{
				li.find('span').css('color','#E60302');
			}
			li.find('span').html(data.averageprice);
			break;
		case 'lowerlimit':
			li.find('span').html(data.lowerlimit);
			break;
		case 'preclose':
			li.find('span').html(data.preclose);
			break;
		default:
			break;
		}
	}
}
//设置盘口界面第3个区域
function setThreeViewerData(tapeData){
	TapeThreeViewerStore.length = 0;
	var threeViewerDiv = $('.Tape_Sub_Viewer_Three');
	if(threeViewerDiv.length == 0)return;
	var list = threeViewerDiv.find('li');
	console.log("--------------0-0-0---------------");
	console.log($(list[0]).find('div').eq(1));
	var history = tapeData.history,length=tapeData.history.length;
	var tempPrice;
	var tempColor;
	for(var i=length-1;i>=0;i--){
		if(i >= 6) continue;
		var data = history[i];
		var time = data.updatetime;
		var price = data.lastprice;
		var tickvolume = data.tickvolume;
		var tickopeninterestchg = data.tickopeninterestchg;
		var chgreason = getChgReasonValue(data.chgreason);
		TapeThreeViewerStore.push(data);
		
		var color;// = '#E60302';
		if(i == 5){
			tempPrice = price;
			if(price < tapeData.presettlement) {
				color='#06E65A';
			}else if(price > tapeData.presettlement){
				color='#E60302';
			}else if(price == tapeData.presettlement){
				color='#E60302';
			}
			tempColor = color;
		}else{
			if(price < tempPrice) {
				color='#06E65A';
			}else if(price > tempPrice){
				color='#E60302';
			}else if(price == tempPrice){
				color = tempColor;
			}
			tempPrice = price;
			tempColor = color;
		}
		
		$(list[0]).find('div').eq(i+1).html(time);
		$(list[1]).find('div').eq(i+1).html(price);
		$(list[2]).find('div').eq(i+1).html(tickvolume);
		$(list[3]).find('div').eq(i+1).html(tickopeninterestchg);
		$(list[4]).find('div').eq(i+1).html(chgreason);
		
		$(list[1]).find('div').eq(i+1).css('color',color);
		$(list[3]).find('div').eq(i+1).css('color',color);
		$(list[4]).find('div').eq(i+1).css('color',color);
	}
}

//设置盘口界面第一个区域
function setOneViewerData(data){
	var sellDiv = $('.Sell_Tape_Sub_Viewer_One');
	var buyDiv = $('.Buy_Tape_Sub_Viewer_One');
	if(sellDiv.length == 0 || buyDiv.length == 0) return;
	
	sellDiv.find('span').eq(0).html(data.ask1);
	sellDiv.find('span').eq(1).html(data.ask1volume);
	buyDiv.find('span').eq(0).html(data.bid1);
	buyDiv.find('span').eq(1).html(data.bid1volume);
}

//设置盘口界面数据
function setTapePage(data){
	setOneViewerData(data);
	setTwoViewerData(data);
	setThreeViewerData(data);
}
window.TapeThreeViewerStore=[];
function getTapeData() {
	//获取盘口数据
	var method = 'getTape';
	var param = 'IF1603_TAPE';
	$.ajax({
		url : WSFullUrl+'/call_ws/output',
		type : 'post',
		dataType : "json",
		// async:false,//同步请求
		data : {
			ws_url : WSServerUrl,
			ws_func : method,
			ws_param : param
		},
		timeout : 5000, // 设置超时5秒钟
		success : function(data) {
			var state = data.rc;
			console.log("get Tage data");
			console.log(data.res);
			var res = data.res;
			if(state === 0){
				LoadTapeFinish = true;//标识历史数据加载完成
				setTapePage(res);
			}
		},
		error : function(xhr, state) {
			console.log("get data error");
			alert("请求服务器出错");
		},
		complete : function(xhr, state) {
			//console.log('get data complete');
		}
	});
}
//监听MQ, 设置盘口界面数据
function TapeViewerHandler(data){
	var div = $('.Tape_Sub_Viewer_Two');
	if(div.length == 0) return;
	var redColor = '#E60302';
	var greenColor = '#06E65A';
	if(data.closechg > 0){
		div.find('li[value=lastprice] span').css('color',redColor);
	}else{
		div.find('li[value=lastprice] span').css('color',greenColor);
	}
	div.find('li[value=lastprice] span').html(data.close);//1
	if(data.pricechg > 0){
		div.find('li[value=daychange] span').css('color',redColor);
	}else{
		div.find('li[value=daychange] span').css('color',greenColor);
	}
	div.find('li[value=daychange] span').html(data.pricechg);//2
	if(data.pricechgrate.indexOf('-') >= 0){
		div.find('li[value=daychangerate] span').css('color',greenColor);
	}else{
		div.find('li[value=daychangerate] span').css('color',redColor);
	}
	div.find('li[value=daychangerate] span').html(data.pricechgrate);//3
	div.find('li[value=volume] span').html(data.volume);//4
	div.find('li[value=openinterest] span').html(data.openinterest);//5
	div.find('li[value=openinterestchg] span').html(data.openinterestchg);//6
	
	if(data.openchg < 0){
		div.find('li[value=dayopen] span').css('color',greenColor);
	}else{
		div.find('li[value=dayopen] span').css('color',redColor);
	}
	div.find('li[value=dayopen] span').html(data.open);//7
	if(data.highchg < 0){
		div.find('li[value=highest] span').css('color',greenColor);
	}else{
		div.find('li[value=highest] span').css('color',redColor);
	}
	div.find('li[value=highest] span').html(data.high);//8
	if(data.lowchg < 0 ){
		div.find('li[value=lowest] span').css('color',greenColor);
	}else{
		div.find('li[value=lowest] span').css('color',redColor);
	}
	div.find('li[value=lowest] span').html(data.low);//9
}