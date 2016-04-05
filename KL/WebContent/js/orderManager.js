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
	//CurrentInstrumentID
	/*var instruInfoLen = RoomInstrumentListInfo.length;
	for(var i=0;i<)*/
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
	contentWrap.attr('remodalConType','condition');
	contentWrap.empty();
	//remodalConditionPriceClick
	//remodalConditionPriceOver
	//remodalConditionPriceOut
	var htmlFrag = "<div class='remodal-condition-order-wrap'>"+
	  	   	   "<div>当行情满足以下条件时:</div>"+
	  	   	   "<div>"+
	  	   	   		"<font>当最新价</font>"+
	  	   	   		"<select>"+
		  	   	   		"<option value='dayu'>&gt;</option>"+
		  	   	   		"<option value='dayudengyu'>&gt;=</option>"+
		  	   	   		"<option value='xiaoyu'>&lt;</option>"+
		  	   	   		"<option value='xiaoyudengyu'>&lt;=</option>"+
		  	   	   "</select>"+
		  	   	   "<div class='remodal-condition-price'>"+
		  	   	   		"<input type='text' name='price'>"+
		  	   	   		"<div>"+
		  	   	   			"<div value='up'></div>"+
		  	   	   			"<div value='down'></div>"+
		  	   	   		"</div>"+
		  	   	   "</div>"+
		  	   	   "<font>时</font>"+
	  	   	   "</div>"+
	  	   	    "<div>"+
	  	   	    	"<span>按</span>"+
	  	   	    	"<span value='price'></span>"+
	  	   	    	"<span>价格</span>"+
	  	   	    	"<span>,</span>"+
	  	   	    	"<span value='dir'></span>"+
	  	   	    	"<span value='iid'></span>"+
	  	   	    	"<span value='co'></span>"+
	  	   	    	"<span value='vol'></span>"+
	  	   	    	"<span>手</span>"+
	  	   	    "</div>"+
	  	   "</div>";
	contentWrap.append($(htmlFrag));
	var conditionOrderWrap = $('.remodal-condition-order-wrap');
	var priceWrap = $('.remodal-condition-price'),
		upDiv=priceWrap.find('div[value=up]'),
		downDiv=priceWrap.find('div[value=down]');
	//priceWrap.find('div[value=up]')
	upDiv.bind('click',function(){
		remodalConditionPriceClick($(this),'up');
	});
	
	upDiv.bind('mouseover',function(){
		remodalConditionPriceOver($(this),'up');
	});
	upDiv.bind('mouseout',function(){
		remodalConditionPriceOut($(this),'up');
	});
	downDiv.bind('click',function(){
		remodalConditionPriceClick($(this),'down');
	});
	
	downDiv.bind('mouseover',function(){
		remodalConditionPriceOver($(this),'down');
	});
	downDiv.bind('mouseout',function(){
		remodalConditionPriceOut($(this),'down');
	});
	
	var orderWrap = $('.KL_OrderManager_SecondWrap');
	if(orderWrap.length == 0) return;
	var iidVal = orderWrap.find('select').val(),
		price = orderWrap.find('.KL_OM_Price_Number input').val(),
		dir=orderWrap.find('div:nth-child(2) div[isClick=true]').attr('value');
		co=orderWrap.find('div:nth-child(3) div[isClick=true]').attr('value'),
		vol=orderWrap.find('.KL_OM_Volume_Number input').val();
	conditionOrderWrap.find('span[value=iid]').html(iidVal);
	conditionOrderWrap.find('span[value=price]').html(price);
	conditionOrderWrap.find('input[name=price]').val(price);
	conditionOrderWrap.find('span[value=dir]').html(dir==0?'买':'卖');
	conditionOrderWrap.find('span[value=co]').html(co==0?'开仓':'平仓');
	conditionOrderWrap.find('span[value=vol]').html(vol);
}
function OMOrderMouseOver(div){
	$(div).css('background-image','url(images/maxiadan0.png)');
}
function OMOrderMouseOut(div){
	$(div).css('background-image','url(images/maxiadan1.png)');
}
//下单接口调用
function OMOrderService(iid,dir,co,price,vol){
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
			if(state == 0){
				var res = data.res,
				returncode = res.returncode;
				if(returncode == 99){//非交易时间, 下单失败
					RemodalInstance.open();
					var remodalWrap = $('.remodal');
					var titleWrap = remodalWrap.children('.remodal-title');
					titleWrap.html('下单提示');
					var contentWrap = remodalWrap.children('.remodal-content');
					contentWrap.attr('remodalConType','invalid');
					contentWrap.empty();
					var htmlFrag = "<div class='remodal-order-fail'>非交易时间， 无法下单"+
						"</div>";
					contentWrap.append($(htmlFrag));
				}
			}
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

//弹出下单页面
function OMOrderMouseDown(){
	//$(div).css('background-image','url(images/maxiadan1.png)');
	var remodalWrap = $('.remodal');
	if(remodalWrap.length == 0 ) return;
	var titleWrap = remodalWrap.children('.remodal-title');
	titleWrap.html('下单提示');
	var contentWrap = remodalWrap.children('.remodal-content');
	contentWrap.attr('remodalConType','order');
	contentWrap.empty();
	var htmlFrag = "<div class='remodal-order'>"+
			  	   		"<div>"+
			  	   			"按<span></span>价格, <span></span>"+
			  	   		"<span></span><span></span><span></span>手"+
			  	   		"</div>"+
			  	   		"<div name='checkbox-wrap' isClick='false'>"+
			  	   			"<span></span>不显示下单提示页"+
			  	   		"</div>"+
			  	   "</div>";
	contentWrap.append($(htmlFrag));
	var checkBoxWrap =contentWrap.find('div[name=checkbox-wrap]');
	checkBoxWrap.css('cursor','pointer');
	checkBoxWrap.bind('click',function(){
		var isClick = $(this).attr('isClick');
		if(isClick === 'true'){
			$(this).attr('isClick',false);
			$(this).find('span:first-child').css('background-image','url(images/ordertipcb_normal.png)');
		}else{
			$(this).attr('isClick',true);
			$(this).find('span:first-child').css('background-image','url(images/ordertipcb_selected.png)');
		}
	});
	var orderWrap = $('.KL_OrderManager_SecondWrap');
	if(orderWrap.length == 0) return;
	//合约
	var instrumentSelect = orderWrap.find('select.Order_Instrument_Select');
	var instrumentVal = instrumentSelect.val();
	var buySell = orderWrap.find('>div:nth-child(2)>div'),buySellLen=buySell.length;
	var buySellVal;
	//买-卖
	for(var i=0;i<buySellLen;i++){
		var radioDiv = buySell[i];
		if($(radioDiv).attr('isClick') == 'true') 
			buySellVal=$(radioDiv).find('span:last-child').attr('value');
	}
	//开仓-平仓
	var openClose = orderWrap.find('>div:nth-child(3)>div'),openCloseLen=openClose.length;
	var openCloseVal;
	for(var i=0;i<openCloseLen;i++){
		var radioDiv = openClose[i];
		if($(radioDiv).attr('isClick') == 'true')
			openCloseVal = $(radioDiv).find('span:last-child').attr('value');
	}
	//价格
	var priceInput = orderWrap.find('div.KL_OM_Price_Number input[type=text]');
	var priceVal = priceInput.val();
	//手数
	var volumeInput = orderWrap.find('div.KL_OM_Volume_Number input[type=text]');
	var volumeVal = volumeInput.val();
	
	var remodalOrderWrap = contentWrap.find('.remodal-order');
	var remodalOrderInnerWrap = remodalOrderWrap.find('>div:first-child');
	remodalOrderInnerWrap.find('>span:first-child').html(' '+priceVal+' ');
	remodalOrderInnerWrap.find('>span:nth-child(2)').html(buySellVal == '0'?'买':'卖');
	remodalOrderInnerWrap.find('>span:nth-child(3)').html(' '+instrumentVal+' ');
	remodalOrderInnerWrap.find('>span:nth-child(4)').html(openCloseVal=='0'?'开仓':'平仓');
	remodalOrderInnerWrap.find('>span:nth-child(5)').html(' '+volumeVal+' ');
	
	remodalOrderWrap.attr('instrument',instrumentVal);
	remodalOrderWrap.attr('dir',buySellVal);
	remodalOrderWrap.attr('co',openCloseVal);
	remodalOrderWrap.attr('price',priceVal);
	remodalOrderWrap.attr('volume',volumeVal);
}
//订单设置
function OMSetClick(){
	var remodal = $('.remodal');
	if(remodal.length == 0)return;
	var titleWrap = remodal.children('.remodal-title');
	titleWrap.html('系统提示');
	var contentWrap = remodal.children('.remodal-content');
	contentWrap.attr('remodalConType','set');
	contentWrap.empty();
	var htmlFrag = "<ul class='order_set'>"+
			  	      "<li><div isClick='false'><span></span><span>不显示下单提示页</span></div></li>"+
			  	      "<li><div isClick='false'><span></span><span>不显示双击平仓提示</span></div></li>"+
			  	      "<li><div isClick='false'><span></span><span>不显示开屏弹幕提示</span></div></li>"+
			  	   "</ul>";
	$(htmlFrag).appendTo(contentWrap);
	contentWrap.find('div').css('cursor','pointer');
	contentWrap.find('div').click(function(){
		var isClick = $(this).attr('isClick');
		if(isClick === 'true'){
			$(this).attr('isClick',false);
			$(this).find('span:first-child').css('background-image','url(images/ordertipcb_normal.png)');
		}else{
			$(this).attr('isClick',true);
			$(this).find('span:first-child').css('background-image','url(images/ordertipcb_selected.png)');
		}
	});
}
//计算持仓手数
function calcMPVol(div,dir){
	//计算手数
	var parent = $(div).parent(),
		parentNext = parent.next(),
		coDiv = parentNext.find('div[isClick=true]'),
		coVal = coDiv.attr('value'),
		volWrap = $('.KL_OM_Volume_Number'),
		spanVolWrap = volWrap.prev();
	if(coVal == 1){
		var table = $('.TradeInfo_MP'),
		trList = table.find('tr:not(:first-child)'),
		trLen = trList.length;
		for(var i=0;i<trLen;i++){
			var tr = trList.eq(i);
			var trDt = tr.attr('trDt');
			if(!trDt) continue;
			trDt = JSON.parse(trDt);
			if(trDt.iid == CurrentInstrumentID && trDt.dir == dir){
				var vol = trDt.vol;
				volWrap.find('input').val(vol);
				spanVolWrap.html(vol);
			}
		}
	}
}
//计算开仓手数
function calcOpenVolumeFn(){
	var instruInfo = RoomInstrumentListInfo[CurrentInstrumentID];
	var price = instruInfo.price,
		volmul = instruInfo.volmul,
		deprate = instruInfo.deprate;
	var priceWrap = $('.KL_OM_Price_Number'),
		price = Number(priceWrap.find('input').val());
	var divisor = price*volmul*deprate;
	var volWrap = $('.KL_OM_Volume_Number');
	var spanVolWrap = volWrap.prev();
	if(divisor == 0){
		spanVolWrap.html(0);
		volWrap.find('input').val(0);
		return;
	}
	var maxVol = parseInt(AvalibleAmount / divisor);
	spanVolWrap.html(maxVol);
	volWrap.find('input').val(maxVol);
}

//买卖开平事件
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
		calcMPVol(div,1);
		break;
	case 'sell':
		$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_green.png)');
		$(div).find('span:last-child').css('background-image','url(images/xd_mmkp_txtbk_green.png)');
		var prevSibling = $(div).prev();
		prevSibling.find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_grey.png)');
		prevSibling.find('span:last-child').css('background-image','none');
		$(div).attr('isClick',true);
		prevSibling.attr('isClick',false);
		calcMPVol(div,0);
		break;
	case 'open':
		$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_yellow.png)');
		$(div).find('span:last-child').css('background-image','url(images/xd_mmkp_txtbk_yellow.png)');
		var nextSibling = $(div).next();
		nextSibling.find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_grey.png)');
		nextSibling.find('span:last-child').css('background-image','none');
		$(div).attr('isClick',true);
		nextSibling.attr('isClick',false);
		//计算手数
		calcOpenVolumeFn();
		break;
	case 'close':
		$(div).find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_yellow.png)');
		$(div).find('span:last-child').css('background-image','url(images/xd_mmkp_txtbk_yellow.png)');
		var prevSibling = $(div).prev();
		prevSibling.find('span:first-child').css('background-image','url(images/xd_mmkp_selbk_grey.png)');
		prevSibling.find('span:last-child').css('background-image','none');
		$(div).attr('isClick',true);
		prevSibling.attr('isClick',false);
		//计算手数
		var table = $('.TradeInfo_MP'),
			trList = table.find('tr:not(:first-child)'),
			trLen = trList.length,
			parent = $(div).parent(),
			parentPrev = parent.prev();
		var dirVal = parentPrev.find('div[isClick=true]').attr('value');
		dirVal = dirVal==0?1:0;
		var volWrap = $('.KL_OM_Volume_Number');
		var spanVolWrap = volWrap.prev();
		for(var i=0;i<trLen;i++){
			var tr = trList.eq(i);
			var trDt = tr.attr('trDt');
			if(!trDt) continue;
			trDt = JSON.parse(trDt);
			if(trDt.iid == CurrentInstrumentID && trDt.dir == dirVal){
				var vol = trDt.vol;
				volWrap.find('input').val(vol);
				spanVolWrap.html(vol);
			}
		}
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
				//委托挂单
				getTradeInfoPendingDepute();
				//持仓信息
				getTradeInfoMP();
				break;
			case 'delegation':
				$('.Order_Manager_TB_Delegation').show();
				getTradeInfoAllDepute();
				break;
			case 'bargain':
				$('.Order_Manager_TB_Bargain').show();
				getTradeInfoAllOrder();
				break;
			case 'position':
				$('.Order_Manager_TB_Position').show();
				//持仓信息
				getTradeInfoMP();
				break;
			case 'condition':
				$('.Order_Manager_TB_Condition').show();
				getTradeInfoConOrder();
				break;
			default:
				break;
			}
		});
	}
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
function tradeInfoMPTrDBLHandler(tr){
	console.log('dblclick');
	RemodalInstance.open();
	//调用下单界面
	OMOrderMouseDown();
	//OMOrderService(iid,dir,co,price,vol)
}

function tradeInfoMPTrHandler(tr){
	var trDt = JSON.parse(tr.attr('trDt'));
	console.log('click');
	var wrap = $('.KL_OrderManager_SecondWrap');
	if(wrap.length == 0) return;
	var dir = trDt.dir,
	dirValue = dir==0?'1':'0',
	dirStr = dir==0?'sell':'buy',
	dirDiv = wrap.find('>div:nth-child(2)').find('div[value='+dirValue+']'),
	iid = trDt.iid;
	//设置合约
	var selectWrap = wrap.find('select');
	selectWrap.val(iid);
	orderInstrumentSwitch(selectWrap[0])
	//触发买卖
	OMBuySellOpenCloseMouseDown(dirDiv[0],dirStr);
	var coDiv = wrap.find('>div:nth-child(3)').find('div[value=1]');
	//触发开平
	OMBuySellOpenCloseMouseDown(coDiv[0],'close');
	//手数
	var volWrap = wrap.find('span[name=kl_om_vol_wrap]');
	volWrap.html(trDt.vol);
	var volInputWrap = $('.KL_OM_Volume_Number');
	volInputWrap.find('input').val(trDt.vol);
	//
}

function tradeInfoMPHandler(data){
	var shortCutWrap = $('.TradeInfo_MP');
	var mpWrap = $('.Order_Manager_TB_Position');
	//清空快捷页里面持仓所有数据及事件
	var shortCutTrList = shortCutWrap.find('tr:not(:first-child)'),
	shortCutTrLen = shortCutTrList.length;
	for(var i=0;i<shortCutTrLen;i++){
		var shortCutTr = shortCutTrList.eq(i);
		shortCutTr.css('background-color','white');
		shortCutTr.unbind('mouseover');
		shortCutTr.unbind('mouseout');
		shortCutTr.unbind('dblclick');
		shortCutTr.unbind('click');
		shortCutTr.find('td').html('');
		shortCutTr.attr('isClick',false);
	}
	//清空持仓Tab页里面的所有数据及事件
	var mpTrList = mpWrap.find('table').find('tr:not(:first-child)'),mpTrLen=mpTrList.length;
	for(var i=0;i<mpTrLen;i++){
		var mpTr = mpTrList.eq(i);
		mpTr.css('background-color','white');
		mpTr.unbind('mouseover');
		mpTr.unbind('mouseout');
		mpTr.unbind('dblclick');
		mpTr.unbind('click');
		mpTr.find('td').html('');
		mpTr.attr('isClick',false);
	}
	
	if(shortCutWrap.length == 0 || mpWrap.length == 0) return;
	var len = data.length;
	
	for(var i=0;i<len;i++){
		var dt = data[i];
		var shortTr =shortCutWrap.find('tr').eq(i+1);
		//var avgprice = dt.avgprice;
		shortTr.bind('mouseover',function(){
			$(this).css('background-color','#E9EBEE');
		});
		shortTr.bind('mouseout',function(){
			$(this).css('background-color','#FFE7E7');
			$(this).attr('isClick',false);
		});
		shortTr.bind('dblclick',function(){
			tradeInfoMPTrDBLHandler($(this));
		});
		shortTr.bind('click',function(){
			var isClick = $(this).attr('isClick');
			if(isClick == 'false'){
				$(this).attr('isClick',true);
				tradeInfoMPTrHandler($(this));
			}
		});
		shortTr.attr('trDt',JSON.stringify(dt));
		shortTr.css('cursor','pointer');
		shortTr.css('background-color','#FFE7E7');
		
		var instru = RoomInstrumentListInfo[dt.iid];
		var digits = instru.digits;
		shortTr.find('td:last-child').html((dt.avgprice).toFixed(digits));
		shortTr.find('td:nth-last-child(2)').html(dt.volfcls);
		shortTr.find('td:first-child').html(dt.iid);
		shortTr.find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		shortTr.find('td:nth-child(3)').html(dt.vol);
		
		var mpTr = mpWrap.find('tr').eq(i+1);
		mpTr.bind('mouseover',function(){
			$(this).css('background-color','#E9EBEE');
		});
		mpTr.bind('mouseout',function(){
			$(this).css('background-color','#FFE7E7');
		});
		mpTr.bind('dblclick',function(){
			tradeInfoMPTrDBLHandler($(this));
		});
		mpTr.bind('click',function(){
			tradeInfoMPTrHandler($(this));
		});
		mpTr.attr('trDt',JSON.stringify(dt));
		mpTr.css('background-color','#FFE7E7');
		mpTr.css('cursor','pointer');
		mpTr.find('td:first-child').html(dt.iid);
		mpTr.find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		mpTr.find('td:nth-child(3)').html(dt.vol);
		mpTr.find('td:nth-child(4)').html(dt.volfcls);
		mpTr.find('td:nth-child(5)').html((dt.avgprice).toFixed(digits));
		mpTr.find('td:nth-child(6)').html(Math.round(dt.floatprofit));
		mpTr.find('td:nth-child(7)').html((dt.deposit).toFixed(2));//占用保证金 固定2位小数
	}
}

//获取快捷, 持仓信息
function getTradeInfoMP(){
	//return;
	var method = 'tradeInfo';//方法
	var data = {
		"rid":CurrentRoomID,
		"aid":CurrentAccountID,
		"uid":CurrentUserId,
		"lc":CurrentLC,
		"rmc":CurrentRMC,
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
//委托单变成成交单的提示
function pdConvertToOrderTip(dt){
	console.log('成交提示---------------');
	var dir,co,vol = dt.vol,tempDir,tempCo,iid=dt.iid,
		price=dt.price,otime = msecondConvertToDate(dt.otime);
	/*var otime = tempDt.otime,
	dir = tempDt.dir,
	co = tempDt.co,
	vol = tempDt.vol,
	iid = tempDt.iid,
	price = tempDt.price;*/
	if(dt.co == 1){//平仓
		tempCo=1;
		co = '平';
		dir = dt.dir==0?'空':'多';
		tempDir = dt.dir==0?1:0;
		color = dt.dir==0?'#06E65A':'#E60302';
	}else{//开仓
		tempCo=0;
		co = '开';
		dir = dt.dir==0?'多':'空';
		tempDir = dt.dir==0?0:1;
		color = dt.dir==0?'#E60302':'#06E65A';
	}
	var	htmlFrag = "<div class='order_notify_wrap'>"+
		"<span value='iid'></span>"+
		"<span value='img'></span>"+
		"<span value='codir'></span>"+
		"<span value='price'></span>"+
		"<span value='vol'></span>"+
		"<span value='time'></span>"+
	"</div>";
	if($('.order_notify_wrap').length == 0) $('body').append($(htmlFrag));
	$('.order_notify_wrap').show();
	$('.order_notify_wrap span[value=iid]').html(iid);
	$('.order_notify_wrap span[value=codir]').html(dir+co);
	$('.order_notify_wrap span[value=price]').html(price);
	$('.order_notify_wrap span[value=vol]').html(vol+'手');
	$('.order_notify_wrap span[value=time]').html(otime);
	
	var image;
	if(tempDir == 0){
		if(tempCo == 0){
			image = 'url(images/trade-pointer-duokai.png)';
		}else{
			image = 'url(images/trade-pointer-duoping.png)';
		}
	}else{
		if(tempCo == 0){
			image = 'url(images/trade-pointer-kongkai.png)';
		}else{
			image = 'url(images/trade-pointer-kongping.png)';
		}
	}
	$('.order_notify_wrap span[value=codir]').css('color',color);
	$('.order_notify_wrap span[value=price]').css('color',color);
	$('.order_notify_wrap span[value=img]').css('background-image',image);
	setTimeout(function(){
		$('.order_notify_wrap').hide();
	},2000);
}
//历史交易数据设置
function hisTradeDataSet(dt,isInit){
	var len = dt.length;
	console.log(CurrentKLStartIndex);
	console.log(CurrentKLEndIndex);
	//GlobalKLData
	for(var i=0;i<len;i++){
		var tempDt = dt[i];
		var otime = tempDt.otime,
		dir = tempDt.dir,
		co = tempDt.co,
		vol = tempDt.vol,
		iid = tempDt.iid,
		price = tempDt.price;
		for(var j=CurrentKLStartIndex;j<=CurrentKLEndIndex;j++){
			var klDt = GlobalKLData.ks[j];
			if(!klDt) return;
			if(otime < klDt.closeTime && otime > klDt.openTime){
				console.log('find trade pointer');
				//console.log(klDt);
				var KLIndex = klDt.KLIndex;
				//获取X坐标
				var x = CurrentKLObj.getCandleXByIndex(KLIndex)+
				CanvasPagePosition.x+GlobalKLOptionObj.region.x-5;
				//获取Y坐标
				var y = CurrentKLObj.getYCoordByPrice(price)+CanvasPagePosition.y-5;
				var topY = CurrentKLObj.getYCoordByPrice(klDt.high)+CanvasPagePosition.y-5;
		        var bottomY = CurrentKLObj.getYCoordByPrice(klDt.low)+CanvasPagePosition.y-5;
		        //console.log("x - topY - bottomY: "+x+'-'+topY+'-'+bottomY);
		        var tradeDefaultPointer = 'trade-pointer-wrap-'+otime;
		        var defaultFrag = "<div class='"+tradeDefaultPointer+"'></div>";
		        $('body').append($(defaultFrag));
		        //console.log($('.'+tradeDefaultPointer));
		        $('.'+tradeDefaultPointer).css('background-image','url(images/xinhaodianheise.png)');
		        $('.'+tradeDefaultPointer).css('top',y);
		        $('.'+tradeDefaultPointer).css('left',x);
		        var tradeCOPointer = 'trade-pointer-wrap-'+otime+co;
		        var COPointerFrag = "<div class='"+tradeCOPointer+"'></div>";
		        $('body').append($(COPointerFrag));
		        if(co == 0){//开仓
		        	//多开空平在下
		        	var openPointerImage = 'url(images/trade-pointer-duokai.png)';
		        	var tempY = bottomY;
		        	if(dir == 1) {
		        		openPointerImage = 'url(images/trade-pointer-kongkai.png)';
		        		tempY = topY;
		        	}
		        	$('.'+tradeCOPointer).css('background-image',openPointerImage);
			        $('.'+tradeCOPointer).css('top',tempY);
			        $('.'+tradeCOPointer).css('left',x);
		        }else if(co == 1){//平仓
		        	//空开多平在上
		        	var closePointerImage = 'url(images/trade-pointer-duoping.png)';
		        	var tempY = topY
		        	if(dir == 1){
		        		openPointerImage = 'url(images/trade-pointer-kongping.png)';
		        		tempY = bottomY;
		        	} 
		        	$('.'+tradeCOPointer).css('background-image',openPointerImage);
			        $('.'+tradeCOPointer).css('top',tempY);
			        $('.'+tradeCOPointer).css('left',x);
		        }
		        if(isInit == true){
		        	GlobalKLData.ks[j].tradeDt.push(tempDt);
		        }
			}
		}
	}
}
//增加交易点
function addTradePointer(tempDt){
	var otime = tempDt.otime,
	dir = tempDt.dir,
	co = tempDt.co,
	vol = tempDt.vol,
	iid = tempDt.iid,
	price = tempDt.price;
	for(var j=CurrentKLStartIndex;j<=CurrentKLEndIndex;j++){
		var klDt = GlobalKLData.ks[j];
		if(!klDt) return;
		if(otime < klDt.closeTime && otime > klDt.openTime){
			console.log('find trade pointer');
			GlobalKLData.ks[j].tradeDt.push(tempDt);//及时更新每根K线对应的交易点
			//console.log(klDt);
			var KLIndex = klDt.KLIndex;
			//获取X坐标
			var x = CurrentKLObj.getCandleXByIndex(KLIndex)+
			CanvasPagePosition.x+GlobalKLOptionObj.region.x-5;
			//获取Y坐标
			var y = CurrentKLObj.getYCoordByPrice(price)+CanvasPagePosition.y-5;
			var topY = CurrentKLObj.getYCoordByPrice(klDt.high)+CanvasPagePosition.y-5;
	        var bottomY = CurrentKLObj.getYCoordByPrice(klDt.low)+CanvasPagePosition.y-5;
	        //console.log("x - topY - bottomY: "+x+'-'+topY+'-'+bottomY);
	        var tradeDefaultPointer = 'trade-pointer-wrap-'+otime;
	        var defaultFrag = "<div class='"+tradeDefaultPointer+"'></div>";
	        $('body').append($(defaultFrag));
	        //console.log($('.'+tradeDefaultPointer));
	        $('.'+tradeDefaultPointer).css('background-image','url(images/xinhaodianheise.png)');
	        $('.'+tradeDefaultPointer).css('top',y);
	        $('.'+tradeDefaultPointer).css('left',x);
	        var tradeCOPointer = 'trade-pointer-wrap-'+otime+co;
	        var COPointerFrag = "<div class='"+tradeCOPointer+"'></div>";
	        $('body').append($(COPointerFrag));
	        if(co == 0){//开仓
	        	//多开空平在下
	        	var openPointerImage = 'url(images/trade-pointer-duokai.png)';
	        	var tempY = bottomY;
	        	if(dir == 1) {
	        		openPointerImage = 'url(images/trade-pointer-kongkai.png)';
	        		tempY = topY;
	        	}
	        	$('.'+tradeCOPointer).css('background-image',openPointerImage);
		        $('.'+tradeCOPointer).css('top',tempY);
		        $('.'+tradeCOPointer).css('left',x);
	        }else if(co == 1){//平仓
	        	//空开多平在上
	        	var closePointerImage = 'url(images/trade-pointer-duoping.png)';
	        	var tempY = topY
	        	if(dir == 1){
	        		openPointerImage = 'url(images/trade-pointer-kongping.png)';
	        		tempY = bottomY;
	        	} 
	        	$('.'+tradeCOPointer).css('background-image',openPointerImage);
		        $('.'+tradeCOPointer).css('top',tempY);
		        $('.'+tradeCOPointer).css('left',x);
	        }
		}
	}
}

//获取交易历史数据
function getHisTradeInfo(){
	//清空所有交易点
	var pointList = $('div[class^=trade-pointer-wrap-]');
	pointList.remove();
	var method = 'tradeInfo';//方法
	var data = {
		"oper":"getHisTrade",
		"aid":CurrentAccountID,
		"lc":CurrentLC,
		"rid":CurrentRoomID,
		"rmc":CurrentRMC,
		"startdate":CurrentKLStartDate,
		"uid":CurrentUserId,
		"enddate":CurrentKLEndDate,
		"iid":CurrentInstrumentID
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
			console.log('get his trade data');
			console.log(data);
			if(state === 0){
				var res=data.res,dt=res.data;
				if(!dt || dt.length == 0) return;
				//HisTradePointerData=dt;
				//先进行数据过滤
				var tempTradeArr = [];
				for(var i=0;i<dt.length;i++){
					var tempDt = dt[i];
					var otime = tempDt.otime;
					for(var j=CurrentKLStartIndex;j<=CurrentKLEndIndex;j++){
						var klDt = GlobalKLData.ks[j];
						if(!klDt) return;
						if(otime < klDt.closeTime && otime > klDt.openTime){
							tempTradeArr.push(tempDt);
						}
					}
				}
				hisTradeDataSet(tempTradeArr,true);
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
//委托单转换为成交单
function pendingDeputeConvertToOrder(dt){
	var did = dt.did;
	var wrap = $('.TradeInfoPendingDepute');
	var trList = wrap.find('tr'),trLen = trList.length;
	for(var i=1;i<trLen;i++){
		var tr = trList[i];
		var trDtStr = $(tr).attr('orderData');
		if(!trDtStr) continue;
		var trDt = JSON.parse(trDtStr);
		if(trDt.did == did){
			pdConvertToOrderTip(trDt);
		}
	}
}

//委托挂单表格数据设置
function tradeInfoPDDataSet(wrap, index, dt){
	return;
	var dtStr = JSON.stringify(dt);
	var tr = wrap.find('tr').eq(index); 
	tr.css('cursor','pointer');
	tr.bind('mouseover',function(){
		$(this).css('background-color','#E9EBEE');
	});
	tr.bind('mouseout',function(){
		$(this).css('background-color','#FFE7E7');
	});
	tr.bind('dblclick',function(){
		repealPendingDepute(dt);
	});

	tr.css('background-color','#FFE7E7');
	tr.attr('orderData',dtStr);//把数据赋给行
	//console.log('---------------===============');
	//console.log(wrap.find('tr').eq(index).attr('orderData'));
	tr.find('td:first-child').html(dt.iid);
	tr.find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
	tr.find('td:nth-child(3)').html(dt.co==0?'开':'平');
	tr.find('td:nth-last-child(2)').html(dt.dvol);
	tr.find('td:last-child').html(dt.dprice);
}
//添加黄色虚线
function pendingDeputeOrderNotify(dt,priceCount){
	if(CurrentInstrumentID != dt.iid) return;
	var price = dt.dprice,did=dt.did,image,dir=dt.dir,co=dt.co,offset=5;
	if(!GlobalKLOptionObj) return;
	var dashClass = 'order-dashed-wrap-'+did;
	var pendingDeputeFrag = "<div class="+dashClass+">"+
								"<span name='codir'></span>"+
								"<span name='price'>"+price.toFixed(CurrentInstrumentDigits)+"</span>"+
							"</div>";
	if($('.'+dashClass).length == 0){
		$('body').append($(pendingDeputeFrag));
	}
	$('.'+dashClass).show();
	if(co == 1){//平仓
		if(dir == 0){//
			image = 'kongping';
		}else{
			image = 'duoping';
		}
	}else{//开仓
		if(dir == 0){//买
			image = 'duokai';		
		}else{//卖
			image = 'kongkai';
		}
	}
	$('.'+dashClass).find('span[name=codir]').css('background-image','url(images/mai'+image+'.png)');
	var wrap = $('.order-dashed-wrap-'+did);
	var width = CanvasPagePosition.width-GlobalKLOptionObj.region.x;
	wrap.css('width',width);
	var left = CanvasPagePosition.x+GlobalKLOptionObj.region.x;
	wrap.css('left',left);
	//图片偏移量设置
	wrap.find('span[name=codir]').css('left',priceCount*(51+offset));
	var top = CanvasPagePosition.y+CurrentKLObj.getYCoordByPrice(price);
	wrap.css('top',top);
}

//撤销委托挂单
function repealPendingDepute(dt){
	/*console.log(dt.did);
	return;*/
	dt = JSON.parse(dt);
	var method = 'trade';//方法
	var data = {
		"uid":CurrentUserId,
		"rid":CurrentRoomID,
		"lc":CurrentLC,
		"did":dt.did,
		"action":2,
		"rmc":CurrentRMC,
		"aid":CurrentAccountID
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
			console.log('repeal pending depute');
			console.log(data);
			if(state === 0){
				var res=data.res,dt=res.data;
				if(!dt || dt.length == 0) return;
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

//获取历史挂单数据
function tradeInfoPDHandler(data){
	var wrap = $('.TradeInfoPendingDepute');
	if(wrap.length == 0) return;
	var trLen = wrap.attr('trLen');
	//清空所有内容
	for(var i=0;i<trLen;i++){
		var tr = wrap.find('tr').eq(i+1);
		tr.find('td').html('');
		tr.unbind('mouseover');
		tr.unbind('mouseout');
		tr.unbind('dblclick');
		tr.css('background-color','white');
		tr.css('cursor','default');
	}
	//隐藏所有黄色虚线
	$("div[class^=order-dashed-wrap-]").hide();
	//清空报单价格数组
	PendingDeputePriceArr.length = 0;
	var len = data.length;
	if(len == 0) return;
	wrap.attr('trLen',len);
	if(len > 5){//大于5行
		var htmlFrage = "<tr>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
						"</tr>";
		var fragLen = len - 5;
		for(var j=0;j<fragLen;j++){
			wrap.append($(htmlFrage));
		}
	}
	var priceCount = 0;
	for(var i=0;i<len;i++){
		var dt=data[i];
		var price = dt.dprice;
		var tr = wrap.find('tr').eq(i+1);
		tr.bind('mouseover',function(){
			$(this).css('background-color','#E9EBEE');
		});
		tr.bind('mouseout',function(){
			$(this).css('background-color','#FFE7E7');
		});
		tr.bind('dblclick',function(){
			repealPendingDepute($(this).attr('orderData'));
		})
		//if(i != 0) offset +=5;
		if(PendingDeputePriceArr.length == 0){
			PendingDeputePriceArr.push(price);
		}else{
			//判断是否已经有此价格
			priceCount = PendingDeputePriceArr.containEleCount(price);
			PendingDeputePriceArr.push(price);
		}
		//添加黄色虚线
		pendingDeputeOrderNotify(dt,priceCount);
		//console.log(dt.did);
		tr.attr('orderData',JSON.stringify(dt));
		tr.css('background-color','#FFE7E7');
		tr.css('cursor','pointer');
		tr.find('td:first-child').html(dt.iid);
		tr.find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		tr.find('td:nth-child(3)').html(dt.co==0?'开':'平');
		tr.find('td:nth-last-child(2)').html(dt.dvol);
		tr.find('td:last-child').html(dt.dprice);
	}
}

//委托挂单
function getTradeInfoPendingDepute(){
	var method = 'tradeInfo';//方法
	var data = {
		"rid":CurrentRoomID,
		"aid":CurrentAccountID,
		"uid":CurrentUserId,
		"lc":CurrentLC,
		"rmc":CurrentRMC,
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
			PendingDeputeInitFinish=true;
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
	var table = wrap.find('table');
	var trLen = table.attr('trLen');
	var i=0,len = data.length;
	if(len > trLen){//大于5行
		var htmlFrage = "<tr>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
						"</tr>";
		var fragLen = len - 5;
		for(var j=0;j<fragLen;j++){
			table.append($(htmlFrage));
		}
	}
	if(len > 5) table.attr('trLen',len);
	for(;i<len;i++){
		var dt=data[i];
		wrap.find('tr').eq(i+1).css('background-color','#FFE7E7');
		wrap.find('tr').eq(i+1).find('td:first-child').html(dt.iid);
		wrap.find('tr').eq(i+1).find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		wrap.find('tr').eq(i+1).find('td:nth-child(3)').html(dt.co==0?'开':'平');
		var state;
		if(dt.status == 1){
			state = '已报销';
		}else if(dt.status == 2){
			state = '已撤单';
		}else if(dt.status == 3){
			state = '已成交';
		}
		wrap.find('tr').eq(i+1).find('td:nth-child(4)').html(state);
		wrap.find('tr').eq(i+1).find('td:nth-child(5)').html((dt.dprice).toFixed(CurrentInstrumentDigits));
		wrap.find('tr').eq(i+1).find('td:nth-child(6)').html(msecondConvertToDate(dt.dtime));
		wrap.find('tr').eq(i+1).find('td:nth-child(7)').html(msecondConvertToDate(dt.otime));
		wrap.find('tr').eq(i+1).find('td:nth-child(8)').html(dt.tvol);
		wrap.find('tr').eq(i+1).find('td:nth-child(9)').html(dt.volfcls);
		if(dt.volfcls > 0){
			wrap.find('tr').eq(i+1).find('td:nth-child(10)').html(msecondConvertToDate(dt.otime));
		}else{
			wrap.find('tr').eq(i+1).find('td:nth-child(10)').html();
		}
		wrap.find('tr').eq(i+1).find('td:nth-child(11)').html(dt.dvol);
		wrap.find('tr').eq(i+1).find('td:nth-child(12)').html(dt.did);
		wrap.find('tr').eq(i+1).find('td:nth-child(13)').html(state);
	}
}

//当日委托
function getTradeInfoAllDepute(){
	var method = 'tradeInfo';//方法
	var data = {
			"rid":CurrentRoomID,
			"aid":CurrentAccountID,
			"uid":CurrentUserId,
			"lc":CurrentLC,
			"rmc":CurrentRMC,
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
	var table = wrap.find('table');
	var trLen = table.attr('trLen');
	var i=0,len=data.length;
	if(len > trLen){//大于5行
		var htmlFrage = "<tr>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
						"</tr>";
		var fragLen = len - 5;
		for(var j=0;j<fragLen;j++){
			table.append($(htmlFrage));
		}
	}
	if(len > 5) table.attr('trLen',len);
	for(;i<len;i++){
		var dt = data[i];
		var tr = wrap.find('tr').eq(i+1);
		tr.css('background-color','#FFE7E7');
		tr.find('td:first-child').html(dt.iid);
		tr.find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		tr.find('td:nth-child(3)').html(dt.co==0?'仓':'仓');
		tr.find('td:nth-child(4)').html((dt.price).toFixed(CurrentInstrumentDigits));
		tr.find('td:nth-child(5)').html(dt.vol);
		if(dt.vol > 0){
			wrap.find('tr').eq(i+1).find('td:nth-child(6)').html(msecondConvertToDate(dt.otime));
		}else{
			wrap.find('tr').eq(i+1).find('td:nth-child(6)').html();
		}
		tr.find('td:nth-child(7)').html(dt.oid);//成交编号没找到
		tr.find('td:nth-child(8)').html(dt.did);
		tr.find('td:nth-child(9)').html(msecondConvertToDate(dt.dtime));
		tr.find('td:nth-child(10)').html((dt.dprice).toFixed(CurrentInstrumentDigits));
		tr.find('td:nth-child(11)').html((dt.tfee).toFixed(2));//手续费固定保留两位
		tr.find('td:nth-child(12)').html();
	}
}
//当日成交
function getTradeInfoAllOrder(){
	var method = 'tradeInfo';//方法
	var data = {
		"rid":CurrentRoomID,
		"aid":CurrentAccountID,
		"uid":CurrentUserId,
		"lc":CurrentLC,
		"rmc":CurrentRMC,
		"oper":"getAllOrder"
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
	var data = {
		"rid":CurrentRoomID,
		"aid":CurrentAccountID,
		"uid":CurrentUserId,
		"lc":CurrentLC,
		"rmc":CurrentRMC,
		"oper":"getConditionOrder"
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

function remodalConditionPriceOver(div,type){
	var image = 'url(images/NumericSteppersdown1.png)';
	if(type == 'down'){
		image = 'url(images/NumericStepperxdown.png)';
	}
	$(div).css('background-image',image);
}
function remodalConditionPriceOut(div,type){
	var image = 'url(images/NumericSteppersup.png)';
	if(type == 'down'){
		image = 'url(images/NumericStepperxup.png)';
	}
	$(div).css('background-image',image);
}
function remodalConditionPriceClick(div,type){
	var parent = $(div).parent();
	var input = parent.prev();
	if(type == 'up'){
		input.val(Number(input.val())+1);
	}else if(type == 'down'){
		input.val(Number(input.val())-1);
	}
}
function refreshTradeMPHandler(dt){
	var shortCutWrap = $('.TradeInfo_MP');
	var trList = shortCutWrap.find('tr'),trLen=trList.length;
	for(var i=1;i<trLen;i++){
		var tr=trList.eq(i);
		var trDt = tr.attr('trDt');
		if(!trDt) continue;
		trDt = JSON.parse(trDt);
		//if(trDt.iid == dt.iid && )
	}
}

//账户资金不足
function accountCapitalNotEnough(){
	alert("账户资金不足");
}
//切换合约
function orderInstrumentSwitch(select){
	console.log(select.value);
	//设置当前合约
	CurrentInstrumentID = select.value;
	//停止K线和盘口数据的订阅
	KLWSSubscribe.unsubscribe();
	TapWSSubscribe.unsubscribe();
	//下单器界面设置
	var instru = RoomInstrumentListInfo[CurrentInstrumentID];
	var price = instru.price;
	CurrentInstrumentDigits = instru.digits;
	//价格
	var priceWrap = $('.KL_OM_Price_Number');
	priceWrap.find('input').val(price);
	//买卖						
	var orderMangerWrap = $('.KL_OrderManager_SecondWrap');
	var dirDivs = orderMangerWrap.find('div[name=order_mana_dir]');
	for(var i=0;i<dirDivs.length;i++){
		var dirDiv = dirDivs.eq(i);
		if(dirDiv.attr('value') == 0){
			OMBuySellOpenCloseMouseDown(dirDiv[0],'buy')
		}
	}
	//开平
	var coDivs = orderMangerWrap.find('div[name=order_mana_co]');
	for(var i=0;i<coDivs.length;i++){
		var coDiv = coDivs.eq(i);
		if(coDiv.attr('value') == 0){
			OMBuySellOpenCloseMouseDown(coDiv[0],'open')
		}
	}
	//手数
	calcOpenVolumeFn();
	//隐藏实时K线价格提示框
	$('div[class^=KL_Y_Axis_Last_Price_Tip]').hide();
	//设置切换合约加载K线标记为true
	SwitchInstruLoadKL = true;
	//加载K线数据
	loadHisKLineData(CurrentKLInterval);
	//获取盘口数据
	getTapeInfo();
}