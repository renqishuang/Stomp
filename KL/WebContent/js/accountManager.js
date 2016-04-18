//设置初始资金信息
function setInitAccountInfo(data){
	var footer = $('.KL_FooterRegion');
	if(footer.length === 0) return;
	var list = footer.find('li'),len = list.length;
	if(typeof data.balance == 'undefined') return;
	for(var i=0;i<len;i++){
		var li = $(list[i]);
		var val = li.attr('value');
		var div = li.find('div:nth-child(2)');
		switch (val) {
		case 'balance':
			div.html(data.balance);
			break;
		case 'floatbalance':
			div.html(data.floatbalance);		
			break;
		case 'floatprofit':
			if(data.floatprofit >= 0){
				$(div).css('color','red');
			}else{
				$(div).css('color','green');
			}
			div.html(data.floatprofit);			
			break;
		case 'closeprofit':
			if(data.closeprofit >= 0){
				$(div).css('color','red');
			}else{
				$(div).css('color','green');
			}
			div.html(data.closeprofit);	
			break;
		case 'tfee':
			div.html(data.tfee);			
			break;
		case 'deposit':
			div.html(data.deposit);		
			break;
		case 'froze':
			div.html(data.froze);			
			break;
		case 'available':
			AvalibleAmount = data.available;
			div.html(data.available);
			break;
		case 'risk':
			div.html(data.risk);
			break;
		default:
			break;
		}
	}
}
//添加账户数据监听
function listenerAccountID(){
	//监听资金数据
	if(!TradeWSClient) return;
	//console.log("添加 资金数据监听--------->");
	if(AccountWSSubscribe) return;
	AccountWSSubscribe = TradeWSClient.subscribe('/topic/'+CurrentAccountID,function(message){
		var tempData = JSON.parse(message.body);
		console.log('topic AID---------------------');
		//设置资金信息
		var actionType = tempData.actiontype,
			returnCode = tempData.returncode,
			status = tempData.status,
			com = tempData.com,
			datatype = tempData.datatype,
			did = tempData.did;
		if(actionType == 6){
			if(returnCode == 0){
				getTradeInfoPendingDepute();//重新获取委托单数据
				getTradeInfoMP();
			}
			if(datatype == 33 && com == 2){
				if(status == 3){
					console.log('转成交单');
					//刷新委托挂单,持仓信息
					getTradeInfoMP();
					getTradeInfoPendingDepute();
				}else if(status == 2){//撤单
					getTradeInfoPendingDepute(tempData);
					getTradeInfoMP();
				}
			}
		}else if(actionType == 4){
			setInitAccountInfo(tempData);
		}else if(actionType == 9){//合约持仓盈亏、平仓盈亏 订信息 
			//设置交易信息
			if(tempData.iid == CurrentInstrumentID){
				setTradeInfo(tempData);
			}
		}else if(actionType == 1){//下单成功
			if(returnCode == 6){
				RemodalInstance.open();
				var remodalWrap = $('.remodal');
				if(remodalWrap.length == 0 ) return;
				remodalWrap.css('width',RemodalDefaultWidth);
				remodalWrap.css('height',RemodalDefaultHeight);
				var titleWrap = remodalWrap.children('.remodal-title');
				titleWrap.html('成交提示');
				var contentWrap = remodalWrap.children('.remodal-content');
				contentWrap.attr('remodalConType','invalid');
				contentWrap.empty();
				var htmlFrag = "<div class='remodal-notification'>持仓不足"+
					"</div>";
				contentWrap.append($(htmlFrag));
				return;
			}
			console.log('下单成功');
			addTradePointer(tempData);
			//pendingDeputeConvertToOrder(tempData);//添加成交提示
			pdConvertToOrderTip(tempData);
		}else if(actionType == 10){
			if(returnCode == 1){
				accountCapitalNotEnough();
			}else if(returnCode == 11){
				//alert('下单价格超过价格变动幅度限制');
				RemodalInstance.open();
				var remodalWrap = $('.remodal');
				if(remodalWrap.length == 0 ) return;
				remodalWrap.css('width',RemodalDefaultWidth);
				remodalWrap.css('height',RemodalDefaultHeight);
				var titleWrap = remodalWrap.children('.remodal-title');
				titleWrap.html('下单提示');
				var contentWrap = remodalWrap.children('.remodal-content');
				contentWrap.attr('remodalConType','invalid');
				contentWrap.empty();
				var htmlFrag = "<div class='remodal-notification'>下单价格超过价格变动幅度限制"+
					"</div>";
				contentWrap.append($(htmlFrag));
			}
		}else if(actionType == 7){//添加合约
			console.log('添加合约成功');
			console.log(tempData);
			addInstruSuccessCallBack(tempData);
		}else if(actionType == 8){//删除合约
			console.log('删除合约成功');
			console.log(tempData);
			delInstruSuccessCallBack(tempData);
		}else if(actionType == 5){
			console.log('MQ 获取持仓信息');
		}else if(actionType == 11){
			if(status == 1){//设置条件单
				getTradeInfoConOrder();
			}else{//移出条件单
				getTradeInfoConOrder();
			}
		}
	});
}

//资金信息
function getAccountInfo(){
	var method = 'accountInfo';//方法
	var data = {
		"lc":CurrentLC,
		"uid":CurrentUserId,
		"aid":CurrentAccountID,
		"rmc":CurrentRMC,
		"rid":CurrentRoomID,
	};
	var param = JSON.stringify(data);
	$.ajax({
		url:WebServiceTransferUrl+'/call_ws/output',
		type:'post',
		dataType:"json",
		//async:false,//同步请求
		data:{
			ws_url:WebServiceTradeUrl,
			ws_func:method,
			ws_param:param
		},
		timeout:AjaxTimeOut, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			console.log("get account info data");
			console.log(data);
			if(state === 0){
				//设置账户信息
				setInitAccountInfo(data.res);
				setTimeout(function(){
					//获取房间合约信息
					getRoomInstrumentInfo();
				},200);
			}
		},
		error:function(xhr,state){
			console.log("get data error");
			//alert("请求服务器出错");
		},
		complete:function(xhr,state){
			//console.log('get data complete');
		}
	});
}