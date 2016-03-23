//委托挂单通知
/*function pendingDeputeOrderNotify1(){
	var pendingDeputeFrag = "<div class='order-dashed-wrap'></div>";
	//CanvasPagePosition
	$('body').append($(pendingDeputeFrag));
	var wrap = $('.order-dashed-wrap');
	var width = CanvasPagePosition.width-GlobalKLOptionObj.region.x;
	wrap.css('width',width);
	var left = CanvasPagePosition.x+GlobalKLOptionObj.region.x;
	wrap.css('left',left);
	var top = CanvasPagePosition.y+CurrentKLObj.getYCoordByPrice(305);
	wrap.css('top',top);
	
	return;
	var htmlFrag = "<div class='order_notify_wrap'>"+
			"<span value='iid'>i1609</span>"+
			"<span value='img'></span>"+
			"<span value='dir'>多</span>"+
			"<span value='co'>开</span>"+
			"<span value='price'>430</span>"+
			"<span value='vol'>1</span>"+
			"<span>手</span>"+
			"<span value='time'>11:26:20</span>"+
		"</div>";
	$('body').append($(htmlFrag));
	setTimeout(function(){
		//$('.order_notify_wrap').remove();
	},3000);
}*/
$('.remodal-confirm').click(function(){
	var prev = $(this).prev();
	var remodalType = prev.attr('remodalConType');
	if(remodalType == 'order'){
		var remodalOrderWrap = prev.find('.remodal-order');
		var iid = remodalOrderWrap.attr('instrument'),
			dir = remodalOrderWrap.attr('dir'),
			co = remodalOrderWrap.attr('co'),
			price = remodalOrderWrap.attr('price'),
			vol = remodalOrderWrap.attr('volume');
		//下单
		var method = 'trade';//方法
		var data = {
			"vol":Number(vol),
			"otype":0,
			"lc":CurrentLC,
			"rmc":CurrentRMC,
			"rid":CurrentRoomID,
			"iid":iid,
			"aid":CurrentAccountID,
			/*"user":CurrentUserId,*/
			"dir":Number(dir),
			"action":1,
			"co":Number(co),
			"uid":CurrentUserId,
			"dprice":price,
			"pricetype":0
		};
		var param = JSON.stringify(data);
		console.log(data);
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
				console.log('trade order');
				console.log(data);
				//添加页面提示
				//confirmOrderNotify();
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
});
$('.remodal-order>div:last-child>span').click(function(){
	$(this).css('background-image','');
});