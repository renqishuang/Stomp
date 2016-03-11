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
function setThreeViewerData(tapeData,presettlement,isInit){
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
	var history = data.history;
	history.length = 6;
	setThreeViewerData(history,data.presettlement,true);
}
window.TapeThreeViewerStore=[];//盘口数据缓存
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
			//标识昨结价
			window.CurrentPresettlement= res.presettlement;
			console.log("当前昨结价位:-----------------");
			console.log(CurrentPresettlement);
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
	setThreeViewerData(tempData,CurrentPresettlement,false);
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
	
	div.find('li[value=averageprice] span').html(data.averageprice);//10
	
	div.find('li[value=presettlement] span').html(data.presettlement);//11
	div.find('li[value=upperlimit] span').html(data.upperlimit);//12
	div.find('li[value=lowerlimit] span').html(data.lowerlimit);//13
	div.find('li[value=preclose] span').html(data.preclose);//14
}