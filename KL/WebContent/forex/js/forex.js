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

//头寸数据更新
function updateCashData(data){
	var rowData = data.data,rowLen = rowData.length
		buytotal =data.buytotal,
		selltotal = data.selltotal,
		total = data.total;
	//rowData = JSONArrQuickSort(rowData,'symbol',false);
	var cashTable = $('._pandect-cash-table'),
		cashTrs = cashTable.find('tr'),
		cashTrLen = cashTrs.length;
	if(cashTrLen == 2){
		for(var i=0;i<rowLen;i++){
			var dt = rowData[i];
			var htmlFrag = '<tr trDt="'+JSON.stringify(dt)+'"><td name="symbol">'+dt.symbol+'</td>'+
								'<td name="sell">'+dt.sell+'</td>'+
								'<td name="buy">'+dt.buy+'</td>'+
								'<td name="spread">'+dt.spread+'</td>'+
								'<td name="dt">'+dt.dt+'</td>'+
								'<td name="buyvol">'+dt.buyvol+'</td>'+
								'<td name="buyavgprice">'+dt.buyavgprice+'</td>'+
								'<td name="buyprofit">'+dt.buyprofit+'</td>'+
								'<td name="sellvol">'+dt.sellvol+'</td>'+
								'<td name="sellavgprice">'+dt.sellavgprice+'</td>'+
								'<td name="sellprofit">'+dt.sellprofit+'</td>'+
								'<td name="vol">'+dt.vol+'</td>'+
								'<td name="profit">'+dt.profit+'</td>'+
								'<td onclick="pandectCashDetail(this)" name="detail">详细</td>'+
							'</tr>';
			cashTable.append($(htmlFrag));
		}
		var cashFootFrag =  '<tr><td name="count" colspan="5">合计:</td>'+
								'<td colspan="2">多盈亏</td>'+
								'<td name="buytotal">3</td>'+
								'<td colspan="2">空盈亏</td>'+
								'<td name="selltotal">5</td>'+
								'<td>总盈亏</td>'+
								'<td name="total">7</td>'+
								'<td></td>'+
							'</tr>';
		cashTable.append($(cashFootFrag));
	}else{
		for(var i=2;i<cashTrLen-1;i++){
			var tr = cashTrs.eq(i);
			//tr.find('td:not(:last-child)').html('');
			var dt = rowData[i-2];
			tr.attr('trDt',JSON.stringify(dt));
			tr.find('td[name=symbol]').html(dt.symbol);
			tr.find('td[name=sell]').html(dt.sell);
			tr.find('td[name=buy]').html(dt.buy);
			tr.find('td[name=spread]').html(dt.spread);
			tr.find('td[name=dt]').html(dt.dt);
			tr.find('td[name=buyvol]').html(dt.buyvol);
			tr.find('td[name=buyavgprice]').html(dt.buyavgprice);
			tr.find('td[name=buyprofit]').html(dt.buyprofit);
			tr.find('td[name=sellvol]').html(dt.sellvol);
			tr.find('td[name=sellavgprice]').html(dt.sellavgprice);
			tr.find('td[name=sellprofit]').html(dt.sellprofit);
			tr.find('td[name=vol]').html(dt.vol);
			tr.find('td[name=profit]').html(dt.profit);
		}
		cashTrs.find('td[name=buytotal]').html(buytotal);
		cashTrs.find('td[name=selltotal]').html(selltotal);
		cashTrs.find('td[name=total]').html(total);
	}
}
//总览-预警
function updatePandectWarnData(data){
	var rowData = data.data,rowLen = rowData.length;
	var warnTable = $('._trade-warning-table'),
		warnTrs = warnTable.find('tr:not(":first-child")'),
		warnTrLen = warnTrs.length;
	//-----------------
	warnTrs.remove();
	for(var i=0;i<rowLen;i++){
		var dt = rowData[i];
		var htmlFrag="<tr>" +
						"<td name='aid'>"+dt.aid+"</td>" +
						"<td name='ord'>"+dt.ord+"</td>" +
						"<td name='symbol'>"+dt.symbol+"</td>" +
						"<td name='sell'>"+dt.sell+"</td>" +
						"<td name='buy'>"+dt.buy+"</td>" +
						"<td name='spread'>"+dt.spread+"</td>" +
						"<td name='dt'>"+dt.dt+"</td>" +
						"<td name='tp'>"+dt.tp+"</td>" +
						"<td name='vol'>"+dt.vol+"</td>" +
						"<td name='opr'>"+dt.opr+"</td>" +
						"<td name='odt'>"+dt.odt+"</td>" +
						"<td name='limit'>"+dt.limit+"</td>" +
						"<td name='stop'>"+dt.stop+"</td>" +
					"</tr>";
		warnTable.append($(htmlFrag));
	}
	return;
	if(warnTrLen === 1){
		for(var i=0;i<rowLen;i++){
			var dt = rowData[i];
			var htmlFrag="<tr>" +
							"<td name='aid'>"+dt.aid+"</td>" +
							"<td name='ord'>"+dt.ord+"</td>" +
							"<td name='symbol'>"+dt.symbol+"</td>" +
							"<td name='sell'>"+dt.sell+"</td>" +
							"<td name='buy'>"+dt.buy+"</td>" +
							"<td name='spread'>"+dt.spread+"</td>" +
							"<td name='dt'>"+dt.dt+"</td>" +
							"<td name='tp'>"+dt.tp+"</td>" +
							"<td name='vol'>"+dt.vol+"</td>" +
							"<td name='opr'>"+dt.opr+"</td>" +
							"<td name='odt'>"+dt.odt+"</td>" +
							"<td name='limit'>"+dt.limit+"</td>" +
							"<td name='stop'>"+dt.stop+"</td>" +
						"</tr>";
			warnTable.append($(htmlFrag));
		}
	}else{
		for(var i=1;i<warnTrLen;i++){
			var tr = warnTrs.eq(i);
			var dt = rowData[i-1];
			if(dt){
				tr.find('td[name=aid]').html(dt.aid);
				tr.find('td[name=ord]').html(dt.ord);
				tr.find('td[name=symbol]').html(dt.symbol);
				tr.find('td[name=sell]').html(dt.sell);
				tr.find('td[name=buy]').html(dt.buy);
				tr.find('td[name=spread]').html(dt.spread);
				tr.find('td[name=dt]').html(dt.dt);
				tr.find('td[name=tp]').html(dt.tp);
				tr.find('td[name=vol]').html(dt.vol);
				tr.find('td[name=opr]').html(dt.opr);
				tr.find('td[name=odt]').html(dt.odt);
				tr.find('td[name=limit]').html(dt.limit);
				tr.find('td[name=stop]').html(dt.stop);
			}
		}
	}
}
//总览-待处理-数据更新
function updatePandectPendData(data){
	var rowData = data.data,rowLen = rowData.length;
	var pendingTable = $('._trade-nohandle-table'),
		pendingTrs = pendingTable.find('tr:not(":first-child")'),
		pendingTrLen = pendingTrs.length;
	//-----------------
	pendingTrs.remove();
	for(var i=0;i<rowLen;i++){
		var dt = rowData[i];
		//$('body').createTradeDialog(dt);
		var htmlFrag="<tr>" +
						"<td name='aid'>"+dt.aid+"</td>" +
						"<td name='ord'>"+dt.ord+"</td>" +
						"<td name='symbol'>"+dt.symbol+"</td>" +
						"<td name='sell'>"+dt.sell+"</td>" +
						"<td name='buy'>"+dt.buy+"</td>" +
						"<td name='spread'>"+dt.spread+"</td>" +
						"<td name='dt'>"+dt.dt+"</td>" +
						"<td name='tp'>"+dt.tp+"</td>" +
						"<td name='vol'>"+dt.vol+"</td>" +
						"<td name='opr'>"+dt.opr+"</td>" +
						"<td name='odt'>"+dt.odt+"</td>" +
						"<td name='limit'>"+dt.limit+"</td>" +
						"<td name='stop'>"+dt.stop+"</td>" +
						'<td name="operate"><span onclick="noHandleTradeAccept(this)" name="accept">接受</span><span onclick="noHandleTradeRefuse(this)" name="refuse">拒绝</span></td>'+
					"</tr>";
		pendingTable.append($(htmlFrag));
	}
	return;
	if(pendingTrLen === 1){
		for(var i=0;i<rowLen;i++){
			var dt = rowData[i];
			//$('body').createTradeDialog(dt);
			var htmlFrag="<tr>" +
							"<td name='aid'>"+dt.aid+"</td>" +
							"<td name='ord'>"+dt.ord+"</td>" +
							"<td name='symbol'>"+dt.symbol+"</td>" +
							"<td name='sell'>"+dt.sell+"</td>" +
							"<td name='buy'>"+dt.buy+"</td>" +
							"<td name='spread'>"+dt.spread+"</td>" +
							"<td name='dt'>"+dt.dt+"</td>" +
							"<td name='tp'>"+dt.tp+"</td>" +
							"<td name='vol'>"+dt.vol+"</td>" +
							"<td name='opr'>"+dt.opr+"</td>" +
							"<td name='odt'>"+dt.odt+"</td>" +
							"<td name='limit'>"+dt.limit+"</td>" +
							"<td name='stop'>"+dt.stop+"</td>" +
							'<td name="operate"><span onclick="noHandleTradeAccept(this)" name="accept">接受</span><span onclick="noHandleTradeRefuse(this)" name="refuse">拒绝</span></td>'+
						"</tr>";
			pendingTable.append($(htmlFrag));
		}
	}else{
		for(var i=1;i<pendingTrLen;i++){
			var tr = pendingTrs.eq(i);
			var dt = rowData[i-1];
			//$('body').createTradeDialog(dt);
			if(dt){
				tr.find('td[name=aid]').html(dt.aid);
				tr.find('td[name=ord]').html(dt.ord);
				tr.find('td[name=symbol]').html(dt.symbol);
				tr.find('td[name=sell]').html(dt.sell);
				tr.find('td[name=buy]').html(dt.buy);
				tr.find('td[name=spread]').html(dt.spread);
				tr.find('td[name=dt]').html(dt.dt);
				tr.find('td[name=tp]').html(dt.tp);
				tr.find('td[name=vol]').html(dt.vol);
				tr.find('td[name=opr]').html(dt.opr);
				tr.find('td[name=odt]').html(dt.odt);
				tr.find('td[name=limit]').html(dt.limit);
				tr.find('td[name=stop]').html(dt.stop);
			}
		}
	}
}