function monitorCashData(){
	var url='ws://192.168.1.18:8080/fx.backend/ws';
	//var url='ws://mq1.zlw.com:61634';
	function success(){
		console.log('-open');
	}
	function fail(){
		console.log('-fail');
	}
	function message(msg){
		var data = msg.data;
		if(data){
			data = JSON.parse(data);
			var dataType = data.op;
			console.log(data);
			if(dataType === 'sympos'){
				updateCashData(data);
			}else if(dataType === 'warn'){
				updatePandectWarnData(data);
			}else if(dataType === 'pending'){
				updatePandectPendData(data);
			}
		}
		//console.log(msg);
		console.log('-message');
	}
	function close(event){
		console.log('-close');
	}
	WSClient.connect(url,success,fail,message,close);
}