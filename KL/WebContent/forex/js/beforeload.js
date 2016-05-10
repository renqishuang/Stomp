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
	
	//交易审批类型点击事件
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

	//风险控制-用户状态
	var userstateWrap = $('._tanpanel-userstate-wrap');
	//交易账号
	var accountInput = userstateWrap.find('input[name=filter-content]');
	//搜索
	var searchBtn = userstateWrap.find('button[name=filter-search]');
	searchBtn.bind('click',function(){
		var accountTypeWrap = $('._userstate-account-wrap');
		if(accountTypeWrap.length !== 0){
			var type = accountTypeWrap.attr('accountType');
			var aid = Number(accountInput.val());
			if(type === 'all'){
				var allTable = $('._userstate-trade-table-all');
				allTable[0].sendMsg.aid=aid;
				allTable.getPageTool().sendMsg();
			}else if(type === 'risk'){
				var riskTable = $('._userstate-trade-table-risk');
				riskTable[0].sendMsg.aid=aid;
				if(ForexWSClient){
					ForexWSClient.sendMsg(JSON.stringify(riskTable[0].sendMsg));
				}
			}
		}
	});
	accountInput.bind('keypress',function(e){
		if(e.keyCode === 13){
			searchBtn.trigger('click');
		}else{
			if(e.keyCode < 48 || e.keyCode > 57){
				e.preventDefault();
			}
		}
	});
	
	//重置
	var resetBtn = userstateWrap.find('button[name=filter-reset]');
	resetBtn.bind('click',function(){
		var type = accountTypeWrap.attr('accountType');
		accountInput.val('');
		if(type === 'all'){
			var allTable = $('._userstate-trade-table-all');
			allTable[0].sendMsg.aid='';
			allTable.getPageTool().sendMsg();
		}else if(type === 'risk'){
			var riskTable = $('._userstate-trade-table-risk');
			riskTable[0].sendMsg.aid='';
			if(ForexWSClient){
				ForexWSClient.sendMsg(JSON.stringify(riskTable[0].sendMsg));
			}
		}
	});
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
					var table = $('._userstate-trade-table-all');
					if(table.length === 0) return;
					table.show();
					
					var riskTable = $('._userstate-trade-table-risk');
					if(riskTable.length === 0) return;
					riskTable.hide();
					
					accountTypeWrap.attr('accountType','all');
					
					var next=$(this).next();
					$(this).css('color','black');
					$(this).css('font-weight','bold');
					
					next.css('color','blue');
					next.css('font-weight','normal');
					
					var pageTool = table.getPageTool();
					if(pageTool) pageTool.show();
					
					//table.attr('dataType','all');
					
					if(typeof TimingRefreshRiskData !== 'undefined' &&
							TimingRefreshRiskData !== null){
						clearInterval(TimingRefreshRiskData);
						TimingRefreshRiskData = null;
					}
					
					if(typeof TimingRefreshAllData === 'undefined' ||
							TimingRefreshAllData === null){
						//定时刷新
						window.TimingRefreshAllData=setInterval(function(){
							pageTool.sendWSMsg();
						},UserStateUpdateInter);
					}
					
				}else if(name === 'account-risk'){
					var table = $('._userstate-trade-table-all');
					if(table.length === 0) return;
					table.hide();
					
					var riskTable = $('._userstate-trade-table-risk');
					if(riskTable.length === 0) return;
					riskTable.show();
					
					accountTypeWrap.attr('accountType','risk');
					var prev = $(this).prev();
					$(this).css('color','black');
					$(this).css('font-weight','bold');
					
					prev.css('color','blue');
					prev.css('font-weight','normal');
					
					var pageTool = table.getPageTool();
					if(pageTool) pageTool.hide();
					//table.attr('dataType','risk');
					
					if(typeof TimingRefreshAllData !== 'undefined' &&
							TimingRefreshAllData !== null){
						clearInterval(TimingRefreshAllData);
						TimingRefreshAllData = null;
					}
					if(typeof TimingRefreshRiskData === 'undefined' ||
							TimingRefreshRiskData === null){
						var sendMsg={
							op:'riskdata',
							ordertype:'desc',
							field:'ratio',
							aid:''
						};
						riskTable[0].sendMsg = sendMsg;
						if(ForexWSClient){
							ForexWSClient.sendMsg(JSON.stringify(sendMsg));
						}
						window.TimingRefreshRiskData = setInterval(function(){
							if(riskTable[0].sendMsg){
								if(ForexWSClient){
									ForexWSClient.sendMsg(JSON.stringify(riskTable[0].sendMsg));
								}
							}
						},UserStateUpdateInter);
					}
				}
			});
		}
	}
	//风险账户-按照交易账号或保证金进行排序
	var riskTable = $('._userstate-trade-table-risk');
	riskTable.find('th[name=trade-num]').bind('click',function(){
		var isClick = $(this).attr('isClick');
		var ordertype = '';
		if(isClick === 'true'){
			$(this).attr('isClick',false);
			ordertype = 'desc';
		}else{
			$(this).attr('isClick',true);
			ordertype = 'asc';
		}
		$(this).parents('table')[0].sendMsg.field='aid';
		$(this).parents('table')[0].sendMsg.ordertype = ordertype;
		if(ForexWSClient){
			ForexWSClient.sendMsg(JSON.stringify($(this).parents('table')[0].sendMsg));
		}
	});
	riskTable.find('th[name=deposit]').bind('click',function(){
		var isClick = $(this).attr('isClick');
		var ordertype = '';
		if(isClick === 'true'){
			ordertype = 'desc';
			$(this).attr('isClick',false);
		}else{
			ordertype = 'asc';
			$(this).attr('isClick',true);
		}
		$(this).parents('table')[0].sendMsg.field='ratio';
		$(this).parents('table')[0].sendMsg.ordertype = ordertype;
		if(ForexWSClient){
			ForexWSClient.sendMsg(JSON.stringify($(this).parents('table')[0].sendMsg));
		}
	});
})();