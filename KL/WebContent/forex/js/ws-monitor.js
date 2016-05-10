function monitorCashData(){
	var url='ws://192.168.1.18:8080/fx.backend/ws';
	//var url='ws://mq1.zlw.com:61634';
	function WS_Success(client){
		console.log('-open');
		ForexWSClient=client;
	}
	function WS_Fail(){
		console.log('-fail');
	}
	function WS_Message(msg){
		var data = msg.data;
		if(data){
			data = JSON.parse(data);
			var dataType = data.op;
			//console.log(dataType);
			if(dataType === 'sympos'){
				updateCashData(data);
			}else if(dataType === 'warn'){
				updatePandectWarnData(data);
			}else if(dataType === 'pending'){
				updatePandectPendData(data);
			}else if(dataType === 'count'){
				//console.log(data);
				updateCornerMarkCount(data);
			}else if(dataType === 'alldata'){
				//console.log(data);
				updateAllAccountData(data);
			}else if(dataType === 'riskdata'){
				//console.log(data);
				updateRiskAccountData(data);
			}else if(dataType === 'alertwarn'){
				console.log(data);
				alertWarnFn(data);
			}
		}
		//console.log(msg);
		//console.log('-message');
	}
	function WS_Close(event){
		console.log('-close');
		ForexWSClient=null;
	}
	ForexWSClient=CreateWSClient.create();
	//ForexWSClient = new WSClient();
	ForexWSClient.connect(url,WS_Success,WS_Fail,WS_Message,WS_Close);
}