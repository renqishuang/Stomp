function crossLines(options) {
    this.updateOptions(options);
}

crossLines.prototype = {
    updateOptions: function (options) {
        this.canvas = options.canvas;
        this.canvasId = this.canvas.id;
        this.horizontalDivId = this.canvasId + '_crossLines_H';
        this.verticalDivId = this.canvasId + '_crossLines_V';
        this.verticalRange = options.verticalRange || { y1: 0, y2: this.canvas.height };
        this.horizontalRange = options.horizontalRange || { x1: 0, x2: this.canvas.width };
        this.canvasPosition = getPageCoord(this.canvas);
        this.crossPoint = options.crossPoint;
        this.color = options.color || 'black';
    },
    removeCrossLines: function () {
        var canvas = this.canvas;
        var canvasId = canvas.id;
        var horizontalDivId = canvasId + '_crossLines_H';
        var verticalDivId = canvasId + '_crossLines_V';
        var lineX = $id(horizontalDivId);
        if (lineX) lineX.style.display = 'none';
        var lineY = $id(verticalDivId);
        if (lineY) lineY.style.display = 'none';
    },

    getHLine: function () {
        return $id(this.horizontalDivId);
    },
    getVLine: function () {
        return $id(this.verticalDivId);
    },
    setMouseEvents: function (evtForHLine, evtForVLine) {
        this.hLineMouseEvt = evtForHLine;
        this.vLineMouseEvt = evtForVLine;
    },
    updateCrossPoint: function (point) {
        this.crossPoint = point;
        this.drawCrossLines();
    },
    drawCrossLines: function () {
        var canvas = this.canvas;
        var canvasId = this.canvas.id;
        var horizontalDivId = canvasId + '_crossLines_H';
        var verticalDivId = canvasId + '_crossLines_V';
        var vertialRange = this.verticalRange || { y1: 0, y2: canvas.height };
        var horizontalRange = { x1: 0, x2: canvas.clientWidth };
        this.horizontalRange = { x1: 0, x2: canvas.clientWidth };
        var canvasPosition = this.canvasPosition;

        if (this.crossPoint.x < horizontalRange.x1
            || this.crossPoint.x > horizontalRange.x2
            || this.crossPoint.y < vertialRange.y1
            || this.crossPoint.y > vertialRange.y2) {
            this.removeCrossLines();
            return;
        }


        var zIndex = (canvas.style.zIndex || 1) + 1;
        
        var exists = false;
        var hLine;
        if ($id(horizontalDivId)) {
            exists = true;
            hLine = $id(horizontalDivId);
        }
        else {
            hLine = document.createElement('DIV');
            hLine.id = horizontalDivId;
        }
        hLine.style.cssText='pointer-events:none;';
        hLine.style.display = 'block';
        hLine.style.position = 'absolute';
        hLine.style.width = Math.round(horizontalRange.x2 - horizontalRange.x1) + 'px';
        hLine.style.height = '1px';
        //console.log("水平线距离顶部的长度:"+this.crossPoint.y);
        hLine.style.left = Math.round(canvasPosition.x + horizontalRange.x1) + 'px';
        hLine.style.top = Math.round(this.crossPoint.y + canvasPosition.y) + 'px';
        hLine.style.backgroundColor = this.color;
        hLine.style.zIndex = zIndex;
        if (!exists) {
            document.body.appendChild(hLine);
            if (typeof this.hLineMouseEvt == 'function') {
                addEvent(hLine, 'mouseover', this.hLineMouseEvt);
                addEvent(hLine, 'mousemove', this.hLineMouseEvt);
            }
        }


        //����ֱ��
        exists = false;
        var vLine;
        if ($id(verticalDivId)) {
            exists = true;
            vLine = $id(verticalDivId);
        }
        else {
            vLine = document.createElement('DIV');
            vLine.id = verticalDivId;
        }
        
        vLine.style.cssText='pointer-events:none;';
        vLine.style.display = 'block';
        vLine.style.position = 'absolute';
        vLine.style.height = Math.round(vertialRange.y2 - vertialRange.y1) + 'px';
        vLine.style.width = '1px';
        //vLine.style.left = Math.round(this.crossPoint.x + canvasPosition.x) + 'px';
        //不知道为什么会有0.5px的偏差，在这里手动减去0.5px
        vLine.style.left = (this.crossPoint.x + canvasPosition.x - 0.5) + 'px';
        vLine.style.top = Math.round(vertialRange.y1 + canvasPosition.y) + 'px';
        vLine.style.backgroundColor = this.color;
        vLine.style.index = zIndex;
        if (!exists) {
            document.body.appendChild(vLine);
            if (typeof this.vLineMouseEvt == 'function') {
                addEvent(vLine, 'mouseover', this.vLineMouseEvt);
                addEvent(vLine, 'mousemove', this.vLineMouseEvt);
            }
        }
    }
};