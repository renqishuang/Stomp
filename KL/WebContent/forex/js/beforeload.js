(function(){
	//风控总览Tab页切换
	var pandectTable = $('._pandect_tab_panel');
	if(pandectTable.length != 0){
		var pandectTabs = pandectTable.find('>span'),
			pandectTabLen = pandectTabs.length;
		for(var i=0;i<pandectTabLen;i++){
			var pandectTab = pandectTabs.eq(i);
			pandectTab.bind('click',function(){
				riskPandectTabClick($(this));
			});
		}
	}
	
	//交易审批-警告数据初始化
	/*var warnTable = $('._trade-warning-table');
	var warnTableLen = 5;
	for(var i=0;i<warnTableLen;i++){
		var htmlFrag = '<tr><td>1</td>'+
							'<td>2</td>'+
							'<td>3</td>'+
							'<td>4</td>'+
							'<td>5</td>'+
							'<td>6</td>'+
							'<td>7</td>'+
							'<td>8</td>'+
							'<td name="vol">9</td>'+
							'<td>10</td>'+
							'<td>11</td>'+
							'<td>12</td>'+
							'<td>13</td>'+
						'</tr>';
		warnTable.append($(htmlFrag));
	}*/
	//交易审批-待处理
	/*var noHandleTable = $('._trade-nohandle-table');
	var noHandleTBLen = 5;
	if(noHandleTable.length != 0){
		for(var i=0;i<noHandleTBLen;i++){
			var time = '2016-05-04 15:13:0'+i;
			var htmlFrag = '<tr><td>1</td>'+
								'<td>2</td>'+
								'<td>3</td>'+
								'<td>4</td>'+
								'<td>5</td>'+
								'<td>6</td>'+
								'<td>7</td>'+
								'<td>8</td>'+
								'<td name="vol">9</td>'+
								'<td>10</td>'+
								'<td>'+time+'</td>'+
								'<td>12</td>'+
								'<td>13</td>'+
								'<td name="operate"><span onclick="noHandleTradeAccept(this)" name="accept">接受</span><span onclick="noHandleTradeRefuse(this)" name="refuse">拒绝</span></td>'+
							'</tr>';
			noHandleTable.append($(htmlFrag));
		}
	}*/
	
	//头寸总览表格数据初始化
	/*var cashTable = $('._pandect-cash-table');
	var cashTableLen = 13;
	for(var i=0;i<cashTableLen;i++){
		var htmlFrag = '<tr><td>1</td>'+
							'<td>2</td>'+
							'<td>3</td>'+
							'<td>4</td>'+
							'<td>5</td>'+
							'<td>6</td>'+
							'<td>7</td>'+
							'<td>8</td>'+
							'<td>9</td>'+
							'<td>10</td>'+
							'<td>11</td>'+
							'<td>12</td>'+
							'<td>13</td>'+
							'<td onclick="pandectCashDetail(this)" name="detail">详细</td>'+
						'</tr>';
		cashTable.append($(htmlFrag));
	}
	var cashFootFrag =  '<tr><td name="total" colspan="5">合计:</td>'+
							'<td colspan="2">多盈亏</td>'+
							'<td>3</td>'+
							'<td colspan="2">空盈亏</td>'+
							'<td>5</td>'+
							'<td>总盈亏</td>'+
							'<td>7</td>'+
							'<td></td>'+
						'</tr>';
	cashTable.append($(cashFootFrag));*/
	//交易审批类型添加点击事件
	var tradeTypeWrap = $('._pandect-trade-type');
	if(tradeTypeWrap.length != 0){
		var typeBtns = tradeTypeWrap.find('span[name^=type-]'),
			typeBtnLen = typeBtns.length;
		for(var i=0;i<typeBtnLen;i++){
			var btn = typeBtns.eq(i);
			btn.bind('click',function(){
				pandectTradeTypeHand($(this));
			});
		}
	}
	//用户状态账号表格数据初始化
	//return;
	var accountTable = $('._userstate-trade-table');
	var dtLen = 13;
	for(var i=0;i<dtLen;i++){
		var htmlFrag = '<tr><td>3234242</td>'+
							'<td name="guarantee">53.22%</td>'+
							'<td>允许</td>'+
							'<td>允许</td>'+
							'<td>禁止</td>'+
							'<td>在线</td>'+
							'<td><span>修改</span><span>去客户交易室</span></td>'+
						'</tr>';
		accountTable.append($(htmlFrag));
	}
	var tradeNumTh = accountTable.find('th[name=trade-num]');
	if(tradeNumTh.length != 0){
		tradeNumTh.bind('click',function(){
			console.log('aaaa');
		});
	}
	//交易审批-待处理-接受-菜单-确定和取消
	var acceptMenu = $('._trade-nohand-accept-menu');
	if(acceptMenu.length !== 0){
		var confirmBtn = acceptMenu.find('button[name=btn-confirm]');
		confirmBtn.bind('click',function(){
			acceptMenu.hide();
		});
		var cancelBtn = acceptMenu.find('button[name=btn-cancel]');
		cancelBtn.bind('click',function(){
			acceptMenu.hide();
		});
		//条码加减
		var priceInput = acceptMenu.find('input');
		var codeSpans = acceptMenu.find('span[name^=code-]'),
			codeLen = codeSpans.length;
		for(var i=0;i<codeLen;i++){
			var code = codeSpans.eq(i);
			code.bind('click',function(){
				var codeName = $(this).attr('name');
				if(codeName === 'code-add-one'){
					priceInput.val(Number(priceInput.val())+1);
				}else if(codeName === 'code-add-five'){
					priceInput.val(Number(priceInput.val())+5);
				}else if(codeName === 'code-add-ten'){
					priceInput.val(Number(priceInput.val())+10);
				}else if(codeName === 'code-reduce-one'){
					priceInput.val(Number(priceInput.val())-1);
				}else if(codeName === 'code-reduce-five'){
					priceInput.val(Number(priceInput.val())-5);
				}else if(codeName === 'code-reduce-ten'){
					priceInput.val(Number(priceInput.val())-10);
				}
			});
		}
	}
	//交易审批-待处理-接受-菜单-确定和取消
	var refuseMenu = $('._trade-nohand-refuse-menu');
	if(refuseMenu.length !== 0){
		var confirmBtn = refuseMenu.find('button[name=btn-confirm]');
		confirmBtn.bind('click',function(){
			refuseMenu.hide();
		});
		var cancelBtn = refuseMenu.find('button[name=btn-cancel]');
		cancelBtn.bind('click',function(){
			refuseMenu.hide();
		});
	}
	//风险控制-用户状态
	var userstateWrap = $('._tanpanel-userstate-wrap');
	if(userstateWrap.length != 0){
		//交易账号
		var accountInput = userstateWrap.find('input[name=filter-content]');
		/*accountInput.bind('keydown',function(){
			console.log('key down');
		});
		accountInput.bind('keyup',function(){
			console.log('key up');
		});*/
		accountInput.bind('keypress',function(e){
			if(e.keyCode < 48 || e.keyCode > 57){
				e.preventDefault();
			}
		});
		//搜索
		var searchBtn = userstateWrap.find('button[name=filter-search]');
		searchBtn.bind('click',function(){
			var tradeTable = $('._userstate-trade-table');
			pageTool = tradeTable.getPageTool();
			pageTool.setFilter('a',accountInput.val());
		});
		
		//重置
		var resetBtn = userstateWrap.find('button[name=filter-reset]');
		resetBtn.bind('click',function(){
			var tradeTable = $('._userstate-trade-table');
			pageTool = tradeTable.getPageTool();
			accountInput.val('');
			pageTool.clearFilter();
		});
	}
	
	/*var data={
		tradeNum:123	
	};
	$('body').createTradeDialog(data);
	var data1={
		tradeNum:234	
	};
	$('body').createTradeDialog(data1);
	var data2={
		tradeNum:345
	};
	$('body').createTradeDialog(data2);*/
	
	//风控-用户状态-账号类型切换
	var accountTypeWrap = $('._userstate-account-wrap');
	if(accountTypeWrap.length !== 0){
		var accountTypes = accountTypeWrap.find('span[name^=account-]'),
			accountTypeLen = accountTypes.length;
		for(var i=0;i<accountTypeLen;i++){
			var accountType = accountTypes.eq(i);
			accountType.bind('click',function(){
				var isClick = $(this).attr('isClick');
				if(isClick === 'true') return;
				var name = $(this).attr('name');
				if(name === 'account-all'){
					var next=$(this).next();
					$(this).css('color','black');
					$(this).css('font-weight','bold');
					
					next.css('color','blue');
					next.css('font-weight','normal');
				}else if(name === 'account-risk'){
					var prev = $(this).prev();
					$(this).css('color','black');
					$(this).css('font-weight','bold');
					
					prev.css('color','blue');
					prev.css('font-weight','normal');
				}
			});
		}
	}
})();