//定义kLine类
function kLine(options) {
    this.options = options;
    this.dataRanges = null;
}

kLine.prototype = {
    initialize: function (painter) {
    	this.candleMinHeight = 3;//蜡烛的默认最小高度
    	this.currentTradePoint = [];
        painter.klOptions = this.options;
        painter.implement = this;
    },
    
    //计算价格小数位数
    setPriceDecimalNum:function(type){
    	var decimalNum;
    	if(type == 0){
    		decimalNum = 0;
    	}else if(type == 1){
    		decimalNum = 1;
    	}else if(type == 2){
    		decimalNum = 2;
    	}
    },
    
    //计算均线价格
    calcMAPrices:function(startIndex, endIndex, daysCn,name,type) {
    	var me = this;
    	var ks = me.getKLStore().ks;
    	var digits = me.getDigits();
        var result = new Array();
        for (var i = startIndex; i <= endIndex; i++) {
            var startCalcIndex = i - daysCn + 1;
            if (startCalcIndex < 0) {
                result.push(false);
                continue;
            }
            var sum = 0;
            for (var k = startCalcIndex; k <= i; k++) {
            	if(!ks[k]) break;
                sum += ks[k].close;
            }
            var val = sum / daysCn;
        	//每根K线根据MA的Name值绑定日均线的价格
            val = Number(val.toFixed(digits));
            if(type == 'MA'){
            	ks[i].MADt[name] = val;
            }else if(type == 'BOLL'){
            	ks[i].BOLLDt[name] = val;
            	var offsetSum = 0;
            	//计算标准差
            	for (var k = startCalcIndex; k <= i; k++) {
                	if(!ks[k]) break;
                    var close = ks[k].close;
                    offsetSum += Math.pow(close-val,2);
                }
            	//计算公式为:  std=  开平方-n个数据与均价差值的平方和/n
            	var std = Math.sqrt(offsetSum/daysCn).toFixed(digits);
            	ks[i].BOLLDt['std'] = Number(std);
            }
            result.push(val);
        }
        return result;
    },
    //获取KL Tip对象
    getKLTipObj:function(){
    	var klTipObj = $("#canvasKL_tip");
    	return klTipObj;
    },
    
    //添加一跟K线图
    addCandleToKL:function(item){
    	if(!LoadKLineDataFinish) return;
    	//console.log("添加新数据");
		GlobalKLData.ks.push(item);
    },
    
    //修改全局KL数据的最后一条数据
    updateGlobalKLLastDt:function(item){
    	for(var s in GlobalKLData.ks[GlobalKLData.ks.length-1]){
    		if(s == 'KLIndex' || s == 'tradeDt' || s == 'MADt') continue;
    		GlobalKLData.ks[GlobalKLData.ks.length-1][s] = item[s];
    	}
    	return GlobalKLData.ks[GlobalKLData.ks.length-1];
    	//GlobalKLData.ks[GlobalKLData.ks.length-1] = item;
    },
    
    //获取同时显示的KL数据的个数
    getShowKLDataCount:function(){
    	var options = this.options;
    	var region = options.region;
    	var canvas = this.canvas,
    		width = canvas.width;
    	var dataCount = Math.ceil(width / (options.spaceWidth + options.barWidth))-1;
    	//console.log('同时显示数据个数--->'+dataCount);
    	return dataCount;
    },
    
    showKLPriceTip:function(y,yPrice){
    	var leftFrag = '<div class="KL_Y_Axis_Price_Tip_Left"></div>';
    	var rightFrag = '<div class="KL_Y_Axis_Price_Tip_Right"></div>';
    	if($('.KL_Y_Axis_Price_Tip_Left').length == 0){
    		$('body').append($(leftFrag));
    	}
    	if($('.KL_Y_Axis_Price_Tip_Right').length == 0){
    		$('body').append($(rightFrag));
    	}
    	if($('.KL_Y_Axis_Price_Tip_Left').is(':hidden')){
    		$('.KL_Y_Axis_Price_Tip_Left').show();
    	}
    	if($('.KL_Y_Axis_Price_Tip_Right').is(':hidden')){
    		$('.KL_Y_Axis_Price_Tip_Right').show();
    	}
    	var klCanvas = $('.KL_Canvas');
    	var yAxisCanvas = $('.KL_Canvas_Y_Axis_Region');
    	var yAxisCanvasCoord =getPageCoord(yAxisCanvas[0]);
    	$('.KL_Y_Axis_Price_Tip_Left').css('top',CanvasPagePosition.y+y);
    	$('.KL_Y_Axis_Price_Tip_Left').css('left',
    			yAxisCanvasCoord.x);
    	
    	$('.KL_Y_Axis_Price_Tip_Right').css('top',CanvasPagePosition.y+y);
    	$('.KL_Y_Axis_Price_Tip_Right').css('left',
    			yAxisCanvasCoord.x+klCanvas.width()+yAxisCanvas.width()+5);
    	
    	$('.KL_Y_Axis_Price_Tip_Left').html(yPrice);
    	$('.KL_Y_Axis_Price_Tip_Right').html(yPrice);
    },
    
    hideKLPriceTip:function(){
    	$('.KL_Y_Axis_Price_Tip_Left').hide();
    	$('.KL_Y_Axis_Price_Tip_Right').hide();
    },
    
    //展示交易点提示框
    showTradePointerTip:function(x,direct){
    	var data = this.currentTradePoint;
    	if(data.length ==0 ) return;
    	var option = this.options;
    	var tradePointer = option.tradePointer;
    	var tipWidth = tradePointer.tipWidth;
    	var tipOffset = tradePointer.tipOffset;
    	var len = data.length;
    	var yOffset = CanvasPagePosition.y+20;
    	for(var i=0;i<len;i++){
    		var top = yOffset+i*50;
    		var dt=data[i];
    		var co=dt.co,dir=dt.dir,price=dt.price,otime=dt.otime,vol=dt.vol,did=dt.did;
        	var tradeTipClass='KL_Trade_Tip_Wrap'+did;
        	var offset = 6;
        	var htmlFrag = "<div class='"+tradeTipClass+"'>"+
    							"<span value='img'></span>"+
    							"<div>"+
    								"<span value='codir'></span>"+
    								"<span value='price'></span>"+
    								"<div value='otime'></div>"+
    							"</div>"+
    							"<span value='vol'></span>"+
    						"</div>";
        	var tradeTip = $('.'+tradeTipClass);
        	if(tradeTip.length == 0){
        		$('body').append($(htmlFrag));
        	}
        	tradeTip.show();
        	tradeTip.css('top',top);
        	var canvasCoord = getPageCoord(this.canvas);
        		canvasCoordX = canvasCoord.x;
        	var xOffset = canvasCoordX+this.getX(x)+tipOffset;
        	if(direct == 'left'){
        		xOffset = canvasCoordX+this.getX(x)-tipOffset-tipWidth;
        	}
        	tradeTip.css('left',xOffset);
        	//设置数据
        	var color,dirStr,image;
        	var coStr = co==0?'开':'平';
        	var dirStr = dir==0?'多':'空';
        	if(dir == 0){//买
        		color='#E60302';
        		dirStr = '多';
        		image = 'url('+CurrentImagePath+'/trade-pointer-duokai.png)';
        		if(co == 1) image = 'url('+CurrentImagePath+'/trade-pointer-duoping.png)';
        	}else{
        		color='#06E65A';
        		dirStr = '空';
        		image = 'url('+CurrentImagePath+'/trade-pointer-kongkai.png)';
        		if(co == 1) image = 'url('+CurrentImagePath+'/trade-pointer-kongping.png)';
        	}
        	tradeTip.find('span[value=img]').css('background-image',image);
        	tradeTip.find('span[value=codir]').css('color',color);
        	tradeTip.find('span[value=codir]').html(dirStr+coStr);
        	tradeTip.find('span[value=price]').css('color',color);
        	tradeTip.find('span[value=price]').html(price);
        	tradeTip.find('span[value=vol]').html(vol+'手');
        	tradeTip.find('div[value=otime]').html(msecondConvertToDate(otime));
    	}
    },
    
    //隐藏交易点图标
    hideTradePointerTip:function(){
    	$('div[class^=KL_Trade_Tip_Wrap]').hide();
    },
    
    //MA价格显示
    changeMAPrice:function(ki){
    	var me = this;
    	var MADt = ki.MADt;
        var maPriceWrap = $('.KL_MA_Price_Wrap');
        if(maPriceWrap.length != 0){
        	for(var ma in MADt){
            	var maWrap = maPriceWrap.find('span[name='+ma+']');
            	if(maWrap.length != 0){
            		var priceWrap = maWrap.next();
            		if(priceWrap.length != 0){
            			var digits = me.getDigits(); 
            			priceWrap.html(MADt[ma].toFixed(digits));
            		}
            	}
            }
        }
    },
    
    getDigits:function(){
    	var digits = RoomInstrumentListInfo[CurrentInstrumentID].digits;
    	digits = typeof digits == 'undefined' || !digits ? 0 : digits;
	    digits += 1;//比正常小数位数多1个
	    return digits;
    },
    
    //BOLL线数据显示
    changeBOLLPrice: function(ki){
    	var options = this.options;
    	var boll = options.bollOption,
			bollK = boll.k;
    	var BOLLDt = ki.BOLLDt;
    	var maPriceWrap = $('.KL_MA_Price_Wrap');
    	if(maPriceWrap.length != 0){
    		var digits=this.getDigits();
    		var MID = BOLLDt.MID,
    			std = BOLLDt.std;
    		var UPPER = MID + bollK*std,
    			LOWER = MID - bollK*std;
    		maPriceWrap.find('span[name=MID]').next().html(MID.toFixed(digits));
    		maPriceWrap.find('span[name=UPPER]').next().html(UPPER.toFixed(digits));
    		maPriceWrap.find('span[name=LOWER]').next().html(LOWER.toFixed(digits));
    	}
    },
    
    //根据X坐标获取蜡烛的索引,并获取数据, 显示到Tip里面
    getTipHtml: function(x,y){
    	if(CurrentInstrumentID == '') return;
    	var yPrice = this.getPriceByYCoord(y).toFixed(CurrentInstrumentDigits);
    	this.showKLPriceTip(y,yPrice);
    	var data = this.getKLStore();
    	var maxLength = this.getMaxDataLength();
    	var index = this.dataRanges.start + this.getIndex(x);
        if (index >= maxLength) index = maxLength - 1;
        if (index < 0) index = 0;
        var ki = data.ks[index];
        if(!ki) return;
        //判断当前K线
        if(CurrentKLXIndex == null){
        	CurrentKLXIndex = this.getIndex(x);
        }else{
        	if(CurrentKLXIndex != this.getIndex(x)){
        		this.hideTradePointerTip();
        		CurrentKLXIndex = this.getIndex(x);
        		if(CurrentKLMASet == 'ma'){
            		//MA数据显示
                    this.changeMAPrice(ki);
            	}else if(CurrentKLMASet == 'boll'){
            		//BOLL线数据显示
                    this.changeBOLLPrice(ki);
            	}
        	}
        }
        this.currentTradePoint = ki.tradeDt
        
        //判断是否有交易点
        if(ki.tradeDt.length != 0){
        	//console.log('交易点个数: '+ki.tradeDt.length);
        	KLHasTradePointer = true;
        	//this.showTradePointerTip(ki.tradeDt,x);
        }else{
        	KLHasTradePointer = false;
        	this.hideTradePointerTip();
        }
        var redImage = CurrentImagePath+'/hongseshangjiantou.png';
        var greenImage = CurrentImagePath+'/lvsexiajiantou.png';
        var priceSrc,volumeSrc,openinterestSrc,
        	priceColor,volumeColor,openinterestColor;
        if(ki.pricechg < 0){
        	priceSrc=greenImage;
        	priceColor='#06E65A';
        }else{
        	priceSrc=redImage;
        	priceColor='#E60302';
        }
        
        if(ki.volumechg < 0){
        	volumeSrc=greenImage;
        	volumeColor='#06E65A';
        }else{
        	volumeSrc=redImage;
        	volumeColor='#E60302';
        }
        
        if(ki.openinterestchg < 0){
        	openinterestSrc=greenImage;
        	openinterestColor='#06E65A';
        }else{
        	openinterestSrc=redImage;
        	openinterestColor='#E60302';
        }
        //console.log("更新Tip时的数据如下:");
        //console.log("open:"+ki.open+",high:"+ki.high+",low:"+ki.low+",close"+ki.close);
        var tipHtml = '<div class="KL_Tip_Wrap">'+
        '<div><span>' + getYMDFormatOne(ki.openTime) + '</span><span>'+getHourMinute(ki.openTime)+'</span></div>' +
        //'昨收价：<font color="' + getPriceColor(ki, ki.preClose) + '">' + toMoney(ki.preClose) + '</font><br/>' +
        '<span>价格:</span><font color="#FFFF99">'+yPrice+'</font><br/>'+
        '<span>开盘: </span><font color="' + this.getPriceColor(ki, "open") + '">' + toMoney(ki.open) + '</font><br/>' +
        '<span>最高: </span><font color="' + this.getPriceColor(ki, "high") + '">' + toMoney(ki.high) + '</font><br/>' +
        '<span>最低: </span><font color="' + this.getPriceColor(ki, "low") + '">' + toMoney(ki.low) + '</font><br/>' +
        '<span>收盘: </span><font color="' + this.getPriceColor(ki, "close") + '">' + toMoney(ki.close) + '</font><br/>'+
        '<img src="'+priceSrc+'"></img><font color="'+priceColor+'">'+ki.pricechg+'/'+ki.pricechgrate+'</font><br/>'+
        '<span>总手: </span><font color="#FFFF99">'+ki.volume+'</font><br/>'+
        '<img src="'+volumeSrc+'"></img><font color="'+volumeColor+'">'+ki.volumechg+'</font><br/>'+
        '<span>持仓: </span><font color="#FFFF99">'+ki.openinterest+'</font><br/>'+
        '<img src="'+openinterestSrc+'"></img><font color="'+openinterestColor+'">'+ki.openinterestchg+'</font><br/>'+
        '</div>';
        /*'成交量：' + bigNumberToText(ki.volume / 100) + '手<br/>' +
        '成交额：' + bigNumberToText(ki.amount);*/
        return tipHtml;
    },
    //根据价格获取Tip显示的颜色值
    getPriceColor:function(ki,type){
    	//鼠标移动时,显示的价格颜色从后台获取的 type+chg属性得知, 如: openchg
    	var options = this.options;
    	var priceState = "fall";
    	if(type == "open"){
    		if(Number(ki.openchg) >= 0) priceState = "rise";;
    	}else if(type == "high"){
    		if(Number(ki.highchg) >= 0) priceState = "rise";
    	}else if(type == "low"){
    		if(Number(ki.lowchg) >= 0) priceState = "rise";
    	}else if(type == "close"){
    		if(Number(ki.closechg) >= 0) priceState = "rise";
    	}
    	if(priceState == "rise") return options.tipRiseColor;
    	else return options.tipFallColor;
    },
    //获取当前显示最后一跟K线的索引
    getIndexForLastCandle: function(){
    	var dataCount = this.getShowKLDataCount();
    	//console.log("数据总个数: "+dataCount);
		var maxLength = this.getKLStore().ks.length;
		var candleIndex;
		if(dataCount < maxLength){
			candleIndex = dataCount-1;
		}else{
			candleIndex = maxLength-1;
		}
		//console.log("最后一个蜡烛的索引为: "+candleIndex);
		return candleIndex;
    },
    //根据蜡烛的索引获取蜡烛的X坐标  相对于Region.X坐标   这个方法用于整体画图
    getCandleXByIndex:function(i){
    	var options = this.options;
    	var result = i * (options.spaceWidth + options.barWidth) + options.spaceWidth + options.barWidth*.5; 
    	if (result * 10 % 10 == 0) result += .5; 
    	//console.log("蜡烛的X坐标: "+result);
    	return result; 
    },
    
    //根据蜡烛的索引获取蜡烛的X坐标  相对于Body坐标   这个方法用于更新单个蜡烛
    getCandleXByIndexForUpdate:function(i){
    	var options = this.options;
    	var result = i * (options.spaceWidth + options.barWidth) + (options.spaceWidth + options.barWidth) * .5; 
    	if (result * 10 % 10 == 0) result += .5;
    	//console.log("蜡烛的X坐标: "+result);
    	return result; 
    },
    //根据Y轴坐标,获取价格
    getPriceByYCoord:function(y){
    	var options = this.options;
    	var region = options.region;
    	var price = this.high - (y * (this.high-this.low))/region.height;
    	return price;
    },
    
    //根据价格获取Y坐标 用于整体画图
    getYCoordByPrice:function(price){
    	var options = this.options;
        var region = options.region;//绘制K线图的矩形区域(起点x,y坐标,宽度,高度)
    	var y = (this.high - price) * region.height / (this.high - this.low);
    	//y += this.verticalSpaceHeight;//最上边第二个点才是最大值
    	return y; 
    },
    
    //根据价格获取Y坐标 用于单个K线更新
    getYCoordByPriceForUp:function(price){
    	var options = this.options;
        var region = options.region;//绘制K线图的矩形区域(起点x,y坐标,宽度,高度)
    	var y = (this.high - price) * region.height / (this.high - this.low);
    	y += region.y;
    	//y += this.verticalSpaceHeight;//最上边第二个点才是最大值
    	return y; 
    },
    
    //根据X坐标获取蜡烛的索引
    getIndex:function(x){
    	var dataRange = this.dataRanges;
    	var startIndex = dataRange.start;
    	var toIndex = dataRange.to;
    	var options = this.options;
        var region = options.region;
    	x -= region.x;
    	if(x == 0) return 0;
        var index = Math.ceil(x / (options.spaceWidth + options.barWidth)) - 1;
        var count = toIndex - startIndex + 1;
        if (index >= count) index = count - 1;
        //console.log("初始化时蜡烛的索引"+index);
        return index;
    },
    //根据鼠标事件的X偏移量,算出K线偏移量 , 鼠标事件的X偏移量是实时变化的, 但K线的偏移量,在两跟K线之间保持一样  
    getX:function(x){
    	var me = this;
    	var options = me.options;
    	var region = options.region;
    	var i = this.getIndex(x);
    	var result = this.getCandleXByIndex(i);
    	//console.log("offset x for x: "+result);
        return result;
    },
    showLastPriceTip:function(item){
    	var color='#06E65A';
    	var closechg = item.closechg;
    	if(closechg > 0) color='#E60302';
    	var yPrice = item.close.toFixed(CurrentInstrumentDigits);
    	var y = this.getYCoordByPriceForUp(yPrice);
    	//getYCoordByPriceForUp
    	var leftClass = 'KL_Y_Axis_Last_Price_Tip_Left';
    	var rightClass = 'KL_Y_Axis_Last_Price_Tip_Right';
    	var leftFrag = '<div class="'+leftClass+'"></div>';
    	var rightFrag = '<div class="'+rightClass+'"></div>';
    	var leftWrap = $('.'+leftClass);
    	var rightWrap = $('.'+rightClass);
    	if(leftWrap.length == 0){
    		$('body').append($(leftFrag));
    	}
    	if(rightWrap.length == 0){
    		$('body').append($(rightFrag));
    	}
    	if(leftWrap.is(':hidden')){
    		leftWrap.show();
    	}
    	if(rightWrap.is(':hidden')){
    		rightWrap.show();
    	}
    	var klCanvasObj = $('.KL_Canvas');
    	var yAxisCanvas = $('.KL_Canvas_Y_Axis_Region');
    	var yAxisCanvasCoord =getPageCoord(yAxisCanvas[0]);
    	leftWrap.css('top',CanvasPagePosition.y+y);
    	leftWrap.css('left',
    			yAxisCanvasCoord.x);
    	
    	rightWrap.css('top',CanvasPagePosition.y+y);
    	rightWrap.css('left',
    			yAxisCanvasCoord.x+klCanvasObj.width()+yAxisCanvas.width()+5);
    	
    	leftWrap.css('background-color',color);
    	rightWrap.css('background-color',color);
    	leftWrap.html(yPrice);
    	rightWrap.html(yPrice);
    },
    
    //更新一跟K线图
    updateKLOnCandle:function(item,updateType){
    	if(!LoadKLineDataFinish) return;
    	//如果更新的数据的最大值和最小值 与 当前Y轴最大值和最小值不匹配, 那么重新画图
    	item = this.updateGlobalKLLastDt(item);
    	if(item.high+this.priceGap > this.high || item.low-this.priceGap < this.low){
    		this.high = Math.max(this.high,item.high+this.priceGap);
    		this.low = Math.min(this.low,item.low-this.priceGap);
    		drawKL();
    	}
    	var options = this.options;
    	var region = options.region;
		var candleIndex = this.getIndexForLastCandle();
		//console.log("最后的索引"+candleIndex);
		//显示最新价格
		this.showLastPriceTip(item);
		this.drawCandleHandler(item,candleIndex,updateType);
		//如果Tip正在当前蜡烛上面显示,更新Tip显示内容
		var tip = document.getElementById("canvasKL_tip");
		if(tip) {
			//console.log("更新Tip数据");
			//tip.updateHtml(this.getTipHtml());
			var candleX = this.getCandleXByIndex(candleIndex);
			if (candleX * 10 % 10 == 0) candleX += .5;
			//console.log("最后蜡烛的X坐标: "+candleX);
			var tipCurrentTipX = Number(tip.currentTipX)+120;
			var offsetDirect = tip.currentOffsetDirect;
			if(offsetDirect == "right") Number(tip.currentTipX)-10;
			//console.log("当前Tip的X坐标"+tipCurrentTipX);
			//当前Tip是否存在于最后一根蜡烛上面
			if(tipCurrentTipX == candleX && tip.isShow)
				tip.innerHTML = this.getTipHtml(candleX);
		}
    },
    //判断是否高开低收的值一样
    whetherSameValue:function(item){
    	if(item.open == item.close && item.high == item.low) return true;
    	else return false;
    },
    
    //更新K线处理
    drawCandleHandler:function(ki,i,updateType){
    	var options = this.options;
    	var region = options.region;
    	var ctx = this.ctx;
    	 var isRise = ki.close > ki.open;
         var color = isRise ? riseColor : fallColor;
		 var priceRangeColor = options.priceRangeColor;
         var lineX = this.getCandleXByIndexForUpdate(i);
         //console.log("最后一根K线的X坐标: "+lineX);
         //console.log("获取蜡烛的X坐标");
         //console.log(lineX);
         var topY = this.getYCoordByPriceForUp(ki.high);
         var bottomY = this.getYCoordByPriceForUp(ki.low);
         //console.log("根据价格获取Y轴坐标"+topY+"--"+bottomY);
         var needCandleRect = options.barWidth > 1.5;
         if (needCandleRect) {//当蜡烛的宽度都小于1.5时不需要画蜡烛
         	//console.log("需要画蜡烛矩形");
             ctx.fillStyle = color;
             ctx.strokeStyle = priceRangeColor;
             var candleY, candleHeight;//蜡烛的起点Y坐标和高度
             if (isRise) {
                 candleY = this.getYCoordByPriceForUp(ki.close);
                 candleHeight = this.getYCoordByPriceForUp(ki.open) - candleY;
             } else {
                 candleY = this.getYCoordByPriceForUp(ki.open);
                 candleHeight = this.getYCoordByPriceForUp(ki.close) - candleY;
             }
             
             //清除已画的价格线和蜡烛
             ctx.clearRect(lineX-options.barWidth/2,
            		 options.region.y+1,options.barWidth,options.region.height-1);
             ctx.beginPath();
             ctx.fillStyle = options.klbackgroundColor;
             ctx.fillRect(lineX-options.barWidth/2-1,
            		 options.region.y+1,options.barWidth+2.,options.region.height-1);
             //重画蜡烛所在矩形的水平线
             var spaceHeight = options.region.height / (options.horizontalLineCount + 1);
             //console.log(spaceHeight);
             for (var j = 1; j <= options.horizontalLineCount; j++) {
                 var y = spaceHeight * j;
                 if (y * 10 % 10 == 0) y += .5;
                 //console.log(y);
                 KLPainter.drawHLine(options.splitLineColor, lineX-options.barWidth/2, y, options.barWidth, 1, options.lineStyle);
             }
             ctx.stroke();
             
             //重画日均线  暂时有5,10,15等3条日均线
             var tempData = [];
             var tempTwoData = this.getKLStore().ks[this.getMaxDataLength()-2];
             tempData.push(tempTwoData);
             tempData.push(ki);
             //this.paintMAs(tempData,"update");
             //画最高价和最低价的线
             ctx.fillStyle = color;
             ctx.strokeStyle = priceRangeColor;
             ctx.beginPath();
             ctx.lineWidth=1;
             ctx.moveTo(lineX, topY);
             ctx.lineTo(lineX, bottomY);
             ctx.stroke();
			 //画蜡烛的矩形
              var candleX = lineX - options.barWidth / 2;
             ctx.beginPath();
             if(this.whetherSameValue(ki)) {
            	 candleHeight = options.priceSameHeight;//当高开低收都一样时, 使用1像素, 灰色的样式
             	 ctx.fillStyle = options.priceSameColor;
             }else{
            	 if(candleHeight < this.candleMinHeight)
                	 candleHeight = this.candleMinHeight;
             }
             ctx.fillRect(candleX, candleY, options.barWidth, candleHeight);
             //画交易点
             this.drawTradePointerImg(lineX,ki);
         } else {
         	//console.log("不需要画蜡烛");
             ctx.strokeStyle = color;
             //画线
             ctx.beginPath();
             ctx.moveTo(lineX, topY);
             ctx.lineTo(lineX, bottomY);
             ctx.stroke();
         }
    },
    
    //清空画布
    clearCanvas:function(){
    	var canvas = this.canvas;
        var ctx = this.canvas.getContext('2d');
        var options = this.options;
        var region = options.region;
        var clearPart = {width:region.width,height:region.height};
        ctx.clearRect(0, 0, clearPart.width+region.x, clearPart.height+40);
        //清空Y轴
        var yAxisOptions = options.yAxis,
        	yAxisCanvasId = yAxisOptions.canvasId,
    		yAxisCanvas = $('#'+yAxisCanvasId),
    		yAxisCtx = yAxisCanvas[0].getContext('2d');
        yAxisCtx.clearRect(0,0,yAxisCanvas.width(),yAxisCanvas.height());
    },
    
    againStart: function(){
    	var me = this;
        var canvas = me.canvas;
        var ctx = me.ctx;
        this.painting = true;
        var options = me.options;
        //var clearPart = { width: canvas.width, height: options.priceLine.region.y - 3 };
        var region = options.region;
        var clearPart = {width:region.width,height:region.height};
      	//清空整个画布
        ctx.lineWidth=1;
        ctx.clearRect(0, 0, clearPart.width+region.x, clearPart.height+40);
        ctx.save();//保存一次状态
        window.riseColor = options.riseColor;
        window.fallColor = options.fallColor;
        window.normalColor = options.normalColor;
        //console.log("K线区域宽高: "+clearPart.width+"--"+clearPart.height);
        if (options.backgroundColor && !KLPainter.drawnBackground) {
            ctx.beginPath();//开始一条路径或重置当前路径
            //填充颜色
            ctx.fillStyle = options.backgroundColor;
            //ctx.fillStyle = 'red';
            //绘制矩形
            ctx.rect(0, 0, clearPart.width+region.x, clearPart.height+40);
            ctx.fill();//填充颜色
            //ctx.closePath();
            KLPainter.drawnBackground = true;//已经绘制过背景
        }
        //重置左上角的坐标
        ctx.translate(options.region.x, options.region.y);
        ctx.strokeStyle = options.borderColor;//边框样式
        ctx.beginPath();
        ctx.fillStyle=options.klbackgroundColor;//
        ctx.fillRect(0, 0, options.region.width, options.region.height);
        ctx.stroke();//绘制已定义的路径
        //重置Canvas宽度
        me.options.region.width = canvas.clientWidth;
        //画水平底纹线
        var spaceHeight = options.region.height / (options.horizontalLineCount + 1);
        for (var i = 1; i <= options.horizontalLineCount; i++) {
            var y = spaceHeight * i;
            if (y * 10 % 10 == 0) y += .5;
            KLPainter.drawHLine(options.splitLineColor, 0, y, options.region.width, 1, options.lineStyle);
        }
    },
    
    start: function () {
        //timer.start('start');
        var canvas = this.canvas;
        var ctx = this.ctx;
        this.painting = true;
        var options = this.klOptions;
        //var clearPart = { width: canvas.width, height: options.priceLine.region.y - 3 };
        var region = options.region;
        var clearPart = {width:region.width,height:region.height};
      	//清空整个画布
        ctx.lineWidth=1;
        ctx.clearRect(0, 0, clearPart.width+region.x, clearPart.height+40);
        ctx.save();//保存一次状态
        window.riseColor = options.riseColor;
        window.fallColor = options.fallColor;
        window.normalColor = options.normalColor;
        //console.log("K线区域宽高: "+clearPart.width+"--"+clearPart.height);
        if (options.backgroundColor && !this.drawnBackground) {
            ctx.beginPath();//开始一条路径或重置当前路径
            //填充颜色
            ctx.fillStyle = options.backgroundColor;
            //ctx.fillStyle = 'red';
            //绘制矩形
            ctx.rect(0, 0, clearPart.width+region.x, clearPart.height+40);
            ctx.fill();//填充颜色
            //ctx.closePath();
            this.drawnBackground = true;//已经绘制过背景
        }
        //return;
        //重置左上角的坐标
        ctx.translate(options.region.x, options.region.y);
        ctx.strokeStyle = options.borderColor;//边框样式
        ctx.beginPath();
        ctx.fillStyle=options.klbackgroundColor;//
        ctx.fillRect(0, 0, options.region.width, options.region.height);
        ctx.stroke();//绘制已定义的路径
        
        //重置Canvas宽度
        this.klOptions.region.width = canvas.clientWidth;
        //画水平底纹线
        var spaceHeight = options.region.height / (options.horizontalLineCount + 1);
        for (var i = 1; i <= options.horizontalLineCount; i++) {
            var y = spaceHeight * i;
            if (y * 10 % 10 == 0) y += .5;
            this.drawHLine(options.splitLineColor, 0, y, options.region.width, 1, options.lineStyle);
        }
        
        //画垂直底纹线
        /* var spaceWidth = options.region.width / (options.verticalLineCount + 1);
        for (var i = 1; i <= options.verticalLineCount; i++) {
            var w = spaceWidth * i;
            if (w * 10 % 10 == 0) w += .5;
            this.drawVLine(options.splitLineColor, w, 0, options.region.height, 1, options.lineStyle);
        } */
    },
    
    /**
     * 鼠标移出K线时,更新MA数据为当前最后一根K线的数据
     */
    updateMAPrice:function(){
    	var me = this;
    	var options = me.options;
    	if(CurrentKLMASet == 'ma'){
    		var globalDt = me.getKLStore(),
			startIndex = this.dataRanges.start;
        	toIndex = this.dataRanges.to,
        	ki = globalDt.ks[toIndex];
        	if(ki){
        		me.changeMAPrice(ki);
        	}
    	}
    },
    
    /**
     * 鼠标移出K线时,更新布林线数据为当前最后一根K线的数据
     */
    updateBOLLPrice:function(){
    	var me = this;
    	var options = me.options;
    	if(CurrentKLMASet == 'boll'){
    		var globalDt = me.getKLStore(),
    			startIndex = this.dataRanges.start;
            	toIndex = this.dataRanges.to,
            	bollDt = globalDt.ks[toIndex].BOLLDt;
    		if(bollDt){
    			var MID = bollDt.MID,
    				std = bollDt.std,
    				k = options.bollOption.k;
    			var UPPER = MID + k*std,
    				LOWER = MID - k*std;
    			var maPriceWrap = $('.KL_MA_Price_Wrap');
    			if(maPriceWrap.length != 0){
    				var digits = me.getDigits();
    				maPriceWrap.find('span[name=MID]').next().html(MID.toFixed(digits));
    	    		maPriceWrap.find('span[name=UPPER]').next().html(UPPER.toFixed(digits));
    	    		maPriceWrap.find('span[name=LOWER]').next().html(LOWER.toFixed(digits));
    			}
    		}
    	}
    },
    
    end: function () {
        //this.ctx.restore();
        var me = this;
        var options = me.options;
        var region = options.region;
        var canvas = this.canvas;
        //console.log("是否存在交叉线对象实例:"+me.crossLineAndTipMgrInstance);
        var crossLineAndTipConfig = {
    		//获取交叉点坐标
            getCrossPoint: function (ev) { 
            	//console.log("新创建对象的方法");
            	//console.log(me.getX(ev.offsetX));
            	return { x: me.getX(ev.offsetX), y: ev.offsetY };
            },
            //触发事件的范围
            triggerEventRanges: { x: region.x, y: region.y, width: region.width, 
            	//height: volumeRegion.y + volumeRegion.height - region.y 
            	height: region.y + region.height
            },
            //Tip属性
            tipOptions: {
                getTipHtml: function (ev) { return me.getTipHtml(ev.offsetX,ev.offsetY); },
                size:{width:132,height:222},
                position:{x:false,y:region.y}, //position中的值是相对于canvas的左上角的
                opacity:80,
                cssClass:'',
                offsetToPoint:4,
                hideYPriceTip:function(){
                	me.hideKLPriceTip();
                },
                hideTradePointerTip:function(){
                	me.hideTradePointerTip();
                },
                tradePointerOp:options.tradePointer,
                showTradePointerTip:function(x,direct){
                	me.showTradePointerTip(x,direct);
                },
                updateMAPrice:function(){
                	me.updateMAPrice();
                },
                updateBOLLPrice:function(){
                	me.updateBOLLPrice();
                }
            },
            crossLineOptions: {
                color: '#7F7C77'
            }
        };
        if(!me.crossLineAndTipMgrInstance){//创建交叉线及Tip实例对象
        	//crossLinesAndTipMgr在 chartEventHelper.js中
            me.crossLineAndTipMgrInstance = new crossLinesAndTipMgr(canvas, crossLineAndTipConfig);
            me.crossLineAndTipMgrInstance.addCrossLinesAndTipEvents();
        }
        else {
            me.crossLineAndTipMgrInstance.updateOptions(crossLineAndTipConfig);
        }
        me.painting = false;
    },
    //设置屏幕显示的K线的数据范围
    setDataRange: function(){
    	if(arguments.length == 0){
    		//绘制K线图的矩形区域(起点x,y坐标,宽度,高度)
        	var options = this.options;
            var region = options.region;
            var maxDataLength = this.getMaxDataLength();//所有数据的个数
            var dataCount = this.getShowKLDataCount();//同时显示的数据个数
            var startIndex,toIndex;
            if(dataCount > maxDataLength){
            	startIndex = 0;
            }else{
            	startIndex =  maxDataLength - dataCount;
            }
            toIndex = maxDataLength -1;
            this.dataRanges = {
                start: startIndex,
                to: toIndex
            };
    	}else if(arguments.length == 2){
    		this.dataRanges = {
                start: arguments[0],
                to: arguments[1]
            };
    	}
        //console.log('数据范围'+this.dataRanges);
    },
    
    //获取KL数据
    getKLStore:function(){
    	return GlobalKLData;
    },
    
    //获取所有数据的个数
    getMaxDataLength: function(){
    	var maxLength = this.getKLStore().ks.length;
    	return maxLength;
    },
    //当数据范围变化时,需要重新计算蜡烛的宽度
    needCalcSpaceAndBarWidth:function(){
    	var options = this.options;
        var region = options.region;
        //console.log("当数据范围变化时,需要重新计算蜡烛的宽度");
        //重新计算spaceWidth和barWidth属性
        function isOptionsOK() { return (options.spaceWidth + options.barWidth) * itemsCount <= region.width; }
        var spaceWidth, barWidth;
        if (isOptionsOK()) {
            //柱足够细了
            spaceWidth = 1;
            barWidth = (region.width - spaceWidth * itemsCount) / itemsCount;
            if (barWidth > 4) {
                spaceWidth = 2;
                barWidth = ((region.width - spaceWidth * itemsCount) / itemsCount);
            }
        } else {
            spaceWidth = 1;
            barWidth = (region.width - spaceWidth * itemsCount) / itemsCount;
            if (barWidth <= 2) {
                spaceWidth = 0;
                barWidth = (region.width - spaceWidth * itemsCount) / itemsCount;
            } else if (barWidth > 4) {
                spaceWidth = 2;
                barWidth = ((region.width - spaceWidth * itemsCount) / itemsCount);
            }
        }
		//重新赋值蜡烛宽度和空隙宽度
        options.barWidth = barWidth;
        options.spaceWidth = spaceWidth;
    },
    //画交易点
    drawTradePointerImg:function(lineX,ki){
    	var canvasCtx = this.ctx;
    	var dt = ki.tradeDt,tradeLen=dt.length;
    	var lastKL = GlobalKLData.ks[GlobalKLData.ks.length-1];
    	var lastKLIndex=lastKL.KLIndex;
        if(tradeLen != 0){
        	for(var i=0;i<tradeLen;i++){
        		var tempDt = dt[i];
            	var otime = tempDt.otime,
        		dir = tempDt.dir,
        		co = tempDt.co,
        		vol = tempDt.vol,
        		iid = tempDt.iid,
        		price = tempDt.price;
        		var x = lineX-CurrentBarWidth/2;
        		//获取Y坐标
        		var y = this.getYCoordByPrice(price)-CurrentBarWidth/2;
        		var topY = this.getYCoordByPrice(ki.high)-CurrentBarWidth/2;
                var bottomY = this.getYCoordByPrice(ki.low)-CurrentBarWidth/2;
                var img = document.getElementById('tradePointDefault');
            	canvasCtx.drawImage(img,x,y);
            	var priceCompareWay = 'buy';
                if(co == 0){//开仓
                	//多开空平在下
                	var imgId = 'tradePointDuoKai';
                	var tempY = bottomY;
                	if(dir == 1) {
                		priceCompareWay='sell';
                		imgId = 'tradePointKongKai';
                		tempY = topY;
                	}
                	var img = document.getElementById(imgId);
                	canvasCtx.drawImage(img,x,tempY);
                }else if(co == 1){//平仓
                	//空开多平在上
                	var imgId = 'tradePointDuoPing';
                	var tempY = topY
                	if(dir == 1){
                		imgId = 'tradePointKongPing';
                		tempY = bottomY;
                	}
                	var img = document.getElementById(imgId);
                	canvasCtx.drawImage(img,x,tempY);
                }
                if(lastKLIndex){
                	var color = '#06E65A';//绿色
		        	var lastKLClose = lastKL.close;
		        	if(!lastKLClose) return;
		        	var lastKLX = this.getCandleXByIndex(lastKLIndex)+CurrentBarWidth/2;
		        	var lastKLY = this.getYCoordByPrice(lastKLClose);
		        	if(priceCompareWay == 'buy'){
		        		if(lastKLClose > price){
		        			color = '#E60302';
		        		}
		        	}else if(priceCompareWay == 'sell'){
		        		if(lastKLClose < price){
		        			color = '#E60302';
		        		}
		        	}
		        	canvasCtx.lineWidth = 3;
		        	canvasCtx.beginPath();
			        canvasCtx.strokeStyle=color;
			        //Y轴加上的应该是交易点图标高度的一半, 现在交易点高度和蜡烛宽度一样,先这样写
		        	canvasCtx.moveTo(x+CurrentBarWidth, y+CurrentBarWidth/2);
		        	canvasCtx.dashedLineTo(lastKLX,lastKLY);
		        	//canvasCtx.rotate(90);
		        	canvasCtx.closePath();
		        	canvasCtx.stroke();
		        }
        	}
        	canvasCtx.lineWidth = 1;
        }
    },
    
    //画一跟蜡烛
    drawCandle: function(ki, i){
    	if(!ki) return;
    	var options = this.options;
    	var ctx = this.ctx;
        var region = options.region
    	var isRise = ki.close > ki.open;
        var color = isRise ? riseColor : fallColor;
		var priceRangeColor = options.priceRangeColor;
        var lineX = this.getCandleXByIndex(i);
        if(i==0){
        	//console.log('第一个跟K线的X坐标为--》'+lineX);
        }
        var currentX = this.currentX;
        //console.log("获取蜡烛的X轴坐标");
        // console.log(lineX);
        if (currentX == 0) currentX = lineX;
        else {
            if (lineX - currentX < 1) return;
        }
       /* if(lineX*10%10 == 0) lineX += 0.5;*/
        currentX = lineX;
        //console.log("蜡烛中心线的X坐标");
        var topY = this.getYCoordByPrice(ki.high);
        var bottomY = this.getYCoordByPrice(ki.low);
        //console.log("根据价格获取Y轴坐标"+topY+"--"+bottomY);
        var needCandleRect = options.barWidth > 1.5;
        if (needCandleRect) {//当蜡烛的昆都小于1.5时不需要画蜡烛
        	//console.log("需要画蜡烛矩形");
            ctx.fillStyle = color;
            ctx.strokeStyle = priceRangeColor;
            var candleY, candleHeight;//蜡烛的起点Y坐标和高度
            if (isRise) {
                candleY = this.getYCoordByPrice(ki.close);
                candleHeight = this.getYCoordByPrice(ki.open) - candleY;
            } else {
                candleY = this.getYCoordByPrice(ki.open);
                candleHeight = this.getYCoordByPrice(ki.close) - candleY;
            }
            //画最高价和最低价的线
            ctx.beginPath();
            ctx.lineWidth=1;
            ctx.moveTo(lineX, topY);
            ctx.lineTo(lineX, bottomY);
            ctx.stroke();
			//画蜡烛的矩形
            var candleX = lineX - options.barWidth / 2;
            ctx.beginPath();
            if(this.whetherSameValue(ki)) {
           	   candleHeight = options.priceSameHeight;//当高开低收都一样时, 使用1像素, 灰色的样式
           	   ctx.fillStyle = options.priceSameColor;
            }else{
           	 if(candleHeight < this.candleMinHeight)
               	 candleHeight = this.candleMinHeight;
            }
            ctx.fillRect(candleX, candleY, options.barWidth, candleHeight);
        } else {
        	//console.log("不需要画蜡烛");
            ctx.strokeStyle = color;
            //画线
            ctx.beginPath();
            ctx.moveTo(lineX, topY);
            ctx.lineTo(lineX, bottomY);
            ctx.stroke();
        }
    },
    
    //根据最高价,最低价,K线图区域高度  计算出K线图行高所占用的价格间隙
    caclPriceIncrease:function(high,low){
    	var options = this.options;
    	var height = options.region.height;
    	var horizontalLineCount = options.horizontalLineCount;
    	var priceGap = Number(((high - low)/(horizontalLineCount -1)).toFixed(1));
    	this.priceGap = priceGap;
    	return priceGap;
    },
    
    /**
     * 画Y轴, K线,蜡烛, 获取K线价格区间
     * @param priceRange //价格区间(范围)
     */
    paintItems: function (priceRange) {
    	var me = this;
    	var options = this.options;
        var ctx = this.ctx;
        var canvasId = options.canvasId;
        var region = options.region;//绘制K线图的矩形区域(起点x,y坐标,宽度,高度)
        var maxDataLength = this.getMaxDataLength();//所有数据的个数
        var needCalcSpaceAndBarWidth =  false;//是否需要计算蜡烛和空隙的宽度
        var startIndex,toIndex;
        if(CurrentKLMoveMark == false){
        	this.setDataRange();
        	startIndex = this.dataRanges.start;
            toIndex = this.dataRanges.to;
            CurrentKLStartIndex = startIndex;
            CurrentKLEndIndex = toIndex;
        }else{
        	if(CurrentKLStartIndex < 0) CurrentKLStartIndex =0;
        	startIndex = CurrentKLStartIndex;
        	//toIndex = CurrentKLEndIndex;
        	if(CurrentKLEndIndex >= GlobalKLData.ks.length){
        		CurrentKLEndIndex = GlobalKLData.ks.length - 1;
        	}
        	toIndex = CurrentKLEndIndex;
        	this.setDataRange(startIndex,toIndex);
        }
        //var itemsCount = toIndex - startIndex + 1;
		//过滤数据(获取显示到页面上的数据)
        var filteredData = [];
        for (var i = startIndex; i <= toIndex; i++) {
        	var tempData = me.getKLStore().ks[i];
        	if(i == startIndex) {
        		CurrentKLStartDate = tempData.openTime;
        	}
        	if(i == toIndex) {
        		CurrentKLEndDate = tempData.openTime;
        	}
        	me.getKLStore().ks[i].KLIndex = i-startIndex;
            filteredData.push(me.getKLStore().ks[i]);
        }
        this.filteredData = filteredData;
        //console.log("显示到页面的数据如下:");
        //console.log(filteredData);
        var high, low;
        if(priceRange){
        	high = priceRange.high;
        	low = priceRange.low;
        }else{
        	 filteredData.each(function (val, a, i) {
                 if (i == 0) { high = val.high; low = val.low; }
                 else { 
                 	if(val) {
                 		high = Math.max(val.high, high); low = Math.min(low, val.low);
                 	}
                 }
             });
        }
        var priceIncrease = me.caclPriceIncrease(high,low);
        this.high = high + priceIncrease;
        this.low = low - priceIncrease;
        if(CurrentKLMASet == 'ma'){
        	//画移动平均线
            this.paintMAs("global");
        }else if(CurrentKLMASet == 'boll'){
        	//画布林线
        	this.paintBollLine();
        }
        this.currentX = 0;  //做逻辑 
        //画蜡烛
        for(var i=0;i<filteredData.length;i++){
        	me.drawCandle(filteredData[i],i);
        	//画交易点
        	//var lineX = me.
        	//var lineX = me.getCandleXByIndex(i);
            //me.drawTradePointerImg(lineX,filteredData[i]);
        }
        //画交易点及交易线
        hisTradeDataSet(CurrentAllTradeDt,false);
        
        var yAxisOptions = options.yAxis;
        yAxisOptions.region = yAxisOptions.region;
        yAxisOptions.region.height = options.region.height;
        //画y轴
        var yAxisCanvasId = yAxisOptions.canvasId,
        	yAxisCanvas = $('#'+yAxisCanvasId),
        	yAxisCanvasCtx = yAxisCanvas[0].getContext('2d');
        yAxisCanvasCtx.clearRect(0,0,yAxisCanvas.width(),yAxisCanvas.height());
        var yAxisImp = new yAxis(yAxisOptions);
        GlobalKLYAxisObj = new Painter(
        	yAxisCanvasId,
            yAxisImp,
            calcAxisValues(me.high, me.low, (options.horizontalLineCount + 2))
        );
        GlobalKLYAxisObj.paint();
        
        //画X轴
        var xAxisOptions = options.xAxis;
        xAxisOptions.region = { x: 0, y: region.height + 2, width: region.width, height: 20 };
        var xAxisImp = new xAxis(xAxisOptions);
        var xScalers = [];
        var stepLength = filteredData.length / (options.xAxis.scalerCount - 1);
        //console.log("stepLength:"+stepLength);
        if (stepLength < 1) {
            options.xAxis.scalerCount = filteredData.length;
            stepLength = 1;
        }
        xScalers.push(convertDate(filteredData[0].quoteTime, false));
        for (var i = 1; i < options.xAxis.scalerCount; i++) {
            var index = Math.ceil(i * stepLength);
            //console.log("X轴显示时间在FilterData中的索引: "+index);
            if (index >= filteredData.length) index = filteredData.length - 1;
            var quoteTime = convertDate(filteredData[index].quoteTime, false);
            xScalers.push(quoteTime);
        }
        var xPainter = new Painter(canvasId, xAxisImp, xScalers);
        xPainter.paint();
    },
    paintPriceLine: function () {
        if (this.hasPaintPriceLine) return;
        this.hasPaintPriceLine = true;
        var ctx = this.ctx;
        var options = this.klOptions.priceLine;
        var region = options.region;
        ctx.save();
        ctx.translate(region.x, region.y);

        ctx.clearRect(0 - region.x, 0, this.canvas.width, region.height);
        //画水平底纹线
        var spaceHeight = region.height / (options.horizontalLineCount + 1);
        for (var i = 1; i <= options.horizontalLineCount; i++) {
            var y = spaceHeight * i;
            if (y * 10 % 10 == 0) y += .5;
            this.drawHLine(options.splitLineColor, 0, y, region.width, 1, options.lineStyle);
        }
        //画垂直底纹线
        var spaceWidth = region.width / (options.verticalLineCount + 1);
        for (var i = 1; i <= options.verticalLineCount; i++) {
            var w = spaceWidth * i;
            if (w * 10 % 10 == 0) w += .5;
            this.drawVLine(options.splitLineColor, w, 0, region.height, 1, options.lineStyle);
        }
        var ks = this.data.ks;

        var ksLength = ks.length;
        var priceRange;
        ks.each(function (val, arr, i) {
            if (i == 0) { priceRange = { high: val.high, low: val.low }; }
            else {
                priceRange.high = Math.max(priceRange.high, val.close);
                priceRange.low = Math.min(priceRange.low, val.close);
            }
        });
        if (priceRange.low > 1) priceRange.low -= 1;
        function getRangeX(i) { return i * region.width / ksLength; }
        function getRangeY(val) { return (priceRange.high - val) * region.height / (priceRange.high - priceRange.low); }
        var currentX = 0;
        ks.each(function (val, arr, i) {
            var x = getRangeX(i);
            if (currentX == 0) currentX = x;
            else {
                if (x - currentX < 1) return;
            }
            currentX = x;
            var y = getRangeY(val.close);
            if (i == 0) {
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.strokeStype = options.borderColor;
        ctx.stroke();
        ctx.lineTo(region.width, region.height);
        ctx.lineTo(0, region.height);
        ctx.closePath();
        ctx.fillStyle = options.fillColor;
        ctx.globalAlpha = options.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        var yAxisOptions = options.yAxis;
        yAxisOptions.region = yAxisOptions.region || { x: 0 - region.x, y: 0 - 3, height: region.height, width: region.x - 3 };
        //画y轴
        var yAxisImp = new yAxis(yAxisOptions);
        var yPainter = new Painter(
            this.canvas.id,
            yAxisImp,
            calcAxisValues(priceRange.high, priceRange.low, (options.horizontalLineCount + 2))
        );

        yPainter.paint();
        ctx.restore();//返回之前保存过的环境
    },
    
    //画布林线
    paintBollLine:function(){
    	//return;
    	var me = this;
    	var options = me.options,
    		boll = options.bollOption,
    		bollCount = boll.n,
    		bollK = boll.k,
    		bollName = 'MID',
    		dataRange = me.dataRanges,
    		startIndex = dataRange.start,
    		toIndex = dataRange.to,
    		ctx = me.ctx;
        ctx.lineWidth = 1;
        var global = me.getKLStore().ks;
    	//先计算均线
    	var MA = me.calcMAPrices(startIndex, 
    			toIndex, bollCount, bollName,'BOLL');
    	var BollLen = CurrentKLBOOLArr.length;
    	var upperPrice,//阻力线最高价标识
    		lowerPrice;//支撑线最低价标识
    	//画线之前先验证布林线最大值和最小值是否与当前K线对象的最大值和最小值冲突
    	
    	//画线
    	for(var j=0;j<BollLen;j++){
    		var bollObj = CurrentKLBOOLArr[j];
    		var name = bollObj.name,color=bollObj.color;
    		ctx.strokeStyle=color;
    	    ctx.beginPath();
    		//画线
        	for(var i=startIndex;i<=toIndex;i++){
        		var kl = global[i],
        			bollDt = kl.BOLLDt,
        			price = bollDt['MID'];
        		if(price){
        			var std = bollDt['std'];
        			var tempI = i - startIndex;
        			//绘制线
            		var x = tempI * (options.spaceWidth + options.barWidth) + options.spaceWidth + options.barWidth * .5;
            		var y = me.getYCoordByPrice(price);
            		if(name == 'UPPER'){
            			//y += bollK*std;
            			y = me.getYCoordByPrice(price+bollK*std);
            			//判断阻力线价格是否超过当前K线的最高价
            			if(i == startIndex){
            				upperPrice = price+bollK*std;
            			}else{
            				upperPrice = Math.max(upperPrice,price+bollK*std);
            			}
            		}else if(name == 'LOWER'){
            			//y -= bollK*std;
            			y = me.getYCoordByPrice(price-bollK*std);
            			if(i == startIndex){
            				lowerPrice = price - bollK*std;
            			}else{
            				lowerPrice = Math.min(lowerPrice,price-bollK*std);
            			}
            			//判断支撑线价格是否低过当前K线的最低价
            		}
            		if(y && tempI == 0){
            			ctx.moveTo(x,y);
            		}else{
            			ctx.lineTo(x,y);
            		}
        		}
        	}
        	ctx.stroke();
        	ctx.closePath();
    	}
    	
    	/*console.log('阻力线最高价'+upperPrice);
    	console.log('支撑线最低价'+lowerPrice);*/
    	if(upperPrice > me.high || lowerPrice < me.low){//需要重新画图
    		//console.log('重新画图啦------------------------');
    		me.againStart();
    		me.paintItems({
    			high:Math.max(upperPrice,me.high),
    			low:Math.min(lowerPrice,me.low)
    		});
    	}
    	/*var MALen = MA.length;
    	for(var i=0;i<MALen;i++){
    		var price = MA[i];
    		//判断价格是否超过了K线价格的最大值和最小值
    		
    		//绘制线
    		var x = i * (options.spaceWidth + options.barWidth) + options.spaceWidth + options.barWidth * .5;
    		var y = me.getYCoordByPrice(price);
    		if(y && i == 0){
    			ctx.moveTo(x,y);
    		}else{
    			ctx.lineTo(x,y);
    		}
    	}
    	ctx.stroke();
    	ctx.closePath();*/
    	//计算标准差
    	
    	//计算阻力线和支撑线
    	
    },
    
    /**
     * 画均线  move average  (实际上dayCount表示的是K线的根数)
     * filteredData要画日均线的数据
     * paintType 画日均线的类型
     * 	  global  整体画图时调用
     * 	  update  更新一条K线时调用
     */
    paintMAs: function (paintType) {
    	var me = this;
    	var dataRange = me.dataRanges;
    	var startCalcIndex;
    	var startIndex = dataRange.start;
    	var toIndex = dataRange.to;
        var ctx = this.ctx;
        ctx.lineWidth = 1;
        var options = this.options;
        var MAs = options.MAs;
        if(paintType == "global") startCalcIndex = startIndex;
        else startCalcIndex = toIndex-1;
        var MAHighPrice,MALowPrice;
        MAs.each(function (val, arr, index) {
            var MA = me.calcMAPrices(startCalcIndex, toIndex, val.daysCount, val.name,'MA');
            //console.log("计算后的日均线价格数组");
            //console.log(MA);
            val.values = MA;
            MA.each(function (price, arr, i) {
                if (price) {
                	//重新赋值K线对象的最大值和最小值
                	if(price > me.high){
                		me.high = price+this.priceGap;
                	}
                	if(price < me.low){
                		me.low = price - this.priceGap;
                	}
                    //设置上面显示的MA价格
                    if(i == MA.length - 1){//用最后一根K线的日均线价格
                    	var MAPriceWrap = $('.KL_MA_Price_Wrap');
                    	var wrap = MAPriceWrap.find('span[name='+val.name+']');
                    	if(wrap){
                    		wrap.next().html(price);
                    	}
                    }
                }
            });
        });

        MAs.each(function (val, arr, index) {
            var MA = val.values;
            ctx.strokeStyle = val.color;
            ctx.beginPath();
            MA.each(function (val, arr, i) {
            	//var x = i * (options.spaceWidth + options.barWidth) + (options.spaceWidth + options.barWidth) * .5;
            	var x = 0;
            	if(paintType == "global")
            		x = i * (options.spaceWidth + options.barWidth) + options.spaceWidth + options.barWidth * .5;
            	else {
            		var lastKLIndex = me.getIndexForLastCandle();
                	x = me.getCandleXByIndexForUpdate(lastKLIndex-1)+i*(options.barWidth+options.spaceWidth);
            	}
                if (!val) return;
                //var y = y = me.getYCoordByPrice(val);
                var y = 0;
                if(paintType == "update"){
                	y = me.getYCoordByPriceForUp(val);
                }else {
                	y = me.getYCoordByPrice(val);
                }
                if (y && i==0) {
                    ctx.moveTo(x, y);
                    if(paintType == "update"){
                    	//console.log("起点日均线的X坐标: "+x+"-Y坐标"+y);
                    }
                } else {
                    ctx.lineTo(x, y);
                    if(paintType == "update"){
                    	//console.log("终点日均线的X坐标: "+x+"-Y坐标"+y);
                    }
                }
            });
            ctx.stroke();
        });
    },
    //画成交量的线
    paintVolume: function (filteredData) {
        var ctx = this.ctx;
        var options = this.klOptions;
        //画量线
        var volumeOptions = options.volume;
        var volumeRegion = volumeOptions.region;
        ctx.restore();
        ctx.save();
        ctx.translate(volumeRegion.x, volumeRegion.y);
        ctx.globalAlpha = 1;
        //画水平底纹线
        var spaceHeight = volumeRegion.height / (volumeOptions.horizontalLineCount + 1);
        for (var i = 1; i <= volumeOptions.horizontalLineCount; i++) {
            var y = spaceHeight * i;
            if (y * 10 % 10 == 0) y += .5;
            this.drawHLine(options.splitLineColor, 0, y, options.region.width, 1, options.lineStyle);
        }
        //画垂直底纹线
        var spaceWidth = options.region.width / (options.verticalLineCount + 1);
        for (var i = 1; i <= options.verticalLineCount; i++) {
            var w = spaceWidth * i;
            if (w * 10 % 10 == 0) w += .5;
            this.drawVLine(options.splitLineColor, w, 0, volumeRegion.height, 1, options.lineStyle);
        }

        ctx.strokeStyle = options.borderColor;
        ctx.beginPath();
        ctx.rect(0, 0, volumeRegion.width, volumeRegion.height);
        ctx.stroke();
        //drawLines(ctx, [{ direction: 'H', position: .50, color: 'lightgray'}]);
        var maxVolume = 0;

        filteredData.each(function (val, arr, i) {
            maxVolume = Math.max(maxVolume, val.volume);
        });
        maxVolume *= 1.05;
        function getVolumeY(v) { return volumeRegion.height - volumeRegion.height / maxVolume * v; }
        function getVolumeX(i) { return i * (options.spaceWidth + options.barWidth) + (options.spaceWidth) * .5; }
        ctx.globalAlpha = 1;
        filteredData.each(function (val, arr, i) {
            var x = getVolumeX(i);
            var y = getVolumeY(val.volume);
            ctx.beginPath();
            ctx.rect(x, y, options.barWidth, volumeRegion.height / maxVolume * val.volume);
            ctx.fillStyle = val.close > val.open ? riseColor : fallColor;
            ctx.fill();
        });

        //画y轴
        var volumeLevel;
        var volumeUnit;
        if (maxVolume < 10000 * 100) {
            volumeLevel = 10000;
            volumeUnit = '万';
        }
        else {
            volumeLevel = 10000 * 100;
            volumeUnit = '百万';
        }

        var volumeScalers = [];
        volumeScalers.push((maxVolume / volumeLevel).toFixed(2));
        volumeScalers.push((maxVolume / 2 / volumeLevel).toFixed(2));
        volumeScalers.push(volumeUnit);
        var volumeScalerOptions = volumeOptions.yAxis;
        volumeScalerOptions.region = volumeScalerOptions.region || { x: 0 - volumeRegion.x, y: -3, width: volumeRegion.x - 3, height: volumeRegion.height };
        var volumeScalerImp = new yAxis(volumeScalerOptions);
        var volumeScalerPainter = new Painter(this.canvas.id, volumeScalerImp, volumeScalers);
        volumeScalerPainter.paint();
        ctx.restore();
        ctx.save();
    },
    onOrentationChanged: function (e) {
        var orientation = window.orientation;
        function getWidth() { return screen.width-40;/*((orientation == 90 || orientation == -90) ? screen.width : screen.height) - 40; */}
        if (typeof orientation != 'undefined') {
            setDebugMsg('orientation=' + orientation + ',getWidth=' + getWidth());
            //if(orientation == 90 || orientation == -90 || orientation == 0){
            var me = this;
            var width = getWidth();
            //var rate = width/me.canvas.width;
            me.canvas.width = width;
            var options = me.klOptions;
            var chartWidth = width - options.chartMargin.left - options.chartMargin.right;
            me.klOptions.volume.region.width =
                    me.klOptions.priceLine.region.width =
                    me.klOptions.region.width = chartWidth;
            //方向改变了，要重画controller
            me.controller = null;
            me.hasPaintPriceLine = false;
            drawKL({ start: me.dataRanges.start, to: me.dataRanges.to });
            // }
        }
    }
};
//画K线接口
function drawKL(){
	if(CurrentInstrumentID == '') return;
	if(!LoadKLineDataFinish) return;
	var MAs = [];
	//获取日均线数据
	var MAPriceWrap = $('.KL_MA_Price_Wrap');
	if(MAPriceWrap.length != 0){
		if(CurrentKLMASet == 'ma'){
			var MALen = CurrentKLMAArr.length;
			for(var i=0;i<MALen;i++){
				var MAObj = GlobalKLMAObj[CurrentKLMAArr[i]],
					name = MAObj.name,
					color = MAObj.color,
					count = MAObj.count;
				var tempMA = {
					name:name,
					color:color,
					daysCount:count
				};
				MAs.push(tempMA);
				if(MAPriceWrap.find('span[name='+name+']').length == 0){
					var htmlFrag = '<span type="MA" name="'+name+'" style="margin-left:10px;color:'+color+';">'+name+':</span><span style="color:'+color+';" name="price"></span>';
					MAPriceWrap.append($(htmlFrag));
				}
			}	
		}else if(CurrentKLMASet == 'boll'){
			for(var i=0;i<CurrentKLBOOLArr.length;i++){
				var boll = CurrentKLBOOLArr[i],
					bollName = boll.name,
					bollColor = boll.color;
				var htmlFrag = "<span type='BOLL' name='"+bollName+"' style='margin-left:10px;color:"+bollColor+"'>"+bollName+":</span>"+
					"<span name='bollSprice' style='color:"+bollColor+"'></span>";
				if(MAPriceWrap.find('span[name='+bollName+']').length ==0){
					MAPriceWrap.append($(htmlFrag));
				}
			}
		}
	}
	
	if(!KLPainter){
		var canvasObj = $('#canvasKL');
		if(canvasObj.length == 0) return;
		var canvas = canvasObj[0];
		var yAxisHt = canvasObj[0].clientHeight-40;
		var regionWidth = canvasObj[0].clientWidth;
		GlobalKLOptionObj = {
			canvasId:'canvasKL',
	        backgroundColor:'#191F26',
	        klbackgroundColor:"#191F26",
	        riseColor: '#D72F32',
	        fallColor: '#00A76A',
	        tipRiseColor:'#FF0000',
	        tipFallColor:'#00EA62',
	        normalColor: 'black',
	        priceRangeColor:'white',
	        priceSameColor:"gray",//高开低收价格一样时的颜色
	        priceSameHeight:1,//高开低收价格一样时的高度
	        //主图区域的边距
	        chartMargin:{left:45,top:0,right:0},
	        //y: 5
	        region: { x: 0, y: 0, width: regionWidth, height: yAxisHt},
	        barWidth: CurrentBarWidth, 
	        spaceWidth:CurrentBarWidth*0.4 , horizontalLineCount: 10, verticalLineCount: 7, lineStyle: 'solid', borderColor: 'gray', splitLineColor: '#252A31', lineWidth: 1,
	        MAs: MAs,//均线参数
	        bollOption: {//布林线参数
	        	n:20, //计算均线用的K线根数
	        	k:2  //阻力线和支撑线使用的标准差倍数
	        },
	        yAxis: {
	            font: '11px Arial', // region: { },
	            color: '#55616E',
	            align: 'middle',
	            fontHeight: 8,
	            textBaseline: 'top',
	            canvasId:'KL_Canvas_Y_Axis_Region',
	            region:{
	            	x:0,
	            	y:0,
	            	height:yAxisHt,//
	            	width:55
	            }
	        },
	        xAxis: {
	            font: '11px Arial', // region: { },
	            color: '#55616E',
	            align: 'right',
	            fontHeight: 8,
	            textBaseline: 'top',
	            scalerCount: 9
	        },
	        tradePointer:{
	        	tipWidth:152, //交易点Tip宽度
	        	tipOffset:4 //交易点Tip与Y线的偏移量
	        }
	    }; 
        CurrentKLObj = new kLine(GlobalKLOptionObj);
        KLPainter = new Painter('canvasKL', CurrentKLObj, GlobalKLData);
        CurrentKLObj.canvas = canvas;
        CurrentKLObj.ctx = canvas.getContext('2d');
    }else{
    	//重置K线区域的宽度和高度
    	CurrentKLObj.options.region.height = CurrentKLObj.canvas.clientHeight - 40;
    	CurrentKLObj.options.region.width = CurrentKLObj.canvas.clientWidth;
    	CurrentKLObj.options.barWidth = CurrentBarWidth;
    	CurrentKLObj.options.spaceWidth = CurrentBarWidth*0.4;
    }
	CurrentKLObj.options.MAs=MAs;
	//如果高度变化, 重画Y轴
	//if(height && KLPainter.klOptions) KLPainter.klOptions.region.height = height;
    KLPainter.paint();
}