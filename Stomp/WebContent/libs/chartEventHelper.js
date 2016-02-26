function disableBubbleAndPreventDefault(e) {
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
}

function setTouchEventOffsetPosition(e, relativePoint) {
    e = e || event;
    if (e.touches && e.touches.length) {
        e = e.touches[0];
    } else if (e.changedTouches && e.changedTouches.length) {
        e = e.changedTouches[0];
    }
    
    var offsetX, offsetY;
    offsetX = e.pageX - relativePoint.x;
    offsetY = e.pageY - relativePoint.y;
    return { offsetX: offsetX, offsetY: offsetY };
}
//定义交叉线和Tip管理器类
function crossLinesAndTipMgr(canvas, options) {
    if (typeof Tip != 'function') {
        window.Tip = function () { };//定义提示类
        window.Tip.prototype = { show: function () { }, hide: function () { }, update: function () { } };
    }
    this.canvas = canvas;
    this.options = options;
}

crossLinesAndTipMgr.prototype._removeTipAndCrossLines = function () {
    //var canvas = this.canvas;
    var me = this;
    if (me.tip) me.tip.hide();   //隐藏Tip提示
    if (me.clsMgr) me.clsMgr.removeCrossLines(); //移出交叉线
};
crossLinesAndTipMgr.prototype.updateOptions = function (options) {
    this.options = options;
};
//鼠标移入事件
crossLinesAndTipMgr.prototype._onMouseOrTouchMove = function (ev) {
	//console.log("move----------");
    ev = ev || event;
    ev = getOffset(ev);//获取光标的偏移量
    var me = this;
    var options = me.options;
    var canvas = me.canvas;
    var canvasPosition = getPageCoord(canvas); //获取Canvas相对于页面的偏移量x,y
    var range = options.triggerEventRanges;   //获取事件范围区域    x,y,width,height
    /**
     * 移出交叉线及Tip的判断条件
     * X偏移量
     * 	    < 事件的X坐标
     * 		> 事件的X坐标 + width
     * Y偏移量
     * 		< 事件的Y坐标
     * 		> 事件的Y坐标 + height
     */  
    //console.log("触发移动");
    if (ev.offsetX < range.x || ev.offsetX > range.x + range.width
            || ev.offsetY < range.y || ev.offsetY > range.y + range.height) {
        me._removeTipAndCrossLines();
        return;
    }
    //console.log("为什么没有返回值");  //交叉线本身也有鼠标事件, 交叉线的鼠标事件没有冒泡 , 导致Canvas的鼠标事件没有触发;
    var crossPoint = options.getCrossPoint(ev);
    //console.log("交叉点坐标: "+crossPoint.x+"->"+crossPoint.y);
    var crossLinesOptions = {
        crossPoint: crossPoint,
        verticalRange: { y1: range.y, y2: range.y + range.height },
        horizontalRange: { x1: range.x, x2: range.x + range.width },
        color: options.crossLineOptions.color,
        canvas: canvas
    };
    if (!me.clsMgr) {
        var clsMgr = new crossLines(crossLinesOptions);
        clsMgr.setMouseEvents(function (evHLine) {
        	//console.log("触发水平线移动事件");
            evHLine = evHLine || event;
            evHLine = getOffset(evHLine);
            var translatedEv = { offsetX: evHLine.offsetX + range.x, offsetY: parseInt(me.clsMgr.getHLine().style.top) - canvasPosition.y };
            var point = options.getCrossPoint(translatedEv);
            clsMgr.updateCrossPoint(point);
            if (me.tip) {
                me.tip.update(point, options.tipOptions.getTipHtml(translatedEv));
            }
        }, function (evl) {
        	//console.log("触发垂直线移动事件");
            evl = evl || event;
            evl = getOffset(evl);
            var translatedEv = { offsetX: parseInt(me.clsMgr.getVLine().style.left) - canvasPosition.x, offsetY: evl.offsetY + range.y };
            var point = options.getCrossPoint(translatedEv);
            clsMgr.updateCrossPoint(point);
            if (me.tip) {
                me.tip.update(point, options.tipOptions.getTipHtml(translatedEv));
            }
        });

        me.clsMgr = clsMgr;
    } else {
        me.clsMgr.updateOptions(crossLinesOptions);
    }
    me.clsMgr.drawCrossLines();
    if (options.tipOptions) {
        var tipOp = options.tipOptions;
        if (!me.tip) {
            var tip = new Tip({
                position: { x: tipOp.position.x || false, y: tipOp.position.y || false },
                size: tipOp.size,
                opacity: tipOp.opacity || 80,
                cssClass: tipOp.cssClass,
                offsetToPoint: tipOp.offsetToPoint || 10,
                relativePoint: { x: crossPoint.x, y: crossPoint.y },
                canvas: canvas,
                canvasRange: options.triggerEventRanges,
                innerHTML: tipOp.getTipHtml(ev)
            });
            me.tip = tip;
        }

        //me.tip.show(crossPoint, tipOp.getTipHtml(ev));
    }
};

crossLinesAndTipMgr.prototype._touchstart = function (e) {
    e = e || event;
    disableBubbleAndPreventDefault(e);
    var src = e.srcElement || e.target || e.relatedTarget;
    this.touchstartTime = new Date();
};
crossLinesAndTipMgr.prototype._touchmove = function (e) {
    e = e || event;
    disableBubbleAndPreventDefault(e);

    var canvas = this.canvas;

    var relativePoint = getPageCoord(canvas);
    var src = e.srcElement || e.target || e.relatedTarget;
    var fixedEvt = setTouchEventOffsetPosition(e, relativePoint);

    this._onMouseOrTouchMove(fixedEvt);
};

crossLinesAndTipMgr.prototype._touchend = function (e) {
    e = e || event;
    disableBubbleAndPreventDefault(e);
    var src = e.srcElement || e.target || e.relatedTarget;
    var canvas = this.canvas;
    var fixedEvt = setTouchEventOffsetPosition(e, getPageCoord(canvas));
    this._removeTipAndCrossLines();

    var time = new Date();
    var ts = time.getTime() - this.touchstartTime.getTime();
    if (ts < 200) {
        if (typeof this.options.onClick == 'function') this.options.onClick();
    }
};
//鼠标移出事件
crossLinesAndTipMgr.prototype._mouseout = function (ev) {
    var e = ev || event;
    ev = getOffset(e);
    var me = this;
    var range = me.options.triggerEventRanges;
    if (ev.offsetX <= range.x || ev.offsetX >= range.x + range.width
            || ev.offsetY <= range.y || ev.offsetY >= range.y + range.height) {
        me._removeTipAndCrossLines();
        return;
    }

    var toEle = e.toElement || e.relatedTarget || e.target;
    
    if (toEle) {
        if (toEle == me.canvas) return;
        if (toEle == me.clsMgr.getHLine() || toEle == me.clsMgr.getVLine()) return;
        me._removeTipAndCrossLines();
    }
};

crossLinesAndTipMgr.prototype.addCrossLinesAndTipEvents = function () {
    var canvas = this.canvas;
    var options = this.options;
    var canvasPosition = getPageCoord(canvas);
    console.log("canvasPosition");
    console.log(canvasPosition);
    if (canvas.addCrossLinesAndTipEvents == true) return;
    canvas.addCrossLinesAndTipEvents = true;

    var touchable = isTouchDevice();
    var me = this;
    if (touchable) {
        addEvent(canvas, 'touchstart', function (ev) { me._touchstart.call(me, ev); });

        addEvent(canvas, 'touchmove', function (ev) { me._touchmove.call(me, ev); });

        addEvent(canvas, 'touchend', function (ev) { me._touchend.call(me, ev); });
    }
    else {
        addEvent(canvas, 'mouseout', function (ev) { me._mouseout.call(me, ev); });

        addEvent(canvas, 'mousemove', function (ev) { me._onMouseOrTouchMove.call(me, ev); });

        if (typeof options.onClick == 'function') {
            addEvent(canvas, 'click', options.onClick);
        }
    }
};

function addCrossLinesAndTipEvents(canvas, options) { 
    if(!canvas.crossLineAndTipMgrInstance){
        canvas.crossLineAndTipMgrInstance = new crossLinesAndTipMgr(canvas, options);
        canvas.crossLineAndTipMgrInstance.addCrossLinesAndTipEvents();
    }
}