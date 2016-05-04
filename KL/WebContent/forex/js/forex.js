//风险总览-Tab页切换
function riskPandectTabClick(tab){
	var name = tab.attr('name');
	var isClick = tab.attr('isClick');
	if(isClick === 'true') return;
	if(name == 'pandect'){
		var next = tab.next();
		tab.attr('isClick',true);
		tab.css('font-weight','bold');
		tab.css('background-color','white');
		next.attr('isClick',false);
		next.css('font-weight','normal');
		next.css('background-color','#C9C9C9');
		
		$('._tabpanel-pandect-wrap').show();
		$('._tanpanel-userstate-wrap').hide();
	}else if(name == 'userstate'){
		var prev = tab.prev();
		tab.attr('isClick',true);
		tab.css('font-weight','bold');
		tab.css('background-color','white');
		prev.attr('isClick',false);
		prev.css('font-weight','normal');
		prev.css('background-color','#C9C9C9');
		$('._tabpanel-pandect-wrap').hide();
		$('._tanpanel-userstate-wrap').show();
		var accountTable = $('._userstate-trade-table');
		var tableConfig={
			startIndex:0,
			data:UserStateAccountData,
			pageSize:13,
			uniqueMark:'userId',
			sortKey:'a',
			setTableData:function(){
				if(!this.uniqueMark || this.startIndex === null || !this.trDtAttr
						|| !this.trDtIndex) return;
				var trList = this.table.find('tr'),trLen = trList.length;
				for(var i=1;i<trLen;i++){
					var tr = trList.eq(i);
						tdLen = tr.find('td').length;
					tr.find('td').html('');//先清空
					tr.attr(this.uniqueMark,'');
					var data = this.getData(),
						dtIndex = i+this.startIndex-1,
						dt = data[dtIndex];
					if(dt){
						tr.attr(this.trDtIndex,dtIndex);
						tr.attr(this.uniqueMark,dt[this.uniqueMark]);//必须赋值tr唯一标识属性
						tr.attr(this.trDtAttr,JSON.stringify(dt));
						tr.find('td:nth-child(1)').html(dt.a);
						tr.find('td:nth-child(2)').html(dt.b);
						tr.find('td:nth-child(3)').html(dt.c);
						tr.find('td:nth-child(4)').html(dt.d);
						tr.find('td:nth-child(5)').html(dt.e);
						tr.find('td:nth-child(6)').html(dt.f);
						tr.find('td:nth-child(7)').html(dt.g);
					}
				}
			},
			updateTrData:function(dt){
				if(!this.uniqueMark) return;
				var unique = dt[this.uniqueMark];
				var tr = $('table').find('tr['+this.uniqueMark+'='+unique+']');
				if(tr.length != 0){
					tr.find('td:nth-child(1)').html(dt.a);
					tr.find('td:nth-child(2)').html(dt.b);
					tr.find('td:nth-child(3)').html(dt.c);
					tr.find('td:nth-child(4)').html(dt.d);
					tr.find('td:nth-child(5)').html(dt.e);
					tr.find('td:nth-child(6)').html(dt.f);
					tr.find('td:nth-child(7)').html(dt.g);
				}
			}
		};
		var pageTool = accountTable.createPageTool(tableConfig);
	}
}

//风险总览-总览-交易类型-点击
function pandectTradeTypeHand(btn){
	var isClick = btn.attr('isClick');
	if(isClick === 'true') return;
	var type = btn.attr('name');
	if(type == 'type-warning'){
		var firstNext = btn.next();
			secondNext = firstNext.next();
			btn.css('border','1px solid black');
			btn.css('border-bottom','none');
			btn.attr('isClick',true);
			
			firstNext.css('border','none');
			firstNext.css('border-bottom','1px solid black');
			firstNext.attr('isClick',false);
			
			secondNext.css('border','none');
			secondNext.css('border-bottom','1px solid black');
			secondNext.attr('isClick',false);
			
			$('._trade-warning-table').show();
			$('._trade-nohandle-table').hide();
			$('._trade-hashandle-table').hide();
	}else if(type == 'type-nohandle'){
		var prev = btn.prev(),next = btn.next();
		btn.css('border','1px solid black');
		btn.css('border-bottom','none');
		btn.attr('isClick',true);
		
		prev.css('border','none');
		prev.css('border-bottom','1px solid black');
		prev.attr('isClick',false);
		
		next.css('border','none');
		next.css('border-bottom','1px solid black');
		next.attr('isClick',false);
		
		$('._trade-nohandle-table').show();
		$('._trade-warning-table').hide();
		$('._trade-hashandle-table').hide();
	}else if(type == 'type-hashandle'){
		var firstPrev = btn.prev(),secondPrev = firstPrev.prev();
		btn.css('border','1px solid black');
		btn.css('border-bottom','none');
		btn.attr('isClick',true);
		
		firstPrev.css('border','none');
		firstPrev.css('border-bottom','1px solid black');
		firstPrev.attr('isClick',false);
		
		secondPrev.css('border','none');
		secondPrev.css('border-bottom','1px solid black');
		secondPrev.attr('isClick',false);
		
		$('._trade-hashandle-table').show();
		$('._trade-nohandle-table').hide();
		$('._trade-warning-table').hide();
	}
}
//风险控制-总览-头寸-详情
function pandectCashDetail(td){
	var tr = $(td).parent();
	console.log(JSON.parse(tr.attr('trDt')));
	var remodalCls = 'remodal-wrap';
	var remodalFrag = "<div class='"+remodalCls+"'></div>";
	if($('.'+remodalCls).length === 0){
		$('body').append($(remodalFrag));
	}
	if($('.'+remodalCls).is(':hidden')){
		$('.'+remodalCls).show();
	}
	$('.'+remodalCls).height(window.innerHeight);
	$('.'+remodalCls).empty();
	var detailWrap = $('._cash-detail-wrap').clone();
	$('.'+remodalCls).append(detailWrap);
	$('.'+remodalCls).find('._cash-detail-wrap').show();
	var defaultTrLen = 10;
	var table = $('.'+remodalCls).find('._cash_detail_table'); 
	for(var i=0;i<defaultTrLen;i++){
		var htmlFrag = '<tr><td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
						'</tr>';
		table.append($(htmlFrag));
	}
	var height = $('.'+remodalCls).find('._cash-detail-wrap').height();
	var top = (window.innerHeight-height)/2;
	$('.'+remodalCls).find('._cash-detail-wrap').css('margin-top',top);
	$('.'+remodalCls).find('span[name=close]').bind('click',function(){
		$('.'+remodalCls).hide();
		console.log('close');
	});
	var tableConfig={
			startIndex:0,
			data:[],
			pageSize:10,
			uniqueMark:'userId',
			sortKey:'a',
			setTableData:function(){
				if(!this.uniqueMark || this.startIndex === null || !this.trDtAttr
						|| !this.trDtIndex) return;
				var trList = this.table.find('tr'),trLen = trList.length;
				for(var i=1;i<trLen;i++){
					var tr = trList.eq(i);
						tdLen = tr.find('td').length;
					tr.find('td').html('');//先清空
					tr.attr(this.uniqueMark,'');
					var data = this.getData(),
						dtIndex = i+this.startIndex-1,
						dt = data[dtIndex];
					if(dt){
						tr.attr(this.trDtIndex,dtIndex);
						tr.attr(this.uniqueMark,dt[this.uniqueMark]);//必须赋值tr唯一标识属性
						tr.attr(this.trDtAttr,JSON.stringify(dt));
						tr.find('td:nth-child(1)').html(dt.a);
						tr.find('td:nth-child(2)').html(dt.b);
						tr.find('td:nth-child(3)').html(dt.c);
						tr.find('td:nth-child(4)').html(dt.d);
						tr.find('td:nth-child(5)').html(dt.e);
						tr.find('td:nth-child(6)').html(dt.f);
						tr.find('td:nth-child(7)').html(dt.g);
					}
				}
			},
			updateTrData:function(dt){
				if(!this.uniqueMark) return;
				var unique = dt[this.uniqueMark];
				var tr = $('table').find('tr['+this.uniqueMark+'='+unique+']');
				if(tr.length != 0){
					tr.find('td:nth-child(1)').html(dt.a);
					tr.find('td:nth-child(2)').html(dt.b);
					tr.find('td:nth-child(3)').html(dt.c);
					tr.find('td:nth-child(4)').html(dt.d);
					tr.find('td:nth-child(5)').html(dt.e);
					tr.find('td:nth-child(6)').html(dt.f);
					tr.find('td:nth-child(7)').html(dt.g);
				}
			}
		};
		var pageTool = table.createPageTool(tableConfig);
}
//交易审批-待处理-接受
function noHandleTradeAccept(btn){
	console.log('ss');
	var acceptMenu = $('._trade-nohand-accept-menu');
	acceptMenu.show();
	acceptMenu.css('top',event.clientY);
	acceptMenu.css('left',event.clientX-145);
}
//交易审批-待处理-拒绝
function noHandleTradeRefuse(btn){
	var refuseMenu = $('._trade-nohand-refuse-menu');
	refuseMenu.show();
	refuseMenu.css('top',event.clientY);
	refuseMenu.css('left',event.clientX-140);
}