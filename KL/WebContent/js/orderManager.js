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
//下单
function OMOrderMouseDown(div){
	$(div).css('background-image','url(images/maxiadan1.png)');
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
			  	   		"<div isClick='false'>"+
			  	   			"<span></span>不显示下单提示页"+
			  	   		"</div>"+
			  	   "</div>";
	contentWrap.append($(htmlFrag));
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
		shortCutWrap.find('tr').eq(i+1).css('background-color','#FFE7E7');
		shortCutWrap.find('tr').eq(i+1).find('td:last-child').html(dt.avgprice);
		shortCutWrap.find('tr').eq(i+1).find('td:nth-last-child(2)').html(dt.volfcls);
		shortCutWrap.find('tr').eq(i+1).find('td:first-child').html(dt.iid);
		shortCutWrap.find('tr').eq(i+1).find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		shortCutWrap.find('tr').eq(i+1).find('td:nth-child(3)').html(dt.vol);
		
		mpWrap.find('tr').eq(i+1).css('background-color','#FFE7E7');
		mpWrap.find('tr').eq(i+1).find('td:first-child').html(dt.iid);
		mpWrap.find('tr').eq(i+1).find('td:nth-child(2)').html(dt.dir==0?'买':'卖');
		mpWrap.find('tr').eq(i+1).find('td:nth-child(3)').html(dt.vol);
		mpWrap.find('tr').eq(i+1).find('td:nth-child(4)').html(dt.volfcls);
		mpWrap.find('tr').eq(i+1).find('td:nth-child(5)').html((dt.avgprice).toFixed(CurrentInstrumentDigits));
		mpWrap.find('tr').eq(i+1).find('td:nth-child(6)').html(Math.round(dt.floatprofit));
		mpWrap.find('tr').eq(i+1).find('td:nth-child(7)').html((dt.deposit).toFixed(2));//占用保证金 固定2位小数
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
	var dir = dt.dir==0?'多':'空';
	var co = dt.co==0?'开':'平';
	var htmlFrag = "<div class='order_notify_wrap'>"+
		"<span value='iid'>"+dt.iid+"</span>"+
		"<span value='img'></span>"+
		"<span value='dir'>"+dir+"</span>"+
		"<span value='co'>"+co+"</span>"+
		"<span value='price'>"+dt.dprice+"</span>"+
		"<span value='vol'>1</span>"+
		"<span>手</span>"+
		"<span value='time'>"+getCurrentHMS()+"</span>"+
	"</div>";
	$('body').append($(htmlFrag));
	setTimeout(function(){
		$('.order_notify_wrap').remove();
	},3000);
}
//历史交易数据设置
function hisTradeDataSet(dt){
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
				hisTradeDataSet(dt);
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
	if(wrap.length == 0) return;
	var trList = wrap.find('tr'),trLen = trList.length;
	for(var i=1;i<trLen;i++){
		var tr = trList[i];
		var trDtStr = $(tr).attr('orderData');
		if(!trDtStr) continue;
		var trDt = JSON.parse(trDtStr);
		if(trDt.did == did){
			$(tr).css('cursor','default');
			$(tr).css('background-color','white');
			$(tr).unbind('mouseover');
			$(tr).unbind('mouseout');
			$(tr).unbind('dblclick');
			wrap.attr('trLen',wrap.attr('trLen')-1);
			//删除挂单虚线
			var wrap = $('.order-dashed-wrap-'+did);
			wrap.remove();
			//添加提示
			pdConvertToOrderTip(trDt);
			$(tr).attr('orderData','');
			var tds = $(tr).find('td'),tdLen = tds.length;
			for(var j=0;j<tdLen;j++){
				var td = tds[j];
				$(td).html('');
			}
		}
	}
	//在成交单表格中添加一行数据
	/*var bargainWrap = $('.Order_Manager_TB_Bargain');
	if(bargainWrap.length == 0) return;
	var bargainTB = bargainWrap.find('table');
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
	bargainTB.append(htmlFrage);
	var trList = bargainTB.find('tr');
	var tr = trList.eq(trList.length-1);
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
	tr.find('td:nth-child(12)').html();*/
}

//委托挂单表格数据设置
function tradeInfoPDDataSet(wrap, index, dt){
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
//委托挂单通知
function pendingDeputeOrderNotify(price,did){
	if(!GlobalKLOptionObj) return;
	var pendingDeputeFrag = "<div class='order-dashed-wrap-"+did+"'></div>";
	//CanvasPagePosition
	$('body').append($(pendingDeputeFrag));
	var wrap = $('.order-dashed-wrap-'+did);
	var width = CanvasPagePosition.width-GlobalKLOptionObj.region.x;
	wrap.css('width',width);
	var left = CanvasPagePosition.x+GlobalKLOptionObj.region.x;
	wrap.css('left',left);
	var top = CanvasPagePosition.y+CurrentKLObj.getYCoordByPrice(price);
	wrap.css('top',top);
}
//监听MQ, 获取委托挂单
function tradeInfoPDMQHandler(dt){
	var wrap = $('.TradeInfoPendingDepute');
	if(wrap.length == 0) return;
	var trLen = Number(wrap.attr('trLen'));
	var index = trLen +1;
	if(trLen <= 5){
		tradeInfoPDDataSet(wrap,index,dt);
	}else{
		var htmlFrage = "<tr>"+
				"<td></td>"+
				"<td></td>"+
				"<td></td>"+
				"<td></td>"+
				"<td></td>"+
			"</tr>";
		wrap.append($(htmlFrage));
		tradeInfoPDDataSet(wrap,index,dt);
	}
	wrap.attr('trLen',index);
	pendingDeputeOrderNotify(dt.dprice,dt.did);
}

//收到MQ通知, 委托单撤单成功
function MQRepealPendingDepute(dt){
	var did = dt.did;
	var wrap = $('.TradeInfoPendingDepute');
	if(wrap.length == 0) return;
	var trList = wrap.find('tr'),trLen = trList.length;
	for(var i=1;i<trLen;i++){
		var tr = trList[i];
		var trDtStr = $(tr).attr('orderData');
		if(!trDtStr) continue;
		var trDt = JSON.parse(trDtStr);
		if(trDt.did == did){
			$(tr).css('cursor','default');
			$(tr).css('background-color','white');
			$(tr).unbind('mouseover');
			$(tr).unbind('mouseout');
			$(tr).unbind('dblclick');
			wrap.attr('trLen',wrap.attr('trLen')-1);
			//删除挂单虚线
			var wrap = $('.order-dashed-wrap-'+did);
			wrap.remove();
			/*//添加提示
			pdConvertToOrderTip(trDt);*/
			$(tr).attr('orderData','');
			var tds = $(tr).find('td'),tdLen = tds.length;
			for(var j=0;j<tdLen;j++){
				var td = tds[j];
				$(td).html('');
			}
		}
	}
}
//撤销委托挂单
function repealPendingDepute(dt){
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

//获取历史数据设置挂单
function tradeInfoPDHandler(data){
	var wrap = $('.TradeInfoPendingDepute');
	if(wrap.length == 0) return;
	var len = data.length;
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
	for(var i=0;i<len;i++){
		var dt=data[i];
		var tr = wrap.find('tr').eq(i+1);
		tr.css('cursor','pointer');
		tr.bind('mouseover',function(){
			$(this).css('background-color','#E9EBEE');
		});
		tr.bind('mouseout',function(){
			$(this).css('background-color','#FFE7E7');
		});
		tr.bind('dblclick',function(){
			repealPendingDepute($(this).attr('orderData'));
		})
		tr.attr('orderData',JSON.stringify(dt));
		tr.css('background-color','#FFE7E7');
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
			if(state === 0){
				var res=data.res,dt=res.data;
				if(!dt || dt.length == 0) return;
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