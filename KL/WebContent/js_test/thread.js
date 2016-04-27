importScripts('import.js');
this.onmessage = function(event){
	console.log('收到数据');
	console.log(event.data);
	var dt = data();
	
	var start = new Date();
	console.log('开始计时-->'+start.getTime());
	var sum=0;
	for(var i=0;i<100000;i++){
		sum += i;
	}
	var end = new Date();
	console.log('结束计时-->'+end.getTime());
	var differ = end.getTime()-start.getTime();
	console.log('时间差:-->'+differ);
	console.log('总和'+sum);
	sendMessage({
		sum:sum
	});
}
function sendMessage(msg){
	this.postMessage(msg);
}