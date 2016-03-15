onmessage = function(evt){
	 var xhr = new XMLHttpRequest();
	 xhr.onreadystatechange = function () {
         if (xhr.readyState == 4) {
             var status = xhr.status;
             if (status >= 200 && status < 300) {
            	 console.log(xhr.responseText);
                 //options.success && options.success(xhr.responseText, xhr.responseXML);
             } else {
                 options.fail && options.fail(status);
             }
         }
     }
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
	var params = {
		ws_url:'http://192.168.1.227:8888/axis2/services/SimTrade?wsdl',
		ws_func:method,
		ws_param:param
	};
	 xhr.open("POST", 'http://jyw.zlw.com/call_ws/output', true);
	 xhr.send(JSON.stringify(params));
    var data = evt.data;
    data.id++;
    //var $ = data.obj;
    return;
	$.ajax({
		url:WSFullUrl+'/call_ws/output',
		type:'post',
		dataType:"json",
		//async:false,//同步请求
		data:{
			ws_url:WSTradeUrl,
			ws_func:method,
			ws_param:param
		},
		timeout:5000, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			console.log("get account info data");
			console.log(data);
		},
		error:function(xhr,state){
			console.log("get data error");
			alert("请求服务器出错");
		},
		complete:function(xhr,state){
			//console.log('get data complete');
		}
	});
    
}