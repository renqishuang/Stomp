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

//设置盘口界面第3个区域
function setTapeThreeViewerData(tapeData,presettlement,isInit){
	//TapeThreeViewerStore.length = 0;
	var threeViewerDiv = $('.Tape_Sub_Viewer_Three');
	if(threeViewerDiv.length == 0)return;
	var list = threeViewerDiv.find('li');
	//console.log("--------------0-0-0---------------");
	//console.log($(list[0]).find('div').eq(1));
	var length=tapeData.length;
	var tempPrice;
	var tempColor;
	
	if(isInit){
		for(var i=length-1;i>=0;i--){
			if(i >= 6) continue;
			var data = tapeData[i];
			var time = data.updatetime;
			var price = data.lastprice;
			var tickvolume = data.tickvolume;
			var tickopeninterestchg = data.tickopeninterestchg;
			var chgreason = getChgReasonValue(data.chgreason);
			var color;// = '#E60302';
			TapeThreeViewerStore.push(data);
			if(i == 5){
				if(price < presettlement) {
					color='#06E65A';
				}else if(price > presettlement){
					color='#E60302';
				}else if(price == presettlement){
					color='#E60302';
				}
				tempPrice = price;
				tempColor = color;
			}else{
				if(i == 4){
					//标识最后一条数据的颜色和价格
					window.TapeLastColor=color;
					window.TapeLastPrice = price;
				}
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
	}else{
		for(var i=length-1;i>=0;i--){
			if(i >= 6) continue;
			var data = tapeData[i];
			var time = data.updatetime;
			var price = data.lastprice;
			var tickvolume = data.tickvolume;
			var tickopeninterestchg = data.tickopeninterestchg;
			var chgreason = getChgReasonValue(data.chgreason);
			var color;// = '#E60302';
			if(i == 5){
				if(price < TapeLastPrice) {
					color='#06E65A';
				}else if(price > TapeLastPrice){
					color='#E60302';
				}else if(price == TapeLastPrice){
					color=TapeLastColor;
				}
				tempPrice = price;
				tempColor = color;
				//标识最后一条数据的颜色和价格
				window.TapeLastColor=color;
				window.TapeLastPrice = price;
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
}


function setTradeInfo(data){
	if(typeof data.longtimes == 'undefined') return;
	var tradWrap = $('.Tape_Sub_Viewer_Trade');
	if(tradWrap.length == 0 ) return;
	var list = tradWrap.find('li'),len = list.length;
	for(var i=0;i<len;i++){
		var li = list[i];
		var val = $(li).attr('value');
		switch (val) {
		case 'longtimes':
			$(li).find('span:nth-last-child(2)').html(data.longtimes);
			break;
		case 'shorttimes':
			$(li).find('span:nth-last-child(2)').html(data.shorttimes);		
			break;
		case 'wintimes':
			$(li).find('span:nth-last-child(2)').html(data.wintimes);
			break;
		case 'losstimes':
			$(li).find('span:nth-last-child(2)').html(data.losstimes);
			break;
		case 'winrate':
			$(li).find('span:nth-last-child(2)').html(data.winrate);
			break;
		default:
			break;
		}
	}
	var profitWrap = $('.Tape_Sub_Viewer_Trade_Profit');
	if(profitWrap.length == 0) return;
	var profitList = profitWrap.find('li'),profitLen = profitList.length;
	for(var j=0;j<profitLen;j++){
		var li = profitList[j];
		var value = $(li).attr('value');
		if(value == 'offsetprofit'){
			if(data.offsetprofit >= 0){
				$(li).find('span:nth-last-child(2)').css('color','red');
			}else{
				$(li).find('span:nth-last-child(2)').css('color','green');
			}
			$(li).find('span:nth-last-child(2)').html(data.offsetprofit);
		}else if(value == 'floatprofit'){
			if(data.floatprofit >= 0){
				$(li).find('span:nth-last-child(2)').css('color','red');
			}else{
				$(li).find('span:nth-last-child(2)').css('color','green');
			}
			$(li).find('span:nth-last-child(2)').html(data.floatprofit);
		}
	}
};

//设置盘口界面数据
function setTapeInfo(data){
	TapeOneViewerHandler(data);
	TapeTwoViewerHandler(data);
	var history = data.history;
	if(history.length == 0) return;
	history.length = 6;
	setTapeThreeViewerData(history,data.presettlement,true);
}

function getTradeInfoInstStat(){
	//获取交易数据
	var method = 'tradeInfo';
	var param = {
		"rmc":CurrentRMC,
		"rid":CurrentRoomID,
		"uid":CurrentUserId,
		"aid":CurrentAccountID,
		"oper":"getInstStat",
		"iid":CurrentInstrumentID,
		"lc":CurrentLC
	};
	var param = JSON.stringify(param);
	$.ajax({
		url : WebServiceTransferUrl+'/call_ws/output',
		type : 'post',
		dataType : "json",
		// async:false,//同步请求
		data : {
			ws_url : WebServiceTradeUrl,
			ws_func : method,
			ws_param : param
		},
		timeout : AjaxTimeOut, // 设置超时5秒钟
		success : function(data) {
			var state = data.rc;
			console.log("get trade data");
			console.log(data);
			if(state === 0){
				setTradeInfo(data.res);
			}
		},
		error : function(xhr, state) {
			console.log("get data error");
			//alert("请求服务器出错");
		},
		complete : function(xhr, state) {
			//console.log('get data complete');
		}
	});
	//设置交易信息
	//setTradeInfo(data);
}

window.TapeThreeViewerStore=[];//盘口数据缓存
function getTapeInfo() {
	//获取盘口数据
	var method = 'getTape';
	var param = CurrentInstrumentID+'_TAPE';
	$.ajax({
		url : WebServiceTransferUrl+'/call_ws/output',
		type : 'post',
		dataType : "json",
		// async:false,//同步请求
		data : {
			ws_url : WebServiceStrageUrl,
			ws_func : method,
			ws_param : param
		},
		timeout : AjaxTimeOut, // 设置超时5秒钟
		success : function(data) {
			var state = data.rc;
			if(state === 0){
				//console.log("get Tage data");
				//console.log(data.res);
				var res = data.res;
				//标识昨结价
				window.CurrentPresettlement= res.presettlement;
				//console.log("当前昨结价位:-----------------");
				//console.log(CurrentPresettlement);
				//LoadTapeFinish = true;//标识历史数据加载完成
				setTapeInfo(res);
				//监听盘口数据
				var MQTapeSub = KLWSClient.subscribe('/topic/'+CurrentInstrumentID+'_TAPE',function(message){
					//console.log("盘口数据");
					var tempData = message.body;
					//return;
					//console.log(JSON.parse(tempData));
					TapeOneViewerHandler(JSON.parse(tempData));
					TapeTwoViewerHandler(JSON.parse(tempData));
					TapeThreeViewerHandler(JSON.parse(tempData));
				});
			}
		},
		error : function(xhr, state) {
			console.log("get data error");
			//alert("请求服务器出错");
		},
		complete : function(xhr, state) {
			//console.log('get data complete');
		}
	});
}

//监听MQ, 设置盘口第三部分界面数据
function TapeOneViewerHandler(data){
	var div = $('.Tape_Sub_Viewer_One');
	if(div.length == 0) return;
	div.find('.Sell_Tape_Sub_Viewer_One span').eq(0).html(data.ask1);
	div.find('.Sell_Tape_Sub_Viewer_One span').eq(1).html(data.ask1volume);
	
	div.find('.Buy_Tape_Sub_Viewer_One span').eq(0).html(data.bid1);
	div.find('.Buy_Tape_Sub_Viewer_One span').eq(1).html(data.bid1volume);
}

//监听MQ, 设置盘口第三部分界面数据
function TapeThreeViewerHandler(data){
	//console.log(data.lastprice);
	var len = TapeThreeViewerStore.length;
	TapeThreeViewerStore.splice(0,0,data);//将新来的数据插入到第一个位置
	var tempData = [];
	var tempLen = TapeThreeViewerStore.length; 
	for(var i=0;i<tempLen;i++){
		if(i === tempLen-1) continue;
		tempData.push(TapeThreeViewerStore[i]);
	}
	TapeThreeViewerStore.length = 0 ;
	TapeThreeViewerStore = tempData;
	setTapeThreeViewerData(tempData,CurrentPresettlement,false);
}

//监听MQ, 设置盘口第二部分界面数据
function TapeTwoViewerHandler(data){
	var div = $('.Tape_Sub_Viewer_Two');
	if(div.length == 0) return;
	var redColor = '#E60302';
	var greenColor = '#06E65A';
	if(data.lastprice > CurrentPresettlement){
		div.find('li[value=lastprice] span').css('color',redColor);
	}else{
		div.find('li[value=lastprice] span').css('color',greenColor);
	}
	div.find('li[value=lastprice] span').html(data.lastprice);//1
	if(data.daychange > 0){
		div.find('li[value=daychange] span').css('color',redColor);
	}else{
		div.find('li[value=daychange] span').css('color',greenColor);
	}
	div.find('li[value=daychange] span').html(data.daychange);//2
	if(data.daychangerate.indexOf('-') >= 0){
		div.find('li[value=daychangerate] span').css('color',greenColor);
	}else{
		div.find('li[value=daychangerate] span').css('color',redColor);
	}
	div.find('li[value=daychangerate] span').html(data.daychangerate);//3
	div.find('li[value=volume] span').html(data.volume);//4
	div.find('li[value=openinterest] span').html(data.openinterest);//5
	div.find('li[value=openinterestchg] span').html(data.openinterestchg);//6
	
	if(data.dayopen < CurrentPresettlement){
		div.find('li[value=dayopen] span').css('color',greenColor);
	}else{
		div.find('li[value=dayopen] span').css('color',redColor);
	}
	div.find('li[value=dayopen] span').html(data.dayopen);//7
	if(data.highest < CurrentPresettlement){
		div.find('li[value=highest] span').css('color',greenColor);
	}else{
		div.find('li[value=highest] span').css('color',redColor);
	}
	div.find('li[value=highest] span').html(data.highest);//8
	if(data.lowest < CurrentPresettlement ){
		div.find('li[value=lowest] span').css('color',greenColor);
	}else{
		div.find('li[value=lowest] span').css('color',redColor);
	}
	div.find('li[value=lowest] span').html(data.lowest);//9
	
	if(data.averageprice < CurrentPresettlement){
		div.find('li[value=averageprice] span').css('color',greenColor);
	}else{
		div.find('li[value=averageprice] span').css('color',redColor);
	}
	div.find('li[value=averageprice] span').html(data.averageprice);//10
	
	div.find('li[value=presettlement] span').html(data.presettlement);//11
	div.find('li[value=upperlimit] span').html(data.upperlimit);//12
	div.find('li[value=lowerlimit] span').html(data.lowerlimit);//13
	div.find('li[value=preclose] span').html(data.preclose);//14
}