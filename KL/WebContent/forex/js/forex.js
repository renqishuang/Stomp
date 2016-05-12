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
		//停止客户状态数据推送
		var accountTypeWrap = $('._userstate-account-wrap'),
			countType = '';
		if(accountTypeWrap.length !== 0){
			countType = accountTypeWrap.attr('accountType');
			if(countType === 'all'){
				if(typeof TimingRefreshAllData !== 'undefined' &&
						TimingRefreshAllData !== null){
					clearInterval(TimingRefreshAllData);
					TimingRefreshAllData = null;
				}
			}else if(countType === 'risk'){
				if(typeof TimingRefreshRiskData !== 'undefined' &&
						TimingRefreshRiskData !== null){
					clearInterval(TimingRefreshRiskData);
					TimingRefreshRiskData = null;
				}
			}
		}
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
		
		
		var accountTable = $('._userstate-trade-table-all');
		if(accountTable.length !== 0){
			if(!accountTable[0].pageTool){
				//发送获取数据命令：
				var sendMsg={
					op:'alldata',
					pageno:1,
					pagesize:2,
					aid:''
				};
				accountTable[0].sendMsg = sendMsg;
				if(ForexWSClient){
					ForexWSClient.sendMsg(JSON.stringify(sendMsg));
				}
			}else{
				//启用客户状态数据推送
				var accountTypeWrap = $('._userstate-account-wrap'),
				countType = '';
				if(accountTypeWrap.length !== 0){
					countType = accountTypeWrap.attr('accountType');
					if(countType === 'all'){
						if(typeof TimingRefreshAllData === 'undefined' ||
								TimingRefreshAllData === null){
							var table = $('._userstate-trade-table-all');
							if(table.length === 0) return;
							var pageTool = table.getPageTool();
							//定时刷新
							window.TimingRefreshAllData=setInterval(function(){
								pageTool.sendWSMsg();
							},UserStateUpdateInter);
						}
					}else if(countType === 'risk'){
						var riskTable = $('._userstate-trade-table-risk');
						if(riskTable.length === 0) return;
						if(typeof TimingRefreshRiskData === 'undefined' ||
								TimingRefreshRiskData === null){
							window.TimingRefreshRiskData = setInterval(function(){
								if(riskTable[0].sendMsg){
									if(ForexWSClient){
										ForexWSClient.sendMsg(JSON.stringify(riskTable[0].sendMsg));
									}
								}
							},UserStateUpdateInter);
						}
					}
				}
			}
		}
	}
}
//风险总览-用户状态-修改
function userStateUpdateFrag(dt){
	dt =  JSON.parse(dt);
	var aid = dt.aid;
		enable = dt.enable,
		discashin = dt.discashin,
		discashout = dt.discashout;
	var cls = '_trade-userstate-update-wrap';
	var updateFrag="<div class='"+cls+"'>"+
						"<div name='title'>账号信息修改</div>"+
						"<div>"+
							"<label name='aid'>交易账号: </label>"+
							"<span name='aid'>"+aid+"</span>"+
						"</div>"+
						"<div>"+
							"<label name='trade-license'>交易许可: </label>"+
							"<label name='radio-wrap-enable-allow'><input name='trade-license' type='radio'>允许</label>"+
							"<label name='radio-wrap-enable-forbid'><input name='trade-license' type='radio'>禁止</label>"+
						"</div>"+
						"<div>"+
							"<label name='out-license'>出金许可: </label>"+
							"<label name='radio-wrap-cashout-allow'><input name='out-license' type='radio'>允许</label>"+
							"<label name='radio-wrap-cashout-forbid'><input name='out-license' type='radio'>禁止</label>"+
						"</div>"+
						"<div>"+
							"<label name='in-license'>入金许可: </label>"+
							"<label name='radio-wrap-cashin-allow'><input name='in-license' type='radio'>允许</label>"+
							"<label name='radio-wrap-cashin-forbid'><input name='in-license' type='radio'>禁止</label>"+
						"</div>"+
						"<div name='btn-wrap'>"+
							"<button name='confirm'>确定</button>"+
							"<button name='cancel'>取消</button>"+
						"</div>"+
					"</div>";
	if($('.'+cls).length === 0){
		$('body').append($(updateFrag));
		$('.'+cls).find('span[name=aid]').html(dt.a);
		$('.'+cls).find('button[name=confirm]').bind('click',function(){
			var enableLabel = $('.'+cls).find('label[name=radio-wrap-enable-allow]').find('input[type=radio]');
			var tradeenable = 0;
			if(enableLabel.is(':checked')){
				tradeenable = 1;
			}
			var disablecashout = 1;
			var cashOutLabel = $('.'+cls).find('label[name=radio-wrap-cashout-allow]').find('input[type=radio]');
			if(cashOutLabel.is(':checked')){
				disablecashout = 0;
			}
			var disablecashin = 1;
			var cashInLabel = $('.'+cls).find('label[name=radio-wrap-cashin-allow]').find('input[type=radio]');
			if(cashInLabel.is(':checked')){
				disablecashin = 0;
			}
			var msg = {
				op:'bkupacc',
				aid:aid,
				tradeenable:tradeenable,
				disablecashin:disablecashin,
				disablecashout:disablecashout
			};
			if(ForexWSClient){
				ForexWSClient.sendMsg(JSON.stringify(msg));
			}
			$('.'+cls).hide();
		});
		$('.'+cls).find('button[name=cancel]').bind('click',function(){
			
			$('.'+cls).hide();
		});
		var top = event.clientY;
		var left = event.clientX-200;
		$('.'+cls).css('top',top);
		$('.'+cls).css('left',left);
		
		//设置值
		if(enable === 1){
			$('.'+cls).find('label[name=radio-wrap-enable-allow]').find('input[type=radio]')[0].checked = true;
		}else{
			$('.'+cls).find('label[name=radio-wrap-enable-forbid]').find('input[type=radio]')[0].checked = true;
		}
		if(discashin === 1){
			$('.'+cls).find('label[name=radio-wrap-cashin-forbid]').find('input[type=radio]')[0].checked = true;
		}else{
			$('.'+cls).find('label[name=radio-wrap-cashin-allow]').find('input[type=radio]')[0].checked = true;
		}
		if(discashout === 1){
			$('.'+cls).find('label[name=radio-wrap-cashout-forbid]').find('input[type=radio]')[0].checked = true;
		}else{
			$('.'+cls).find('label[name=radio-wrap-cashout-allow]').find('input[type=radio]')[0].checked = true;
		}
	}else{
		if($('.'+cls).is(':hidden')){
			$('.'+cls).show();
		}
		$('.'+cls).find('span[name=aid]').html(dt.a);
		var top = event.clientY;
		var left = event.clientX-200;
		$('.'+cls).css('top',top);
		$('.'+cls).css('left',left);
		
		//设置值
		if(enable === 1){
			$('.'+cls).find('label[name=radio-wrap-enable-allow]').find('input[type=radio]')[0].checked = true;
		}else{
			$('.'+cls).find('label[name=radio-wrap-enable-forbid]').find('input[type=radio]')[0].checked = true;
		}
		if(discashin === 1){
			$('.'+cls).find('label[name=radio-wrap-cashin-forbid]').find('input[type=radio]')[0].checked = true;
		}else{
			$('.'+cls).find('label[name=radio-wrap-cashin-allow]').find('input[type=radio]')[0].checked = true;
		}
		if(discashout === 1){
			$('.'+cls).find('label[name=radio-wrap-cashout-forbid]').find('input[type=radio]')[0].checked = true;
		}else{
			$('.'+cls).find('label[name=radio-wrap-cashout-allow]').find('input[type=radio]')[0].checked = true;
		}
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
	var trDt = JSON.parse(tr.attr('trDt'));
	var symbol = trDt.symbol,
		lastDt = trDt.dt;
	var remodalCls = 'remodal-wrap';
	var remodalFrag = "<div class='"+remodalCls+"'></div>";
	if($('.'+remodalCls).length === 0){
		$('body').append($(remodalFrag));
	}
	if($('.'+remodalCls).is(':hidden')){
		$('.'+remodalCls).show();
	}
	//window.innerHeight+window.scrollY
	$('.'+remodalCls).height($("body").height());
	$('.'+remodalCls).empty();
	var detailWrap = $('._cash-detail-wrap').clone();
	$('.'+remodalCls).append(detailWrap);
	$('.'+remodalCls).find('._cash-detail-wrap').show();
	//设置品种代码
	$('.'+remodalCls).find('span[name=symbol]').html(symbol);
	//设置最后时间
	$('.'+remodalCls).find('span[name=lastrefresh-time]').html(lastDt);
	var defaultTrLen = 10;
	var table = $('.'+remodalCls).find('._cash_detail_table');
	var height = $('.'+remodalCls).find('._cash-detail-wrap').height();
	var top = (window.innerHeight-height)/2+window.scrollY;
	$('.'+remodalCls).find('._cash-detail-wrap').css('margin-top',top);
	$('.'+remodalCls).find('span[name=close]').bind('click',function(){
		$('.'+remodalCls).hide();
		//console.log('close');
	});
	
	var tableConfig={
			startIndex:0,
			data:UserStateAccountData,
			pageSize:10,
			uniqueMark:'userId',
			sortKey:'a',
			useWSData:false,
			generateTr:function(){
				var table = this.table;
				var trLen = this.pageSize;
				for(var i=0;i<trLen;i++){
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
			},
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
		var pageTool = table.getPageTool(tableConfig);
		pageTool.action();
}
//交易审批-待处理-接受
function noHandleTradeAccept(btn){
	//console.log($(btn).parents('tr'));
	var tr = $(btn).parents('tr'),
		trDt = JSON.parse(tr.attr('trDt'));
	var price = trDt.buy;
	var cls = '_trade-nohand-accept-menu';
	var acceptFrag = "<div class='"+cls+"'>"+
						"<div name='title'>请制定成交价</div>"+
						"<div name='price'><input type='text'></div>"+
						"<div>"+
							"<span name='code-add-one'>+1</span>"+
							"<span name='code-add-five'>+5</span>"+
							"<span name='code-add-ten'>+10</span>"+
						"</div>"+
						"<div>"+
							"<span name='code-reduce-one'>-1</span>"+
							"<span name='code-reduce-five'>-5</span>"+
							"<span name='code-reduce-ten'>-10</span>"+
						"</div>"+
						"<div name='control'>"+
							"<button name='btn-confirm'>确定</button>"+
							"<button name='btn-cancel'>取消</button>"+
						"</div>"+
					"</div>";
	if($('.'+cls).length === 0){
		$('body').append($(acceptFrag));
		var acceptMenu = $('.'+cls);
		var confirmBtn = acceptMenu.find('button[name=btn-confirm]');
		confirmBtn.bind('click',function(){
			acceptMenu.hide();
		});
		var cancelBtn = acceptMenu.find('button[name=btn-cancel]');
		cancelBtn.bind('click',function(){
			acceptMenu.hide();
		});
		//设置默认价格
		acceptMenu.find('input').val(price);
		//条码加减
		var priceInput = acceptMenu.find('input');
		var codeSpans = acceptMenu.find('span[name^=code-]'),
			codeLen = codeSpans.length;
		for(var i=0;i<codeLen;i++){
			var code = codeSpans.eq(i);
			code.bind('click',function(){
				var codeName = $(this).attr('name');
				var priceVal = priceInput.val();
				//console.log(typeof priceVal);
				var digits = priceVal.split('.')[1].length;
				if(codeName === 'code-add-one'){
					priceInput.val((Number(priceInput.val())+1).toFixed(digits));
				}else if(codeName === 'code-add-five'){
					priceInput.val((Number(priceInput.val())+5).toFixed(digits));
				}else if(codeName === 'code-add-ten'){
					priceInput.val((Number(priceInput.val())+10).toFixed(digits));
				}else if(codeName === 'code-reduce-one'){
					priceInput.val((Number(priceInput.val())-1).toFixed(digits));
				}else if(codeName === 'code-reduce-five'){
					priceInput.val((Number(priceInput.val())-5).toFixed(digits));
				}else if(codeName === 'code-reduce-ten'){
					priceInput.val((Number(priceInput.val())-10).toFixed(digits));
				}
			});
		}
		$('.'+cls).css('top',event.clientY);
		$('.'+cls).css('left',event.clientX-145);
	}else{
		if($('.'+cls).is(':hidden')){
			$('.'+cls).show();
		}
		$('.'+cls).css('top',event.clientY);
		$('.'+cls).css('left',event.clientX-145);
		$('.'+cls).find('input').val(price);
	}
}
//交易审批-待处理-拒绝
function noHandleTradeRefuse(btn){
	var cls = '_trade-nohand-refuse-menu';
	var refuseFrag = "<div class='"+cls+"'>"+
						"<div>是否确定拒绝?</div>"+
						"<div>"+
							"<button name='btn-confirm'>确定</button>"+
							"<button name='btn-cancel'>取消</button>"+
						"</div>"+
					"</div>";
	if($('.'+cls).length === 0){
		$('body').append($(refuseFrag));
		$('.'+cls).find('button').bind('click',function(){
			var name = $(this).attr('name');
			if(name === 'btn-confirm'){
				var tr = $(btn).parents('tr');
				if(tr.length === 0) return;
				var dt = tr.attr('trDt'),
					data = JSON.parse(dt);
				pendingRefuseSendMsg(data);
				$('.'+cls).hide();
			}else if(name === 'btn-cancel'){
				$('.'+cls).hide();
			}
		});
		$('.'+cls).css('top',event.clientY);
		$('.'+cls).css('left',event.clientX-140);
	}else{
		if($('.'+cls).is(':hidden')){
			$('.'+cls).show();
		}
		$('.'+cls).css('top',event.clientY);
		$('.'+cls).css('left',event.clientX-140);
	}
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
		var trDt = JSON.stringify(dt);
		var htmlFrag="<tr trDt='"+trDt+"'>" +
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
//用户状态-全部账户-更新
function updateAllAccountData(data){
	var rc =data.rc;
	if(rc !== 0) return;
	var count = data.count;
	var data = data.data;
	var accountTable = $('._userstate-trade-table-all');
	if(accountTable.length === 0) return;
	if(!accountTable[0].pageTool){
		var tableConfig={
			dataCount:count,
			startIndex:0,
			data:data,
			pageSize:2,
			uniqueMark:'aid',
			useWSData:true,
			//sendMsg:sendMsg,
			sendWSMsg:function(){
				if(!ForexWSClient || !this.table[0].sendMsg ||
						this.currentPage === null) return;
				this.table[0].sendMsg.pageno=this.currentPage;
				ForexWSClient.sendMsg(JSON.stringify(this.table[0].sendMsg));
			},
			getTableData:function(){
				if(this.startIndex === null || this.currentPage === null 
						|| this.pageSize === null) return;
			},
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
		var pageTool = accountTable.getPageTool(tableConfig);
		pageTool.action();
		if(typeof TimingRefreshAllData === 'undefined' ||
				TimingRefreshAllData === null){
			//定时刷新
			window.TimingRefreshAllData=setInterval(function(){
				pageTool.sendWSMsg();
			},UserStateUpdateInter);
		}
	}else{
		//console.log('初始化后,收到数据');
		var pageTool = accountTable.getPageTool();
		pageTool.setData(data);
		pageTool.setTotalCount(count);
		pageTool.calcPage();
		pageTool.action();
	}
}
//用户状态-风险账户-更新
function updateRiskAccountData(data){
	var rc =data.rc;
	if(rc !== 0) return;
	var data = data.data,
		trLen = data.length;
	var accountTable = $('._userstate-trade-table-risk');
	if(accountTable.length === 0) return;
	accountTable.find('tr:not(":first-child")').remove();
	for(var i=0;i<trLen;i++){
		var dt = data[i],
			enable = dt.enable===1 ? '允许' : '禁止',
			discashin = dt.discashin===1?'禁止':'允许',
			discashout = dt.discashout===1?'禁止':'允许',
			online = dt.online===0?'在线':'离线',
			color = dt.color;
		var trDt = JSON.stringify(dt);
		var htmlFrag = '<tr trDt='+trDt+'><td>'+dt.aid+'</td>'+
							'<td style="background-color:'+color+';" name="guarantee">'+dt.ratio+'</td>'+
							'<td>'+enable+'</td>'+
							'<td>'+discashin+'</td>'+
							'<td>'+discashout+'</td>'+
							'<td>'+online+'</td>'+
							'<td><span name="update">修改</span><span name="trade-room">去客户交易室</span></td>'+
						'</tr>';
		accountTable.append($(htmlFrag));
	}
	accountTable.find('span[name=update]').bind('click',function(){
		var tr = $(this).parents('tr');
		var dt = tr.attr('trDt');
		console.log(dt);
		if(dt){
			userStateUpdateFrag(dt);
		}
	});
	accountTable.find('span[name=trade-room]').bind('click',function(){
		console.log('trade-room');
	});
}
//更新角标
function updateCornerMarkCount(data){
	var pandectWrap = $('._pandect-header-wrap');
	if(pandectWrap.length !== 0){
		pandectWrap.find('span[name=notify-pandect]').html(data.pnum);
		pandectWrap.find('span[name=notify-userstate]').html(data.anum);
	}
	var tabWrap = $('._tabpanel-pandect-wrap');
	if(tabWrap.length !== 0){
		tabWrap.find('span[name=notify-nohandle]').html(data.pnum);
	}
}
//弹出警告
function alertWarnFn(dt){
	$('body').createTradeDialog(dt);
}
//总览-待处理-拒绝-发送命令
function pendingRefuseSendMsg(data){
	var msg={
		op:'approve',
		uid:GlobalUserId,
		aid:data.aid,
		ord:data.ord,
		price:-1
	};
	if(ForexWSClient){
		ForexWSClient.sendMsg(JSON.stringify(msg));
	}
}