(function(){
	$.fn.extend({
		enableDrag:function(config){
			var me = $(this);
			var header = me.find('div[name=header]');
			if(header.length === 0) return;
			function EnableDragTool(dragConfig){
				var options = {
					dragCls:null,
					dragBaseCls:null,
					dragging:false,
					startTop:null,
					startLeft:null,
					dragStartTop:null,
					dragStarteft:null
				};
				$.extend(this,options,dragConfig);
			}
			EnableDragTool.prototype={
				setDragZIndexPriority:function(){
					var dragCls = this.dragCls;
					if(dragCls === null || this.dragBaseCls === null) return;
					$('div[class^='+this.dragBaseCls+']').each(function(index,wrap){
						var className= $(wrap).attr('class');
						if(className === dragCls){
							$(wrap).css('z-index',2);
						}else{
							$(wrap).css('z-index',1);
						}
					});
				}
			};
			if(!me[0].dragTool){
				me[0].dragTool = new EnableDragTool(config);
			}
			
			header.bind('mousedown',function(){
				me[0].dragTool.startTop = Number(me.css('top').replace('px',''));
				me[0].dragTool.startLeft = Number(me.css('left').replace('px',''));
				me[0].dragTool.dragStartTop=event.clientY;
				me[0].dragTool.dragStarteft=event.clientX;
				me[0].dragTool.dragging=true;
				me[0].dragTool.setDragZIndexPriority();
				event.stopPropagation();
				event.preventDefault();
			});
			$('body').bind('mouseup',function(){
				me[0].dragTool.dragging=false;
				event.stopPropagation();
				event.preventDefault();
			});
			$('body').bind('mousemove',function(){
				var dragMark = me[0].dragTool.dragging;
				if(dragMark){
					var top = me[0].dragTool.startTop + (event.clientY - 
							me[0].dragTool.dragStartTop);
					var left = me[0].dragTool.startLeft + (event.clientX - 
							me[0].dragTool.dragStarteft);
					if(left+Number(me.width()) < window.innerWidth - 20
							&& left > 0) {
						me.css('left',left);
					};
					if(top > 0){
						me.css('top',top);
					}
					/*if(top > 0 && top+Number(me.height()) < window.innerHeight - 20){
						me.css('top',top);
					}*/
				}
				event.preventDefault();
			});
		}
	});
})();