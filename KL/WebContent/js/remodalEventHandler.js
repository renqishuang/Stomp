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
		OMOrderService(iid,dir,co,price,vol);
	}
});
$('.remodal-order>div:last-child>span').click(function(){
	$(this).css('background-image','');
});