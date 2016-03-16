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
function setAccountInfo(){
	var method = 'accountInfo';//方法
	var data = {
		"lc":"24a9ac1d9c8e2e3c6f355e78a4526428",
		"roomid":1374,
		"uid":11112,
		"aid":2380,
		"rmc":93935,
		"rid":1374,
		"userid":11112
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
		timeout:5000, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			//console.log("get account info data");
			//console.log(data);
			if(state === 0){
				setInitAccountInfo(data.res);
				//监听资金数据
				if(!TradeWSClient) return;
				console.log("添加 资金数据监听--------->");
				var MQAccountSub = TradeWSClient.subscribe('/topic/'+AccountAID,function(message){
					var tempData = message.body;
					console.log(tempData);
					setInitAccountInfo(JSON.parse(tempData));
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