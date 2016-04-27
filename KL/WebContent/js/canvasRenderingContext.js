//扩展2D绘图环境
//if(typeof CanvasRenderingContext2D == 'undefined') return;
var moveToFunction =CanvasRenderingContext2D.prototype.moveTo;  
CanvasRenderingContext2D.prototype.lastMoveToLocation= {};  

CanvasRenderingContext2D.prototype.moveTo =function (x, y) {  
	moveToFunction.apply(this, [x,y]);  
	this.lastMoveToLocation.x = x;  
	this.lastMoveToLocation.y = y;
};  

CanvasRenderingContext2D.prototype.dashedLineTo =  
  function (x, y, dashLength) {  
	dashLength = dashLength === undefined ? 5 :dashLength;  
	var startX = this.lastMoveToLocation.x;  
	var startY = this.lastMoveToLocation.y;  
	var deltaX = x - startX;  
	var deltaY = y - startY;  
	var numDashes = Math.floor(Math.sqrt(deltaX *deltaX  
	                          + deltaY * deltaY) /dashLength);  
	
	for (var i=0; i < numDashes; ++i) {  
	  this[ i % 2 === 0 ? 'moveTo' : 'lineTo' ]  
	     (startX + (deltaX / numDashes) * i,  
	        startY + (deltaY / numDashes) * i);  
	}  
	this.moveTo(x, y);  
};