var pandelTable = $('._pandect-trade-table-all');
var tableConfig={
	dataCount:null,
	startIndex:0,
	data:UserStateAccountData,
	pageSize:13,
	uniqueMark:'a',
	useWSData:false,
	generateTr:function(){
		var table = this.table;
		var trLen = this.pageSize;
		for(var i=0;i<trLen;i++){
			var htmlFrag = '<tr><td></td>'+
								'<td name="guarantee"></td>'+
								'<td></td>'+
								'<td></td>'+
								'<td></td>'+
								'<td></td>'+
								'<td></td>'+
							'</tr>';
			table.append($(htmlFrag));
		}
	},
	setTableData:function(){
		var me = this;
		if(!this.trDtAttr || !this.trDtIndex) return;
		var trList = this.table.find('tr'),trLen = trList.length;
		for(var i=1;i<trLen;i++){
			var tr = trList.eq(i);
				tdLen = tr.find('td').length;
			tr.find('td').html('');//先清空
			tr.find('td').css('background-color','white');
			tr.attr(this.uniqueMark,'');
			var data = this.getData(),
				//dtIndex = i+this.startIndex-1,
				dtIndex = i-1;
				dt = data[dtIndex];
			if(dt){
				tr.attr(this.trDtIndex,dtIndex);
				tr.attr(this.uniqueMark,dt[this.uniqueMark]);//必须赋值tr唯一标识属性
				tr.attr(this.trDtAttr,JSON.stringify(dt));
				tr.find('td:nth-child(1)').html(dt.aid);
				tr.find('td:nth-child(2)').html(dt.ratio);
				tr.find('td:nth-child(2)').css('background-color',dt.color);
				tr.find('td:nth-child(3)').html(dt.enable===1 ? '允许' : '禁止');
				tr.find('td:nth-child(4)').html(dt.discashin===1?'禁止':'允许');
				tr.find('td:nth-child(5)').html(dt.discashout===1?'禁止':'允许');
				tr.find('td:nth-child(6)').html(dt.online===0?'在线':'离线');
				if(tr.find('span[name=update]').length !== 0){
					tr.find('span[name=update').unbind('click');
				}
				
				if(tr.find('span[name=trade-room]').length !== 0){
					tr.find('span[name=trade-room').unbind('click');
				}
				var updateFrag = '<span name="update">修改</span><span name="trade-room">去客户交易室</span>';
				tr.find('td:nth-child(7)').append($(updateFrag));
				tr.find('span[name=update]').bind('click',function(){
					var tr = $(this).parents('tr');
					var dt = tr.attr(me.trDtAttr);
					if(dt){
						userStateUpdateFrag(dt);
					}
				});
				tr.find('span[name=trade-room]').bind('click',function(){
					console.log('trade-room');
				});
			}
		}
	}
};
var pageTool = pandelTable.getPageTool(tableConfig);
pageTool.action(0);

var instruTable = $('._instru-trade-table-all');
var instruTableConfig={
	dataCount:null,
	startIndex:0,
	data:UserStateAccountData,
	pageSize:13,
	uniqueMark:'a',
	useWSData:false,
	generateTr:function(){
		var table = this.table;
		var trLen = this.pageSize;
		for(var i=0;i<trLen;i++){
			var htmlFrag = '<tr><td></td>'+
								'<td name="guarantee"></td>'+
								'<td></td>'+
								'<td></td>'+
								'<td></td>'+
								'<td></td>'+
								'<td></td>'+
							'</tr>';
			table.append($(htmlFrag));
		}
	},
	setTableData:function(){
		var me = this;
		if(!this.trDtAttr || !this.trDtIndex) return;
		var trList = this.table.find('tr'),trLen = trList.length;
		for(var i=1;i<trLen;i++){
			var tr = trList.eq(i);
				tdLen = tr.find('td').length;
			tr.find('td').html('');//先清空
			tr.find('td').css('background-color','white');
			tr.attr(this.uniqueMark,'');
			var data = this.getData(),
				//dtIndex = i+this.startIndex-1,
				dtIndex = i-1;
				dt = data[dtIndex];
			if(dt){
				tr.attr(this.trDtIndex,dtIndex);
				tr.attr(this.uniqueMark,dt[this.uniqueMark]);//必须赋值tr唯一标识属性
				tr.attr(this.trDtAttr,JSON.stringify(dt));
				tr.find('td:nth-child(1)').html(dt.aid);
				tr.find('td:nth-child(2)').html(dt.ratio);
				tr.find('td:nth-child(2)').css('background-color',dt.color);
				tr.find('td:nth-child(3)').html(dt.enable===1 ? '允许' : '禁止');
				tr.find('td:nth-child(4)').html(dt.discashin===1?'禁止':'允许');
				tr.find('td:nth-child(5)').html(dt.discashout===1?'禁止':'允许');
				tr.find('td:nth-child(6)').html(dt.online===0?'在线':'离线');
				if(tr.find('span[name=update]').length !== 0){
					tr.find('span[name=update').unbind('click');
				}
				
				if(tr.find('span[name=trade-room]').length !== 0){
					tr.find('span[name=trade-room').unbind('click');
				}
				var updateFrag = '<span name="update">修改</span><span name="trade-room">去客户交易室</span>';
				tr.find('td:nth-child(7)').append($(updateFrag));
				tr.find('span[name=update]').bind('click',function(){
					var tr = $(this).parents('tr');
					var dt = tr.attr(me.trDtAttr);
					if(dt){
						userStateUpdateFrag(dt);
					}
				});
				tr.find('span[name=trade-room]').bind('click',function(){
					console.log('trade-room');
				});
			}
		}
	}
};
var instruPageTool = instruTable.getPageTool(instruTableConfig);
instruPageTool.action();

var originTable = $('._origin-trade-table-all');
var originTableConfig={
	dataCount:null,
	startIndex:0,
	data:UserStateAccountData,
	pageSize:13,
	uniqueMark:'a',
	useWSData:false,
	generateTr:function(){
		var table = this.table;
		var trLen = this.pageSize;
		for(var i=0;i<trLen;i++){
			var htmlFrag = '<tr><td></td>'+
								'<td name="guarantee"></td>'+
								'<td></td>'+
								'<td></td>'+
								'<td></td>'+
								'<td></td>'+
								'<td></td>'+
							'</tr>';
			table.append($(htmlFrag));
		}
	},
	setTableData:function(){
		var me = this;
		if(!this.trDtAttr || !this.trDtIndex) return;
		var trList = this.table.find('tr'),trLen = trList.length;
		for(var i=1;i<trLen;i++){
			var tr = trList.eq(i);
				tdLen = tr.find('td').length;
			tr.find('td').html('');//先清空
			tr.find('td').css('background-color','white');
			tr.attr(this.uniqueMark,'');
			var data = this.getData(),
				//dtIndex = i+this.startIndex-1,
				dtIndex = i-1;
				dt = data[dtIndex];
			if(dt){
				tr.attr(this.trDtIndex,dtIndex);
				tr.attr(this.uniqueMark,dt[this.uniqueMark]);//必须赋值tr唯一标识属性
				tr.attr(this.trDtAttr,JSON.stringify(dt));
				tr.find('td:nth-child(1)').html(dt.aid);
				tr.find('td:nth-child(2)').html(dt.ratio);
				tr.find('td:nth-child(2)').css('background-color',dt.color);
				tr.find('td:nth-child(3)').html(dt.enable===1 ? '允许' : '禁止');
				tr.find('td:nth-child(4)').html(dt.discashin===1?'禁止':'允许');
				tr.find('td:nth-child(5)').html(dt.discashout===1?'禁止':'允许');
				tr.find('td:nth-child(6)').html(dt.online===0?'在线':'离线');
				if(tr.find('span[name=update]').length !== 0){
					tr.find('span[name=update').unbind('click');
				}
				
				if(tr.find('span[name=trade-room]').length !== 0){
					tr.find('span[name=trade-room').unbind('click');
				}
				var updateFrag = '<span name="update">修改</span><span name="trade-room">去客户交易室</span>';
				tr.find('td:nth-child(7)').append($(updateFrag));
				tr.find('span[name=update]').bind('click',function(){
					var tr = $(this).parents('tr');
					var dt = tr.attr(me.trDtAttr);
					if(dt){
						userStateUpdateFrag(dt);
					}
				});
				tr.find('span[name=trade-room]').bind('click',function(){
					console.log('trade-room');
				});
			}
		}
	}
};
var originPageTool = originTable.getPageTool(originTableConfig);
originPageTool.action();