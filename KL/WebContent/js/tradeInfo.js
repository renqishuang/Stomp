function mainViewSplitMouseOver(div){
	$(div).css('background-image','url('+CurrentImagePath+'/hideTradeInfoBtn.png)');
}
function mainViewSplitMouseOut(div){
	$(div).css('background-image','url('+CurrentImagePath+'/hideTradeInfoBtn1.png)');
}
//右侧分割线点击
function mainViewRightSplitClick(div){
	var tapeRegion = $('.KL_TapeViewer_Wrap'),
		tapeWidth = tapeRegion.width(),
		mainView = $('.KL_MainView_Wrap');
		splitBtn = $(div).find('.KL_Hidden_Region_Btn'),
		isClick = $(div).attr('isClick'),
		centerRegion = $('.KL_MainView_Region_Center'),
		canvasRegion = $('.KL_Canvas'),
		canvasHeight = canvasRegion.height(),
		orderTableRegion = $('.KL_OrderManager_FirstWrap'),
		orderManRegion = $('.KL_OrderManager_SecondWrap'),
		orderManWidth = orderManRegion.width(),
		orderRegion = $('.KL_OrderManger_Wrap'),
		addInstrumentPrompt = $('.addInstrumentPrompt');
		
	var yAxisCanvas = $('.KL_Canvas_Y_Axis_Region');	
	//最新价格提示框
	var lastPriceRight = $('.KL_Y_Axis_Last_Price_Tip_Right');
	//挂单提示黄色虚线
	var orderDashWraps = $('div[class^=order-dashed-wrap-]'),
		orderDashLen = orderDashWraps.length;
	if(isClick == 'false'){
		splitBtn.css('transform','rotate(180deg)');
		$(div).attr('isClick',true);
		tapeRegion.hide();
		mainView.css('width',mainView.width()+tapeWidth);
		centerRegion.css('width',centerRegion.width()+tapeWidth);
		orderTableRegion.css('width',centerRegion.width()-orderManWidth-5);
		var canvasWidth = canvasRegion.width()+tapeWidth;
		canvasRegion[0].width = canvasWidth;
		canvasRegion[0].height = 284;
		orderDashWraps.css('width',canvasWidth);
		
		if(!addInstrumentPrompt.is(':hidden')){
			addInstrumentPrompt.css('left',mainView.width()/2-addInstrumentPrompt.width()/2);
		}
		
		var yAxisCanvasCoord =getPageCoord(yAxisCanvas[0]);
		if(!lastPriceRight.is(':hidden')){
			lastPriceRight.css('left',yAxisCanvasCoord.x+canvasWidth+yAxisCanvas.width()+5);
		}
		//重画K线
		drawKL();
	}else{
		splitBtn.css('transform','rotate(0deg)');
		$(div).attr('isClick',false);
		tapeRegion.show();
		mainView.css('width',mainView.width()-tapeWidth);
		centerRegion.css('width',centerRegion.width()-tapeWidth);
		orderTableRegion.css('width',centerRegion.width()-orderManWidth-5);
		var canvasWidth = canvasRegion.width()-tapeWidth;
		canvasRegion[0].width = canvasWidth;
		canvasRegion[0].height = 284;
		orderDashWraps.css('width',canvasWidth);
		
		if(!addInstrumentPrompt.is(':hidden')){
			addInstrumentPrompt.css('left',mainView.width()/2-addInstrumentPrompt.width()/2);
		}
		
		var yAxisCanvasCoord =getPageCoord(yAxisCanvas[0]);
		if(!lastPriceRight.is(':hidden')){
			lastPriceRight.css('left',yAxisCanvasCoord.x+canvasWidth+yAxisCanvas.width()+5);
		}
		//重画K线
		drawKL();
	}
}

//左侧分割线点击
function mainViewLeftSplitClick(div){
	var splitWidth = $(div).width(),
		tradeWidth = 205,
		tradeRegion = $(div).prev(),
		mainView = $('.KL_MainView_Wrap'),
		leftRegion = $(div).parents('.KL_MainView_Region_Left'),
		splitBtn = $(div).find('.KL_Hidden_Region_Btn'),
		isClick = $(div).attr('isClick'),
		centerRegion = $('.KL_MainView_Region_Center'),
		canvasRegion = $('.KL_Canvas'),
		orderTableRegion = $('.KL_OrderManager_FirstWrap'),
		orderManRegion = $('.KL_OrderManager_SecondWrap'),
		addInstrumentPrompt = $('.addInstrumentPrompt');
	//Y轴区域
	var yAxisRegion = $('.KL_Canvas_Y_Axis_Region'),
		yAxisWidth = yAxisRegion.width();
	//挂单提示黄色虚线
	var orderDashWraps = $('div[class^=order-dashed-wrap-]'),
		orderDashLen = orderDashWraps.length;
	//最新价格提示框
	var lastPriceLeft = $('.KL_Y_Axis_Last_Price_Tip_Left');
	var lastPriceRight = $('.KL_Y_Axis_Last_Price_Tip_Right');
	//交易点
	var tradePoints = $('div[class^=trade-pointer-wrap]'),
		tradePointLen = tradePoints.length; 
	
	if(isClick == 'false'){
		leftRegion.css('width',tradeWidth);
		tradeRegion.css('width',tradeWidth-splitWidth);
		splitBtn.css('transform','rotate(180deg)');
		$(div).attr('isClick',true);
		centerRegion.css('width',centerRegion.width()-tradeWidth+splitWidth);
		var canvasWidth = canvasRegion.width()-tradeWidth+splitWidth;
		canvasRegion[0].width = canvasWidth;
		canvasRegion[0].height=284;
		CanvasPagePosition.width = canvasRegion.width();
		CanvasPagePosition.x += tradeWidth-splitWidth;
		orderTableRegion.css('width',centerRegion.width()-orderManRegion.width()-5);
		
		var yAxisCoord = getPageCoord(yAxisRegion[0]);
		if(!lastPriceLeft.is(':hidden')){
			lastPriceLeft.css('left',yAxisCoord.x);
		}
		/*if(!lastPriceRight.is(':hidden')){
			lastPriceRight.css('left',yAxisCoord.x);
		}*/
		
		var canvasCoord =getPageCoord(canvasRegion[0]);
		var left = canvasCoord.x+GlobalKLOptionObj.region.x;
		for(var i=0;i<orderDashLen;i++){
			var dashWrap = orderDashWraps.eq(i);
			if(!dashWrap.is(':hidden')){
				dashWrap.css('left',left);
				dashWrap.css('width',canvasRegion.width()-GlobalKLOptionObj.region.x);
			}
		}
		if(!addInstrumentPrompt.is(':hidden')){
			addInstrumentPrompt.css('left',mainView.width()/2-addInstrumentPrompt.width()/2);
		}
		//重画K线
		drawKL();
	}else{
		leftRegion.css('width',splitWidth);
		tradeRegion.css('width',0);
		splitBtn.css('transform','rotate(0deg)');
		$(div).attr('isClick',false);
		centerRegion.css('width',centerRegion.width()+tradeWidth-splitWidth);
		var canvasWidth = canvasRegion.width()+tradeWidth-splitWidth;
		canvasRegion[0].width = canvasWidth;
		canvasRegion[0].height=284;
		CanvasPagePosition.width = canvasRegion.width();
		CanvasPagePosition.x -= tradeWidth-splitWidth;
		orderTableRegion.css('width',centerRegion.width()-orderManRegion.width()-5);
		
		var yAxisCoord = getPageCoord(yAxisRegion[0]);
		if(!lastPriceLeft.is(':hidden')){
			lastPriceLeft.css('left',yAxisCoord.x);
		}
		/*if(!lastPriceRight.is(':hidden')){
			lastPriceRight.css('left',yAxisCoord.x);
		}*/
		
		var canvasCoord =getPageCoord(canvasRegion[0]);
		var left = canvasCoord.x+GlobalKLOptionObj.region.x;
		for(var i=0;i<orderDashLen;i++){
			var dashWrap = orderDashWraps.eq(i);
			if(!dashWrap.is(':hidden')){
				dashWrap.css('left',left);
				dashWrap.css('width',canvasRegion.width()-GlobalKLOptionObj.region.x);
			}
		}
		
		if(!addInstrumentPrompt.is(':hidden')){
			addInstrumentPrompt.css('left',mainView.width()/2-addInstrumentPrompt.width()/2);
		}
		//重画K线
		drawKL();
	}
}