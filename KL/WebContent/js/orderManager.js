function OMPriceNumberUpMouseOver(div){
	$(div).css('background-image','url(images/NumericSteppersdown1.png)');
}
function OMPriceNumberUpMouseOut(div){
	$(div).css('background-image','url(images/NumericSteppersup.png)');
}
function OMPriceNumberDownMouseOver(div){
	$(div).css('background-image','url(images/NumericStepperxdown.png)');
}
function OMPriceNumberDownMouseOut(div){
	$(div).css('background-image','url(images/NumericStepperxup.png)');
}

function OMVolumeUpMouseOver(div){
	$(div).css('background-image','url(images/NumericSteppersdown1.png)');
}
function OMVolumeUpMouseOut(div){
	$(div).css('background-image','url(images/NumericSteppersup.png)');
}
function OMVolumeDownMouseOver(div){
	$(div).css('background-image','url(images/NumericStepperxdown.png)');
}
function OMVolumeDownMouseOut(div){
	$(div).css('background-image','url(images/NumericStepperxup.png)');
}

function OMPriceNumberUpClick(div){
	var input = $(div).parent().prev();
	input.val(Number(input.val())+1);
}
function OMPriceNumberDownClick(div){
	var input = $(div).parent().prev();
	input.val(Number(input.val())-1);
}
function OMVolumeUpClick(div){
	var input = $(div).parents('.KL_OM_Volume_Number').children('input');
	input.val(Number(input.val())+1);
}
function OMVolumeDownClick(div){
	var input = $(div).parents('.KL_OM_Volume_Number').children('input');
	input.val(Number(input.val())-1);
}
function OMSetMouseOver(div){
	$(div).css('background-image','url(images/order_manager_set_up.png)');
}
function OMSetMouseOut(div){
	$(div).css('background-image','url(images/order_manager_set_down.png)');
}
function OMConditionMouseOver(div){
	$(div).css('background-image','url(images/matiaojian0.png)');
}
function OMConditionMouseOut(div){
	$(div).css('background-image','url(images/matiaojian1.png)');
}
function OMConditionMouseDown(div){
	$(div).css('background-image','url(images/matiaojian1.png)');
	var remodalWrap = $('.remodal');
	if(remodalWrap.length == 0 ) return;
	var titleWrap = remodalWrap.children('.remodal-title');
	titleWrap.html('条件单设置');
	var contentWrap = remodalWrap.children('.remodal-content');
	contentWrap.empty();
}
function OMOrderMouseOver(div){
	$(div).css('background-image','url(images/maxiadan0.png)');
}
function OMOrderMouseOut(div){
	$(div).css('background-image','url(images/maxiadan1.png)');
}
function OMOrderMouseDown(div){
	$(div).css('background-image','url(images/maxiadan1.png)');
	var remodalWrap = $('.remodal');
	if(remodalWrap.length == 0 ) return;
	var titleWrap = remodalWrap.children('.remodal-title');
	titleWrap.html('下单提示');
	var contentWrap = remodalWrap.children('.remodal-content');
	//contentWrap.empty();
}
//订单设置
function OMSetClick(){
	var remodal = $('.remodal');
	if(remodal.length == 0)return;
	var titleWrap = remodal.children('.remodal-title');
	titleWrap.html('系统提示');
	var contentWrap = remodal.children('.remodal-content');
	contentWrap.empty();
	var htmlFrag = "<ul class='order_set'>"+
			  	      "<li><span isClick='false'></span><span>不显示下单提示页</span></li>"+
			  	      "<li><span isClick='false'></span><span>不显示双击平仓提示</span></li>"+
			  	      "<li><span isClick='false'></span><span>不显示开屏弹幕提示</span></li>"+
			  	   "</ul>";
	$(htmlFrag).appendTo(contentWrap);
	contentWrap.find('span:nth-child(1)').click(function(){
		var isClick = $(this).attr('isClick');
		if(isClick === 'true'){
			$(this).attr('isClick',false);
			$(this).css('background-image','url(images/ordertipcb_normal.png)');
		}else{
			$(this).attr('isClick',true);
			$(this).css('background-image','url(images/ordertipcb_selected.png)');
		}
	});
}
function OMBuySellOpenCloseMouseDown(div,type){
	var isClick = $(div).attr('isClick');
	if(isClick == 'true') return;
	switch (type) {
	case 'buy':
		$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_red.png)');
		$(div).find('span:last-child').css('background-image','url(images/xd_mmkp_txtbk_red.png)');
		var nextSibling = $(div).next();
		nextSibling.find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_grey.png)');
		nextSibling.find('span:last-child').css('background-image','none');
		$(div).attr('isClick',true);
		nextSibling.attr('isClick',false);
		break;
	case 'sell':
		$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_green.png)');
		$(div).find('span:last-child').css('background-image','url(images/xd_mmkp_txtbk_green.png)');
		var prevSibling = $(div).prev();
		prevSibling.find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_grey.png)');
		prevSibling.find('span:last-child').css('background-image','none');
		$(div).attr('isClick',true);
		prevSibling.attr('isClick',false);
		break;
	case 'open':
		$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_yellow.png)');
		$(div).find('span:last-child').css('background-image','url(images/xd_mmkp_txtbk_yellow.png)');
		var nextSibling = $(div).next();
		nextSibling.find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_grey.png)');
		nextSibling.find('span:last-child').css('background-image','none');
		$(div).attr('isClick',true);
		nextSibling.attr('isClick',false);
		break;
	case 'close':
		$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_yellow.png)');
		$(div).find('span:last-child').css('background-image','url(images/xd_mmkp_txtbk_yellow.png)');
		var prevSibling = $(div).prev();
		prevSibling.find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_grey.png)');
		prevSibling.find('span:last-child').css('background-image','none');
		$(div).attr('isClick',true);
		prevSibling.attr('isClick',false);
		break;	
	default:
		break;
	}
}
function OMBuySellOpenCloseMouseOver(div,type){
	var isClick = $(div).attr('isClick');
	if(isClick == 'true') return;
	switch (type) {
	case 'sell':
		$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_green.png)');
		$(div).find('span:last-child').css('background-image','url(images/xd_mmkp_txtbk_green.png)');
		break;
	case 'buy':
		$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_red.png)');
		$(div).find('span:last-child').css('background-image','url(images/xd_mmkp_txtbk_red.png)');
		break;
	case 'open':case 'close':
		$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_yellow.png)');
		$(div).find('span:last-child').css('background-image','url(images/xd_mmkp_txtbk_yellow.png)');
		break;
	default:
		break;
	}
}
function OMBuySellOpenCloseMouseOut(div,type){
	var isClick = $(div).attr('isClick');
	if(isClick == 'true') return;
	$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_grey.png)');
	$(div).find('span:last-child').css('background-image','none');
}
function OMPriceTypeMouseDown(div){
	var isClick = $(div).attr('isClick');
	if(isClick === 'false'){
		$(div).css('background-image','url(images/gudingjia.png)');
		$(div).attr('isClick',true);
	}else{
		$(div).css('background-image','url(images/gensuijia.png)');
		$(div).attr('isClick',false);
	}
	
}
function orderManagerLeftRegionStyle(wrap){
	var navs = $(wrap[0]).find('div:first-child span');
	for(var i=0;i<navs.length;i++){
		var nav =$(navs[i]);
		if(nav.attr('isClick') == 'true'){
			nav.css('border','none');
			nav.css('background-color','transparent');
			nav.attr('isClick',false);
			switch (nav.attr('name')) {
			case 'convenience':
				$('.Order_Manager_TB_Convenience').hide();
				break;
			case 'delegation':
				$('.Order_Manager_TB_Delegation').hide();			
				break;
			case 'bargain':
				$('.Order_Manager_TB_Bargain').hide();
				break;
			case 'position':
				$('.Order_Manager_TB_Position').hide();
				break;
			case 'condition':
				$('.Order_Manager_TB_Condition').hide();
				break;
			default:
				break;
			}
		}
	}
}

//订单其左侧部分点击事件
function orderManagerLeftRegion(wrap){
	var navs = $(wrap[0]).find('div:first-child span');
	for(var i=0;i<navs.length;i++){
		var nav =$(navs[i]);
		nav.attr('isClick',false);
		nav.click(function(){
			if($(this).attr('isClick') == 'true'){
				return;
			}
			//wrap.append(getOrderManagerConditionTpl());
			orderManagerLeftRegionStyle(wrap);
			$(this).css('border','1px solid #8393AA');
			$(this).css('border-bottom','none');
			$(this).css('background-color','white');
			$(this).attr('isClick',true);
			
			switch ($(this).attr('name')) {
			case 'convenience':
				$('.Order_Manager_TB_Convenience').show();
				break;
			case 'delegation':
				$('.Order_Manager_TB_Delegation').show();
				break;
			case 'bargain':
				$('.Order_Manager_TB_Bargain').show();
				break;
			case 'position':
				$('.Order_Manager_TB_Position').show();
				break;
			case 'condition':
				$('.Order_Manager_TB_Condition').show();
				break;
			default:
				break;
			}
		});
	}
	//默认触发 快捷 按钮
	$(navs[0]).trigger('click');
}

//下单器右边区域事件设置
function orderManagerRightRegion(wrap){
	//给合约添加事件
	var select = $(wrap[0]).find('select');
	$(select[0]).mouseover(function(){
		$(this).css('border','2px solid black');
		$(this).css('border-radius','4px');
		$(this).css('background-color','white');
	})
	$(select[0]).mouseout(function(){
		$(this).css('border','1px solid rgb(169, 169, 169)');
		$(this).css('border-radius','0px');
		$(this).css('background-color','#F1F5FB');
	})
	//给买卖添加事件
	var buySellRadios = $(wrap[0]).find('>div > label'),buySellRadioLen = buySellRadios.length;
	for(var i=0;i<buySellRadios.length;i++){
		var radio = $(buySellRadios[i]);
		radio.mousedown(function(){
			var radio = $(this).find('input[type=radio]');
			if(radio[0].checked) return;
			var val = $(radio[0]).val();
			switch (val) {
			case 'OrderManager_Buy':
				$(radio[0]).next().css('background','#E16363');
				$(radio[0]).parent().next().find('span').css('background','white');
				break;
			case 'OrderManager_Sell':
				$(radio[0]).next().css('background','#56DF8C');
				$(radio[0]).parent().prev().find('span').css('background','white');
				break;
			case 'OrderManager_Open':
				$(radio[0]).next().css('background','#FBD03A');		
				$(radio[0]).parent().next().find('span').css('background','white');
				break;
			case 'OrderManager_Close':
				$(radio[0]).next().css('background','#FBD03A');
				$(radio[0]).parent().prev().find('span').css('background','white');
				break;
			default:
				break;
			}
		});
	}
	//添加 鼠标移入和移出事件
	var labelSpans = $(wrap[0]).find('>div>label>span'),labelSpanLen = labelSpans.length;
	for(var i=0;i<labelSpanLen;i++){
		var span = $(labelSpans[i]);
		span.mouseover(function(){
			var radio = $(this).prev()[0];
			if(radio.checked) return;
			var color='';
			var val = $(radio).val();
			if(val == 'OrderManager_Buy'){
				color='#E16363';
			}else if(val == 'OrderManager_Sell'){
				color='#56DF8C';
			}else if(val == 'OrderManager_Open'){
				color='#FBD03A';
			}else if(val == 'OrderManager_Close'){
				color='#FBD03A';
			}
			$(this).css('background-color',color);
		});
		span.mouseout(function(){
			var radio = $(this).prev()[0];
			if(radio.checked) return;
			$(this).css('background-color','white');
		});
	}
	
	//默认选中  买和开仓
	var radioLabels = $(wrap[0]).find('>div>label>input[type=radio]'),radioLabelLen = radioLabels.length;
	for(var i=0;i<radioLabelLen;i++){
		var radio = radioLabels[i];
		var val = radio.getAttribute('value');
		if(val == 'OrderManager_Buy'){
			$(radio).next().css('background-color','#E16363');
		}else if(val == 'OrderManager_Open'){
			$(radio).next().css('background-color','#FBD03A');
		}
	}
}
function tradeInfoMPHandler(data){
	var shortCutWrap = $('.TradeInfo_MP');
	var mpWrap = $('.Order_Manager_TB_Position');
	if(shortCutWrap.length == 0 || mpWrap.length == 0) return;
	var len = data.length;
	for(var i=0;i<len;i++){
		var dt = data[i];
		//var avgprice = dt.avgprice;
		shortCutWrap.find('tr').eq(i+1).css('background-color','#E3FFEA');
		shortCutWrap.find('tr').eq(i+1).find('td:last-child').html(dt.avgprice);
		shortCutWrap.find('tr').eq(i+1).find('td:nth-last-child(2)').html(dt.volfcls);
		shortCutWrap.find('tr').eq(i+1).find('td:first-child').html(dt.iid);
		shortCutWrap.find('tr').eq(i+1).find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		shortCutWrap.find('tr').eq(i+1).find('td:nth-child(3)').html(dt.vol);
		
		mpWrap.find('tr').eq(i+1).css('background-color','#E3FFEA');
		mpWrap.find('tr').eq(i+1).find('td:first-child').html(dt.iid);
		mpWrap.find('tr').eq(i+1).find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		mpWrap.find('tr').eq(i+1).find('td:nth-child(3)').html(dt.vol);
		mpWrap.find('tr').eq(i+1).find('td:nth-child(4)').html(dt.volfcls);
		mpWrap.find('tr').eq(i+1).find('td:nth-child(5)').html(dt.avgprice);
		mpWrap.find('tr').eq(i+1).find('td:nth-child(6)').html(dt.floatprofit);
		mpWrap.find('tr').eq(i+1).find('td:nth-child(7)').html(dt.deposit);
	}
}

//获取快捷, 持仓信息
function getTradeInfoMP(){
	//return;
	var method = 'tradeInfo';//方法
	var data = {
		/*"uid":3018,
		"aid":2380,
		"oper":"getMP",
		"rmc":99839,
		"lc":"lkajoasd8"*/
			"rid":1553,
			"aid":3179,
			"uid":3018,
			"lc":"lkajoasd8",
			"rmc":4928,
			"oper":"getMP"
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
			console.log('get mp');
			console.log(data);
			if(state === 0){
				var res=data.res,dt=res.data;
				if(!dt) return;
				tradeInfoMPHandler(dt);
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

function tradeInfoPDHandler(data){
	var wrap = $('.TradeInfoPendingDepute');
	if(wrap.length == 0) return;
	var len = data.length;
	for(var i=0;i<len;i++){
		var dt=data[i];
		wrap.find('tr').eq(i+1).css('background-color','#E3FFEA');
		wrap.find('tr').eq(i+1).find('td:first-child').html(dt.iid);
		wrap.find('tr').eq(i+1).find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		wrap.find('tr').eq(i+1).find('td:nth-child(3)').html(dt.co==0?'开仓':'平仓');
		wrap.find('tr').eq(i+1).find('td:nth-last-child(2)').html(dt.dvol);
		wrap.find('tr').eq(i+1).find('td:last-child').html(dt.dprice);
	}
}

//委托挂单
function getTradeInfoPendingDepute(){
	var method = 'tradeInfo';//方法
	/*var data = {
		"uid":3018,
		"aid":2380,
		"oper":"getMP",
		"rmc":99839,
		"lc":"lkajoasd8"
	};*/
	var data = {
		"rid":1553,
		"aid":3179,
		"uid":3018,
		"lc":"lkajoasd8",
		"rmc":4928,
		"oper":"getPendingDepute"
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
			console.log('get pending depute');
			console.log(data);
			if(state === 0){
				var res=data.res,dt=res.data;
				if(!dt) return;
				tradeInfoPDHandler(dt);
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
function tradeInfoAllDeputeHandler(data){
	var wrap = $('.Order_Manager_TB_Delegation');
	if(wrap.length == 0) return;
	var i=0,len = data.length;
	for(;i<len;i++){
		var dt=data[i];
		wrap.find('tr').eq(i+1).css('background-color','#E3FFEA');
		wrap.find('tr').eq(i+1).find('td:first-child').html(dt.iid);
		wrap.find('tr').eq(i+1).find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		wrap.find('tr').eq(i+1).find('td:nth-child(3)').html(dt.co==0?'开仓':'平仓');
		var state;
		if(dt.status == 1){
			state = '报销';
		}else if(dt.status == 2){
			state = '撤单';
		}else if(dt.status == 3){
			state = '成交';
		}
		wrap.find('tr').eq(i+1).find('td:nth-child(4)').html(state);
		wrap.find('tr').eq(i+1).find('td:nth-child(5)').html(dt.dprice);
		wrap.find('tr').eq(i+1).find('td:nth-child(6)').html(dt.dtime);
		wrap.find('tr').eq(i+1).find('td:nth-child(7)').html(dt.otime);
		wrap.find('tr').eq(i+1).find('td:nth-child(8)').html(dt.tvol);
		wrap.find('tr').eq(i+1).find('td:nth-child(9)').html(dt.volfcls);
		wrap.find('tr').eq(i+1).find('td:nth-child(10)').html(dt.otime);
		wrap.find('tr').eq(i+1).find('td:nth-child(11)').html(dt.dvol);
		wrap.find('tr').eq(i+1).find('td:nth-child(12)').html(dt.did);
		wrap.find('tr').eq(i+1).find('td:nth-child(13)').html(dt.comment);
	}
}

//当日委托
function getTradeInfoAllDepute(){
	var method = 'tradeInfo';//方法
	/*var data = {
		"uid":3018,
		"aid":2380,
		"oper":"getMP",
		"rmc":99839,
		"lc":"lkajoasd8"
	};*/
	var data = {
			"rid":1553,
			"aid":3179,
			"uid":3018,
			"lc":"lkajoasd8",
			"rmc":4928,
			"oper":"getAllDepute"
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
			console.log('get all deputes');
			console.log(data);
			if(state === 0){
				var res=data.res,dt=res.data;
				if(!dt) return;
				tradeInfoAllDeputeHandler(dt);
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
function tradeInfoOrderHandler(data){
	var wrap = $('.Order_Manager_TB_Bargain');
	if(wrap.length == 0) return;
	var i=0,len=data.length;
	for(;i<len;i++){
		wrap.find('tr').eq(i+1).css('background-color','#E3FFEA');
		wrap.find('tr').eq(i+1).find('td:first-child').html(dt.iid);
		wrap.find('tr').eq(i+1).find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		wrap.find('tr').eq(i+1).find('td:nth-child(3)').html(dt.co==0?'开仓':'平仓');
		wrap.find('tr').eq(i+1).find('td:nth-child(4)').html(data.price);
		wrap.find('tr').eq(i+1).find('td:nth-child(5)').html(dt.volfcls);
		wrap.find('tr').eq(i+1).find('td:nth-child(6)').html(dt.otime);
		wrap.find('tr').eq(i+1).find('td:nth-child(7)').html(dt.otime);//成交编号没找到
		wrap.find('tr').eq(i+1).find('td:nth-child(8)').html(dt.did);
		
		wrap.find('tr').eq(i+1).find('td:nth-child(9)').html(dt.dtime);
		wrap.find('tr').eq(i+1).find('td:nth-child(10)').html(dt.dprice);
		wrap.find('tr').eq(i+1).find('td:nth-child(11)').html(dt.tfee);
		wrap.find('tr').eq(i+1).find('td:nth-child(12)').html(dt.comment);
	}
}
//当日成交
function getTradeInfoAllOrder(){
	var method = 'tradeInfo';//方法
	/*var data = {
		"uid":3018,
		"aid":2380,
		"oper":"getMP",
		"rmc":99839,
		"lc":"lkajoasd8"
	};*/
	var data = {
			"aid":2380,
			"uid":11112,
			"roomid":1374,
			"rid":1374,
			"lc":"e288abe2e13f318f161a5ca286386248",
			"rmc":42152,
			"oper":"getAllOrder",
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
		timeout:AjaxTimeOut, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			console.log('get all order');
			console.log(data);
			if(state === 0){
				var res=data.res,dt=res.data;
				if(!dt) return;
				tradeInfoOrderHandler(dt);
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
function tradeInfoConOrderHandler(data){
	var wrap = $('.Order_Manager_TB_Condition');
	if(wrap.length == 0) return;
	var i=0;len=data.length;
	for(;i<len;i++){
		/*wrap.find('tr').eq(i+1).css('background-color','#E3FFEA');
		wrap.find('tr').eq(i+1).find('td:first-child').html(dt.iid);
		wrap.find('tr').eq(i+1).find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		wrap.find('tr').eq(i+1).find('td:nth-child(3)').html(dt.co==0?'开仓':'平仓');
		wrap.find('tr').eq(i+1).find('td:nth-child(4)').html(data.price);
		wrap.find('tr').eq(i+1).find('td:nth-child(5)').html(dt.volfcls);
		wrap.find('tr').eq(i+1).find('td:nth-child(6)').html(dt.otime);
		wrap.find('tr').eq(i+1).find('td:nth-child(7)').html(dt.otime);//成交编号没找到
		wrap.find('tr').eq(i+1).find('td:nth-child(8)').html(dt.did);
		wrap.find('tr').eq(i+1).find('td:nth-child(9)').html(dt.dtime);*/
	}
}

//条件单查询
function getTradeInfoConOrder(){
	var method = 'tradeInfo';//方法
	/*var data = {
		"uid":3018,
		"aid":2380,
		"oper":"getMP",
		"rmc":99839,
		"lc":"lkajoasd8"
	};*/
	var data = {
		"rmc":44506,
		"roomid":1374,
		"rid":1374,
		"lc":"b4423db756953808eb602c1e52e1b935",
		"uid":11112,
		"oper":"getConditionOrder",
		"userid":11112,
		"aid":2380
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
			console.log('get condition order');
			console.log(data);
			if(state === 0){
				var res=data.res,dt=res.data;
				if(!dt) return;
				
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