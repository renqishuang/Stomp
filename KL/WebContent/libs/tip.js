function Tip(options) {
    extendObject(options, this);
}

Tip.prototype = {
    getElementId: function () { return this.canvas.id + '_tip'; },
    _getRightLimit: function () { return this.canvasRange.x + this.canvasRange.width-10; },
    _getLeftLimit: function () { return this.canvasRange.x+10; },
    _getTopLimit: function () { return this.canvasRange.y; },
    _getBottomLimit: function () { return this.canvasRange.y + this.canvasRange.height; },
    show: function (relativePoint, html) {
        if (relativePoint) this.relativePoint = relativePoint;
        if (html) this.innerHTML = html;
        var otip = $id(this.getElementId());
        var size = this.size;
        var offset = this.offsetToPoint;
        var position = this.position;
        var relativePoint = this.relativePoint;
        var canvasPosition = getPageCoord(this.canvas);
        var y = position.y || relativePoint.y;
        var x = position.x || relativePoint.x;
        var tipX = 0;
        var tipY = 0;
        //console.log(this.canvasRange);
        //console.log("otip is exist");
        //console.log(otip);
        //console.log("offset->"+offset);
        //console.log("position.x-->"+position.x)
        if (position.x) tipX = position.x;
        else {
            if (otip) {
            	//console.log("otip.style.left->"+otip.style.left);
                var currentX = 0;
                //console.log("currentX->"+currentX+"--x:"+x);
                if(otip.currentOffsetDirect === 'right'){
                	var leftTopPointX = x + offset;
                	if(leftTopPointX > this._getRightLimit()-size.width){
                    	currentX = x - offset - size.width - offset;
                    	otip.currentOffsetDirect = "left";
                    }else{
                    	currentX = leftTopPointX;
                    }
                }else{
                	var leftTopPointX= x-offset-size.width;
                	//console.log(leftTopPointX);
                	if(leftTopPointX < this._getLeftLimit()){
                		currentX = x + offset;
                		otip.currentOffsetDirect = "right";
                	}else{
                		currentX = leftTopPointX-offset;
                	}
                }
                
                tipX = currentX
               /* var currentX = parseInt(otip.style.left) + offset - canvasPosition.x;
                if (currentX > x) {//如果Tip在交叉线的右侧   x是交叉点的X坐标
                	//offset是Tip与交叉竖线的水平距离
                	//Tip的右上角的X坐标 
                    if (offset + x + size.width > this._getRightLimit()) {
                       //currentX = x - offset - size.width;
                       currentX = x - offset - size.width;
                    } else {
                        currentX = x + offset;
                        currentOffsetDirect = "right";
                    }
                } else {
                    if (x - offset - size.width > this._getLeftLimit()) {
                        currentX = x - 10 - offset - size.width;
                    } else {
                        currentX = x + offset;
                        currentOffsetDirect = "right";
                    }
                }
                tipX = currentX;*/
            } else {
            	//交叉点的X坐标 + Tip与交叉点的距离
                tipX = x + offset;
                if (tipX > this._getRightLimit()) {
                    tipX = x - offset - size.width;
                }
            }
        }

        tipY = position.y;
        /*if (position.y) tipY = position.y;
        else {
            if (otip) {
                var currentY = parseInt(otip.style.top) - canvasPosition.y;
                //��ʾ���������ұ�
                if (currentY > y) {
                    if (offset + y + size.height > this._getBottomLimit()) {
                        currentY = y - offset - size.height;
                    } else {
                        currentY = y + offset;
                    }
                } else {
                    if (y - offset - size.height > this._getTopLimit()) {
                        currentY = y - offset - size.height;
                    } else {
                        currentY = y + offset;
                    }
                }
                tipY = currentY;
            } else {
                tipY = y + offset;
                if (tipY > this._getBottomLimit()) {
                    tipY = y - offset - size.height;
                }
            }
        }*/


        if (!otip) {
            otip = document.createElement('DIV');
            otip.id = this.getElementId();
            otip.currentOffsetDirect= 'right';
            //otip.setAttribute('currentOffsetDirect', "right");
            var opacity = this.opacity || 100;
            //cssText是直接设置属性值 如: style.cssText = 'color:red;';
            otip.style.cssText = '-moz-opacity:.' + opacity + '; filter:alpha(opacity='
                + opacity + '); opacity:' + (opacity / 100) + ';pointer-events:none;line-height:18px;font-family:Arial,"����";font-size:9pt;';
            otip.style.position = 'absolute';
            otip.style.zIndex = 4 + (this.canvas.style.zIndex || 1);
            otip.style.color="white";
            otip.style.backgroundColor = 'transparent';
            otip.style.border = '1px solid white';
            otip.style.width = this.size.width + 'px';
            otip.style.height = this.size.height + 'px';
            //otip.prevent
            if (this.cssClass) otip.className = this.cssClass;
            document.body.appendChild(otip);
        }
        
        tipX = canvasPosition.x + tipX;
        tipY = canvasPosition.y + tipY;
        //console.log("Tip left : "+tipX+"--canvas position->"+canvasPosition.x);
        otip.style.left = tipX + 'px';
        otip.style.top = tipY + 'px';
        otip.style.display = 'block';
        otip.currentTipX = tipX;
        otip.currentTipY = tipY;
        otip.innerHTML = this.innerHTML;
        otip.isShow = true;
        //otip.currentOffsetDirect= currentOffsetDirect;
    },
    hide: function () {
        var o = $id(this.getElementId());
        if(!o) return;
        if (o) o.style.display = 'none';
        if(o.isShow) o.isShow = false;
        this.hideYPriceTip();
    },
    update: function (relativePoint, html) {
    	//如果交叉点的坐标不变, 不需要移动Tip
    	if(relativePoint.x == this.relativePoint.x && 
    			relativePoint.y == this.relativePoint.y){
    		return;
    	}
        this.relativePoint = relativePoint;
        this.innerHTML = html;
        this.show();
    },
    updateHtml:function(html){
    	this.innerHTML = html;
    }
};