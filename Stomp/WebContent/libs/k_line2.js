//根据日期转换成日期字符整数 
function converDateStrByDate(date){
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	if(month < 10) month ="0"+month;
	if(day < 10) day = "0"+day;
	return parseInt(year+""+month+""+day);
}

//日期转换  根据时间串,分离出年月日 如(20160215)
function convertDate(val, withWeek) {
    var year = Math.ceil(val / 10000) - 1;//ceil向上取整數天花板数
    var day = val % 100;
    var month = (Math.ceil(val / 100) - 1) % 100;
    var d = new Date();
    d.setYear(year);
    d.setMonth(month - 1);
    d.setDate(day);//设置一个月的某一天
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (withWeek) {
        var weekNames = ['日', '一', '二', '三', '四', '五', '六'];
        //Date.getDay()返回星期中的某一天, 返回0~6之间的数, 0表示星期日
        var time = year + '-' + month + '-' + day + '(星期' + weekNames[d.getDay()] + ')';
        return time;
    }
    else {
    	//console.log("年->"+year+"月->"+month+"日->"+day);
        return year + '-' + month + '-' + day;
    }
}

/**
 * 计算日均线价格
 * ks:所有的数据
 * startIndex 屏幕显示数据的开始索引
 * count 屏幕显示数据的个数
 * daysCn  日均线天数
 */
function calcMAPrices(ks, startIndex, count, daysCn) {
    var result = new Array();
    for (var i = startIndex; i < startIndex + count; i++) {
        var startCalcIndex = i - daysCn + 1;
        if (startCalcIndex < 0) {
            result.push(false);
            continue;
        }
        var sum = 0;
        for (var k = startCalcIndex; k <= i; k++) {
            sum += ks[k].close;
        }
        var val = sum / daysCn;
        result.push(val);
    }
    return result;
}
//定时器
var timer = {
    start:function(step){this.startTime = new Date();this.stepName = step;},
    stop:function(){
        var timeSpan = new Date().getTime() - this.startTime.getTime();
        setDebugMsg(this.stepName + '耗时' + timeSpan+'ms');
    }
};
//定义kLine类
function kLine(options) {
    this.options = options;
    this.dataRanges = null;
}

kLine.prototype = {
    initialize: function (painter) {
    	this.candleMinHeight = 3;//蜡烛的默认最小高度
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
    
    //添加一跟K线图
    addCandleToKL:function(item){
    	console.log("添加新数据");
		GlobalKLData.ks.push(item);
    },
    
    //修改全局KL数据的最后一条数据
    updateGlobalKLLastDt:function(item){
    	GlobalKLData.ks[GlobalKLData.ks.length-1] = item;
    },
    
    //获取同时显示的KL数据的个数
    getShowKLDataCount:function(){
    	var options = this.options;
    	var region = options.region;
    	var dataCount = Math.ceil(region.width / (options.spaceWidth + options.barWidth))-1;
    	return dataCount;
    },
    //根据X坐标获取蜡烛的索引,并获取数据, 显示到Tip里面
    getTipHtml: function(x){
    	var data = this.getKLStore();
    	var maxLength = this.getMaxDataLength();
    	var index = this.dataRanges.start + this.getIndex(x);
        if (index >= maxLength) index = maxLength - 1;
        if (index < 0) index = 0;
        var ki = data.ks[index];
        //console.log("更新Tip时的数据如下:");
        //console.log("open:"+ki.open+",high:"+ki.high+",low:"+ki.low+",close"+ki.close);
        var tipHtml = '<div><b>' + convertDate(ki.quoteTime) + '</b></div>' +
        //'昨收价：<font color="' + getPriceColor(ki, ki.preClose) + '">' + toMoney(ki.preClose) + '</font><br/>' +
        '开盘价：<font color="' + this.getPriceColor(ki, "open") + '">' + toMoney(ki.open) + '</font><br/>' +
        '最高价：<font color="' + this.getPriceColor(ki, "high") + '">' + toMoney(ki.high) + '</font><br/>' +
        '最低价：<font color="' + this.getPriceColor(ki, "low") + '">' + toMoney(ki.low) + '</font><br/>' +
        '收盘价：<font color="' + this.getPriceColor(ki, "close") + '">' + toMoney(ki.close) + '</font><br/>';
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
    	console.log("数据总个数: "+dataCount);
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
    	var result = i * (options.spaceWidth + options.barWidth) + (options.spaceWidth + options.barWidth) * .5; 
    	if (result * 10 % 10 == 0) result += .5; 
    	//console.log("蜡烛的X坐标: "+result);
    	return result; 
    },
    
    //根据蜡烛的索引获取蜡烛的X坐标  相对于Body坐标   这个方法用于更新单个蜡烛
    getCandleXByIndexForUpdate:function(i){
    	var options = this.options;
    	var left = options.chartMargin.left;
    	var result = i * (options.spaceWidth + options.barWidth) + (options.spaceWidth + options.barWidth) * .5; 
    	if (result * 10 % 10 == 0) result += .5;
    	result += left;
    	//console.log("蜡烛的X坐标: "+result);
    	return result; 
    },
    
    //根据价格获取Y坐标 用于整体画图
    getYCoordByPrice:function(price){
    	var options = this.options;
        var region = options.region;//绘制K线图的矩形区域(起点x,y坐标,宽度,高度)
        //console.log(this.high+"-painter.high-low:-"+this.low);
    	var y = (this.high - price) * region.height / (this.high - this.low);
    	//y += this.verticalSpaceHeight;//最上边第二个点才是最大值
    	return y; 
    },
    
    //根据价格获取Y坐标 用于单个K线更新
    getYCoordByPriceForUp:function(price){
    	var options = this.options;
        var region = options.region;//绘制K线图的矩形区域(起点x,y坐标,宽度,高度)
        //console.log(this.high+"-painter.high-low:-"+this.low);
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
    	var painter = this.painter;
    	var index = this.getIndex(x);
        //console.log("get X index -> "+index);
    	var offsetX = region.x + options.spaceWidth * (index + 1) + options.barWidth * index + 
    		options.barWidth * .5;
    	//console.log("offset x for x: "+offsetX);
        return offsetX; 
    },
    //更新一跟K线图
    updateKLOnCandle:function(item,updateType){
    	//如果更新的数据的最大值和最小值 与 当前Y轴最大值和最小值不匹配, 那么重新画图
    	this.updateGlobalKLLastDt(item);
    	if(item.high+this.priceGap > this.high || item.low-this.priceGap < this.low){
    		this.high = Math.max(this.high,item.high+this.priceGap);
    		this.low = Math.min(this.low,item.low-this.priceGap);
    		drawKL();
    	}
    	var options = this.options;
    	var region = options.region;
		var candleIndex = this.getIndexForLastCandle();
		console.log("最后的索引"+candleIndex);
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
    	var painter = this.painter;
    	var ctx = painter.ctx;
    	 var isRise = ki.close > ki.open;
         var color = isRise ? riseColor : fallColor;
		 var priceRangeColor = options.priceRangeColor;
         var lineX = this.getCandleXByIndexForUpdate(i);
         console.log("最后一根K线的X坐标: "+lineX);
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
            		 options.region.y+1,options.barWidth+0.5,options.region.height-1);
             ctx.beginPath();
             ctx.fillStyle = options.klbackgroundColor;
             ctx.fillRect(lineX-options.barWidth/2,
            		 options.region.y+1,options.barWidth+0.5,options.region.height-1);
             //重画蜡烛所在矩形的水平线
             var spaceHeight = options.region.height / (options.horizontalLineCount + 1);
             //console.log(spaceHeight);
             for (var j = 1; j <= options.horizontalLineCount; j++) {
                 var y = spaceHeight * j+options.chartMargin.top;
                 if (y * 10 % 10 == 0) y += .5;
                 //console.log(y);
                 painter.drawHLine(options.splitLineColor, lineX-options.barWidth/2, y, options.barWidth, 1, options.lineStyle);
             }
             ctx.stroke();
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
         } else {
         	//console.log("不需要画蜡烛");
             ctx.strokeStyle = color;
             //画线
             ctx.beginPath();
             ctx.moveTo(lineX, topY);
             ctx.lineTo(lineX, bottomY);
             ctx.stroke();
         }
         
         //重画日均线  暂时有5,10,15等3条日均线
         var tempData = [];
         var tempTwoData = this.getKLStore().ks[this.getMaxDataLength()-2];
         tempData.push(tempTwoData);
         tempData.push(ki);
         this.paintMAs(tempData,"update");
    },
    
    start: function () {
        //timer.start('start');
        var canvas = this.canvas;
        var ctx = this.ctx;
        this.painting = true;
        var options = this.klOptions;
        var clearPart = { width: canvas.width, height: options.priceLine.region.y - 3 };
      	//在canvas内部清空出一个矩形, 用于K线(清空出的矩形背景颜色和canvas的一样)
        ctx.clearRect(0, 0, clearPart.width, clearPart.height);
        ctx.save();//保存一次状态
        window.riseColor = options.riseColor;
        window.fallColor = options.fallColor;
        window.normalColor = options.normalColor;
        if (options.backgroundColor && !this.drawnBackground) {
            ctx.beginPath();//开始一条路径或重置当前路径
            //填充颜色
            ctx.fillStyle = options.backgroundColor;
            //绘制矩形
            ctx.rect(0, 0, clearPart.width, clearPart.height);
            ctx.fill();//填充颜色
            //ctx.closePath();
            this.drawnBackground = true;//已经绘制过背景
        }
        //重置左上角的坐标
        ctx.translate(options.region.x, options.region.y);
        ctx.strokeStyle = options.borderColor;//边框样式
        ctx.beginPath();
        ctx.fillStyle=options.klbackgroundColor;//
        ctx.fillRect(0, 0, options.region.width, options.region.height);
        ctx.stroke();//绘制已定义的路径
        
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
        //timer.stop();
    },
    end: function () {
        //this.ctx.restore();
        var me = this;
        var options = me.options;
        var region = options.region;
        var volumeRegion = options.volume.region;
        var painter = me.painter;
        console.log("是否存在交叉线对象实例:"+me.crossLineAndTipMgrInstance);
        if(!me.crossLineAndTipMgrInstance){//创建交叉线及Tip实例对象
        	//crossLinesAndTipMgr在 chartEventHelper.js中
            me.crossLineAndTipMgrInstance = new crossLinesAndTipMgr(painter.canvas, {
            	//获取交叉点坐标
                getCrossPoint: function (ev) { 
                	//console.log("新创建对象的方法");
                	//console.log({ x: getX(ev.offsetX), y: ev.offsetY });
                	return { x: me.getX(ev.offsetX), y: ev.offsetY };
                },
                //触发事件的范围
                triggerEventRanges: { x: region.x, y: region.y + 1, width: region.width, 
                	//height: volumeRegion.y + volumeRegion.height - region.y 
                	height: region.y + region.height -20
                },
                //Tip属性
                tipOptions: {
                    getTipHtml: function (ev) { return me.getTipHtml(ev.offsetX); },
                    size:{width:120,height:150},
                    position:{x:false,y:region.y+(region.height-150)/3}, //position中的值是相对于canvas的左上角的
                    opacity:80,
                    cssClass:'',
                    offsetToPoint:10
                },
                crossLineOptions: {
                    color: 'white'
                }
            });
            me.crossLineAndTipMgrInstance.addCrossLinesAndTipEvents();
        }
        else {
            me.crossLineAndTipMgrInstance.updateOptions({
                getCrossPoint: function (ev) {
                	//console.log("已存在对象的方法");
                	return { x: me.getX(ev.offsetX), y: ev.offsetY }; 
                },
                triggerEventRanges: { x: region.x, y: region.y + 1, width: region.width, height: volumeRegion.y + volumeRegion.height - region.y },
                tipOptions: {
                    getTipHtml: function (ev) { return me.getTipHtml(ev.offsetX); },
                    size:{width:120,height:150},
                    position:{x:false,y:region.y+(region.height-150)/3}, //position中的值是相对于canvas的左上角的
                    opacity:80,
                    cssClass:'',
                    offsetToPoint:10
                },
                crossLineOptions: {
                    color: 'white'
                }
                });
        }
		//控制器部分
        /*if (me.controller == null) {
            me.implement.paintPriceLine.call(me);//画价格线
            var controllerOptions = options.controller;
            var id = me.canvas.id + '_controller';
            var controllerCanvas = $id(id);
            console.log("控制器部分");
            console.log(controllerCanvas);
            var exists = $id(id) != null;
            if (!exists) {
                controllerCanvas = document.createElement('CANVAS');
                controllerCanvas.id = id;
                document.body.appendChild(controllerCanvas);
            }
            var priceRegion = me.klOptions.priceLine.region;
            //setDebugMsg('priceRegion.width=' + priceRegion.width);
            controllerCanvas.width = priceRegion.width;
            controllerCanvas.height = priceRegion.height;
            var canvasPosition = getPageCoord(me.canvas);
            controllerCanvas.style.left = canvasPosition.x + priceRegion.x + 'px';
            controllerCanvas.style.top = canvasPosition.y + priceRegion.y + 'px';
            controllerCanvas.style.position = 'absolute';
            controllerCanvas.style.zIndex = (me.canvas.style.zIndex ? me.canvas.style.zIndex : 1) + 1;
            controllerCanvas.style.display = 'block';
            var c = new controller(controllerCanvas.id, {
                region: { x: 0, y: 0, width: controllerCanvas.width, height: controllerCanvas.height },
                bar: controllerOptions.bar || { width: 20, height: 35, borderColor: 'black', fillColor: 'snow' },
                value: { left: me.dataRanges.start, right: me.dataRanges.to },
                minBarDistance: controllerOptions.minBarDistance || 20,
                onPositionChanged: function (changeToValue) {
                    timer.start('drawKL');
                    drawKL({ start: changeToValue.left, to: changeToValue.right });
                    timer.stop();
                    me.controller.drawControllerPart();
                },
                prePaint: function (ctx) {
                },
                touchFaultTolerance:20
            });
            //在原图上画出控制器部分
            this.controller = c;
            c.drawControllerPart();
            c.addControllerEvents();
        } else if (me.requestController) {
            me.requestController = false;
            var c = this.controller;
            c.drawControllerPart();
            c.addControllerEvents();
        }

        if (!me.addOrentationChangedEvent) {
            me.addOrentationChangedEvent = true;

            addEvent(window, 'orientationchange', function (ev) {
                me.requestController = true;
                me.implement.onOrentationChanged.call(me);
            });
        }*/

        me.painting = false;
    },
    //设置屏幕显示的K线的数据范围
    setDataRange: function(){
    	//绘制K线图的矩形区域(起点x,y坐标,宽度,高度)
    	var options = this.options;
        var region = options.region;
        var maxDataLength = this.getMaxDataLength();//所有数据的个数
        var dataCount = this.getShowKLDataCount();//同时显示的数据个数
        if (dataCount > maxDataLength) dataCount = maxDataLength;
		var startData = 100 * (maxDataLength - dataCount) / maxDataLength;
		console.log("数据的开始索引:"+startData);
		var startIndex = Math.ceil(startData / 100 * maxDataLength);
		console.log("计算后的数据开始索引:"+startIndex);
		var toIndex = Math.ceil(100 / 100 * maxDataLength) + 1;
        if (toIndex >= maxDataLength) toIndex = maxDataLength - 1;
        console.log("计算后的数据结束索引:"+toIndex);
        this.dataRanges = {
            start: startIndex,
            to: toIndex
        };
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
        console.log("当数据范围变化时,需要重新计算蜡烛的宽度");
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
    
    //画一跟蜡烛
    drawCandle: function(ki, i){
    	var options = this.options;
    	var painter = this.painter;
    	var ctx = painter.ctx;
        var region = options.region
    	var isRise = ki.close > ki.open;
        var color = isRise ? riseColor : fallColor;
		var priceRangeColor = options.priceRangeColor;
        var lineX = this.getCandleXByIndex(i);
        var currentX = this.currentX;
        //console.log("获取蜡烛的X轴坐标");
        // console.log(lineX);
        if (currentX == 0) currentX = lineX;
        else {
            if (lineX - currentX < 1) return;
        }
        if(lineX*10%10 == 0) lineX += 0.5;
        currentX = lineX;
        console.log("蜡烛中心线的X坐标");
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
    
    //画K线及移动平均线
    paintItems: function () {
    	var me = this;
    	var painter = this.painter;
        var ctx = painter.ctx;
        var options = this.options;
        var region = options.region;//绘制K线图的矩形区域(起点x,y坐标,宽度,高度)
        var maxDataLength = this.getMaxDataLength();//所有数据的个数
        console.log("数据总个数:"+maxDataLength);
        var needCalcSpaceAndBarWidth =  false;//是否需要计算蜡烛和空隙的宽度
        this.setDataRange();
        var startIndex = this.dataRanges.start;
        var toIndex = this.dataRanges.to;
        var itemsCount = toIndex - startIndex + 1;
        console.log("结算后的数据项个数:"+itemsCount);
        //this.needCalcSpaceAndBarWidth();//是否需要重新计算蜡烛和空隙的宽度
		//过滤数据(获取显示到页面上的数据)
        var filteredData = [];
        for (var i = startIndex; i <= toIndex && i < maxDataLength; i++) {
            filteredData.push(me.getKLStore().ks[i]);
        }
        this.filteredData = filteredData;
        //console.log("显示到页面的数据如下:");
        //console.log(filteredData);
        var high, low;
        filteredData.each(function (val, a, i) {
            if (i == 0) { high = val.high; low = val.low; }
            else { high = Math.max(val.high, high); low = Math.min(low, val.low); }
        });

//        this.high = Math.max(high,3000.1);
//        this.low = Math.min(low,2960.3);
        this.high = high;
        this.low = low;
        var priceIncrease = me.caclPriceIncrease(high,low);
        this.high += priceIncrease;
        this.low -= priceIncrease;
        console.log("最高价:"+high+",最低价:"+low);
        
        //计算垂直空隙高度
//        var spaceHeight = options.region.height / (options.horizontalLineCount + 1);
//        this.verticalSpaceHeight = Number(spaceHeight.toFixed(1));
        
        //timer.start('paintItems:移动均线');
        //画移动平均线
        this.paintMAs(filteredData,"global");
        //timer.stop();
        //timer.start('paintItems:画柱');
        this.currentX = 0;  //做逻辑 
        //画蜡烛
        for(var i=0;i<filteredData.length;i++){
        	me.drawCandle(filteredData[i],i);
        }
        //filteredData.each(me.drawCandle);
        //timer.stop();
        //timer.start('paintItems:纵轴');
        
        var yAxisOptions = options.yAxis;
        yAxisOptions.region = yAxisOptions.region || { x: 0 - region.x, y: 0 - 3, height: region.height, width: region.x - 3 };
        console.log(yAxisOptions.region);
        //画y轴
        var yAxisImp = new yAxis(yAxisOptions);
        var yPainter = new Painter(
        	painter.canvas.id,
            yAxisImp,
            calcAxisValues(me.high, me.low, (options.horizontalLineCount + 2))
            //calcAxisValues(priceGap.add, priceGap.reduce, (options.horizontalLineCount + 2))
        );
        yPainter.paint();
        //timer.stop();
        //timer.start('paintItems:横轴');
        //画X轴
       
        var xAxisOptions = options.xAxis;
        xAxisOptions.region = { x: 0, y: region.height + 2, width: region.width, height: 20 };
        //console.log("X轴区域数据:");
        //console.log(xAxisOptions.region);
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
        var xPainter = new Painter(painter.canvas.id, xAxisImp, xScalers);
        xPainter.paint();
        // timer.stop();

        //timer.start('volume');
        //画成交量图
        /* this.implement.paintVolume.call(this, filteredData);  */
        //timer.stop();
        //画价格线                
        //this.implement.paintPriceLine.call(this);
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
    /**
     * 画日均线  move average
     * filteredData要画日均线的数据
     * paintType 画日均线的类型
     * 	  global  整体画图时调用
     * 	  update  更新一条K线时调用
     */
    paintMAs: function (filteredData,paintType) {
    	var me = this;
    	var dataRange = me.dataRanges;
    	var startCalcIndex;
    	var startIndex = dataRange.start;
    	var toIndex = dataRange.to;
    	var painter = this.painter;
        var ctx = painter.ctx;
        var options = this.options;
        var MAs = options.MAs;
        if(paintType == "global") startCalcIndex = startIndex;
        else startCalcIndex = toIndex-1;
        MAs.each(function (val, arr, index) {
            var MA = calcMAPrices(me.getKLStore().ks, startCalcIndex, filteredData.length, val.daysCount);
            console.log("计算后的日均线价格数组");
            console.log(MA);
            val.values = MA;
            MA.each(function (val, arr, i) {
                if (val) {
                    me.high = Math.max(me.high, val);
                    me.low = Math.min(me.low, val);
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
            		x = i * (options.spaceWidth + options.barWidth) + (options.spaceWidth + options.barWidth) * .5;
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

window.KLPainter=null;
window.CurrentKLObj = null;
window.CurrentDataTime = null;
window.GlobalKLData = {
	ks:[],
	high:0,
	low:0
};
//初始化数据
function initAddData(){
	for(var i=0;i<InitTestData.length;i++){
		var tempData=[];
		var dt = InitTestData[i];
		if(i == 0) {
			GlobalKLData.high = parseFloat(dt.high);
			GlobalKLData.low = parseFloat(dt.low);
		}else{
			GlobalKLData.high = Math.max(GlobalKLData.high,parseFloat(dt.high));
			GlobalKLData.low = Math.min(GlobalKLData.low,parseFloat(dt.low));
		}
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

var initialWidth = Math.min(screen.width,1024)-40;
//画K线接口
function drawKL(ranges) {
	if(!KLPainter){
	    var kOptions = {
	        backgroundColor:'#fff',
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
	        chartMargin:{left:45.5,top:20.5,right:20.5},
	        region: { x: 45.5, y: 20.5, width: initialWidth - 45.5 - 20.5, height: 210 },
	        barWidth: 10, spaceWidth: 2, horizontalLineCount: 10, verticalLineCount: 7, lineStyle: 'solid', borderColor: 'gray', splitLineColor: '#252A31', lineWidth: 1,
	        MAs: [
	            { color: '#0063CD', daysCount: 5 },
	            { color: '#FFCB34', daysCount: 10 },
	            { color: '#71DDFF', daysCount: 20 }/*,
	            { color: 'rgb(0,0,0)', daysCount: 60 }*/
	            ],
	        yAxis: {
	            font: '11px Arial', // region: { },
	            color: 'black',
	            align: 'right',
	            fontHeight: 8,
	            textBaseline: 'top'
	        },
	        xAxis: {
	            font: '11px Arial', // region: { },
	            color: 'black',
	            align: 'right',
	            fontHeight: 8,
	            textBaseline: 'top',
	            scalerCount: 9
	        },
	        volume: {
	            region: { x: 45.5, y: 290.5, height: 80, width: initialWidth - 45.5 - 20.5 },
	            horizontalLineCount: 1,
	            yAxis: {
	                font: '11px Arial', // region: { },
	                color: 'black',
	                align: 'right',
	                fontHeight: 8,
	                textBaseline: 'top'
	            }
	        },
	        priceLine: {
	            region:{ x: 45.5, y: 380.5, height: 60, width: initialWidth - 45.5 - 20.5 },
	            verticalLineCount: 7,
	            horizontalLineCount: 1, lineStyle: 'solid', borderColor: 'red', 
	            //splitLineColor: '#eeeeee',fillColor:'lightgray',alpha:.5,
	            splitLineColor: '#66FFCC',fillColor:'blue',alpha:.8,
	            yAxis: {
	                font: '11px Arial', // region: { },
	                color: 'black',
	                align: 'right',
	                fontHeight: 8,
	                textBaseline: 'top'
	            }
	        },
	        controller:{
	            bar: { width: 20, height: 35, borderColor: 'black', fillColor: 'lightgray' },
	            minBarDistance: 20
	        }
	       
	    };            
        var canvas = $id('canvasKL');
        if(!canvas) return;
        if(canvas.width != initialWidth) canvas.width = initialWidth;
        CurrentKLObj = new kLine(kOptions);
        //var kl = new kLine(kOptions);
        //var data = getKLData();
        //加载历史数据
    	initAddData();
        KLPainter = new Painter('canvasKL', CurrentKLObj, GlobalKLData);
        CurrentKLObj.painter=KLPainter;
    }
    //KLPainter.data = GlobalKLData;
    //KLPainter.dataRanges = ranges;
   // KLPainter.dataRanges = null;
    //if(GlobalKLData.length == 0) return;
    KLPainter.paint();
}