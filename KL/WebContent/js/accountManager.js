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
				setInitAccountInfo(data.res);
				//监听资金数据
				if(!TradeWSClient) return;
				//console.log("添加 资金数据监听--------->");
				var MQAccountSub = TradeWSClient.subscribe('/topic/'+CurrentAccountID,function(message){
					var tempData = JSON.parse(message.body);
					//console.log('topic aid --- ');
					//console.log(tempData);
					//{"co":0,"dir":0,"aid":3179,"tvol":1,"dvol":1,"volfcls":0,"ds":1,"status":1,"otype":0,"comment":0,"frozen":20108,"iid":"TF1606","rid":"1553","price":0,"dprice":100.54,"user":3018,"vol":1,"action":1,"did":3179092621545,"dtime":1458609981546,"com":1,"returncode":0,"datatype":33,"actiontype":6}
					//设置资金信息
					var actionType = tempData.actiontype;
					var returnCode = tempData.returncode;
					var status = tempData.status;
					
					if(actionType == 6){
						if(returnCode == 0){
							tradeInfoPDMQHandler(tempData);
						}
						if(status == 3){//把委托单变成成交单
							pendingDeputeConvertToOrder(tempData);
						}else if(status == 2){//撤单
							MQRepealPendingDepute(tempData);
						}
					}else if(actionType == 4){
						setInitAccountInfo(tempData);
					}else if(actionType == 9){//合约持仓盈亏、平仓盈亏 订信息 
						//设置交易信息
						setTradeInfo(tempData);
					}else if(actionType == 1){//下单成功
						addTradePointer(tempData);
					}
				});
				//获取房间合约信息
				getRoomInstrumentInfo();
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