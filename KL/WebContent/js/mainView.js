function signalsConnectMouseOver(div,e){
	console.log($(div));
	var pageX = e.pageX,pageY = e.pageY;
	var signalStateWrap = 'KL_Signals_Connect_Tip';
	if($('.'+signalStateWrap).is(':hidden')){
		$('.'+signalStateWrap).show();
	}
}
function signalsConnectMouseOut(div){
	var signalStateWrap = 'KL_Signals_Connect_Tip';
	$('.'+signalStateWrap).hide();
}
function legendMouseOver(div){
	$(div).css('background-image','none');
	$('.KL_Legend_Bg').show();
}
function legendMouseOut(div){
	$(div).css('background-image','url(images/showLegend_small1.png)');
	$('.KL_Legend_Bg').hide();
}
function soundMouseClick(div){
	var isClick = $(div).attr('isClick');
	$(div).css('background-image','none');
	if(isClick == 'false'){
		$('.KL_Sound_Bg').css('background-image','url(images/openSound_small2.png)');
		$(div).attr('isClick',true);
	}else{
		$('.KL_Sound_Bg').css('background-image','url(images/closeSound_small2.png)');
		$(div).attr('isClick',false);
	}
}
function soundMouseOver(div){
	$(div).css('background-image','none');
	$('.KL_Sound_Bg').show();
}
function soundMouseOut(div){
	var isClick = $(div).attr('isClick');
	if(isClick == 'false'){
		$(div).css('background-image','url(images/closeSound_small1.png)');
	}else{
		$(div).css('background-image','url(images/openSound_small1.png)');
	}
	$('.KL_Sound_Bg').hide();
}
function tradeLineMouseClick(div){
	var isClick = $(div).attr('isClick');
	$(div).css('background-image','none');
	if(isClick == 'false'){
		$('.KL_TradeLine_Bg').css('background-image','url(images/showTradeLine_small2.png)');
		$(div).attr('isClick',true);
	}else{
		$('.KL_TradeLine_Bg').css('background-image','url(images/hideTradeLine_small2.png)');
		$(div).attr('isClick',false);
	}
}

function tradeLineMouseOver(div){
	$(div).css('background-image','none');
	$('.KL_TradeLine_Bg').show();
}
function tradeLineMouseOut(div){
	var isClick = $(div).attr('isClick');
	if(isClick == 'false'){
		$(div).css('background-image','url(images/hideTradeLine_small1.png)');
	}else{
		$(div).css('background-image','url(images/showTradeLine_small1.png)');
	}
	$('.KL_TradeLine_Bg').hide();
}
function fullScreenMouseClick(div){
	var isClick = $(div).attr('isClick');
	$(div).css('background-image','none');
	if(isClick == 'false'){
		$('.KL_FullScreen_Bg').css('background-image','url(images/exitFullScreen_small2.png)');
		$(div).attr('isClick',true);
	}else{
		$('.KL_FullScreen_Bg').css('background-image','url(images/fullScreen_small2.png)');
		$(div).attr('isClick',false);
	}
}
function fullScreenMouseOver(div){
	$(div).css('background-image','none');
	$('.KL_FullScreen_Bg').show();
}
function fullScreenMouseOut(div){
	var isClick = $(div).attr('isClick');
	if(isClick == 'false'){
		$(div).css('background-image','url(images/fullScreen_small1.png)');
	}else{
		$(div).css('background-image','url(images/exitFullScreen_small1.png)');
	}
	$('.KL_FullScreen_Bg').hide();
}