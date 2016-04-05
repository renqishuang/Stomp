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
				//获取房间合约信息
				getRoomInstrumentInfo();
				//监听资金数据
				if(!TradeWSClient) return;
				//console.log("添加 资金数据监听--------->");
				AccountWSSubscribe = TradeWSClient.subscribe('/topic/'+CurrentAccountID,function(message){
					var tempData = JSON.parse(message.body);
					if(tempData.iid != CurrentInstrumentID) return;
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
						}
						if(datatype == 33 && com == 2){
							if(status == 3){
								console.log('转成交单');
								//刷新委托挂单,持仓信息
								getTradeInfoMP();
								getTradeInfoPendingDepute();
							}else if(status == 2){//撤单
								getTradeInfoPendingDepute(tempData);
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
							alert('持仓不足');
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
							alert('下单价格超过价格变动幅度限制');
						}
					}else if(actionType == 7){//添加合约
						console.log('添加合约成功');
						console.log(tempData);
						var iid = tempData.iid,
							iname = tempData.iname,
							step = tempData.step,
							price = tempData.price,
							volmul = tempData.volmul,
							deprate = tempData.deprate;
					}else if(actionType == 8){//删除合约
						console.log('删除合约成功');
						console.log(tempData);
					}
				});
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