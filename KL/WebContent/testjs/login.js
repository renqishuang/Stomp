function loginFn(btn){
	var userName = $('input[name=user_name]').val();
	var password = $('input[name=user_password]').val();
	/*if(userName == ''){
		alert('请输入用户名');
		return;
	}
	if(password == ''){
		alert('请输入密码');
		return;
	}*/
	console.log('ip---'+ILData[0]);
	console.log('00000');
	return;
	//base64encode, base64decode
	var loginService = 'http://host:port/axis2/services/Login?wsdl';
	var method = 'accountInfo';//方法
	var data = {
		"uname":userName,
		"pwd":password,
		"lc":987897,
		"ip":"192.168.0.1"
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
			console.log("login");
			console.log(data);
			if(state === 0){
				
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
	
	//window.location.href='http://jyw.zlw.com/test/Stomp/KL/WebContent/index.html?a=12344';
}