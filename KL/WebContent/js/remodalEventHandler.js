$('.remodal-confirm').click(function(){
	var remodalContent = $(this).prev();
	var remodalType = remodalContent.attr('remodalConType');
	if(remodalType == 'order'){
		//下单操作
		var remodalOrderWrap = remodalContent.find('.remodal-order');
		var iid = remodalOrderWrap.attr('instrument'),
			dir = remodalOrderWrap.attr('dir'),
			co = remodalOrderWrap.attr('co'),
			price = remodalOrderWrap.attr('price'),
			vol = remodalOrderWrap.attr('volume');
		OMOrderService(iid,dir,co,price,vol);
	}else if(remodalType == 'deleteInstrument'){
		var instru = remodalContent.find('.remodal-del-instru').attr('instru');
		//删除合约
		DeleteInstrumentHandler(instru);
	}else if(remodalType == 'addInstrument'){
		var wrap = remodalContent.find('.remodal-add-instru-wrap'),
			instruWrap = wrap.find('span[name=instrument]'),
			iid = instruWrap.attr('iid');
		if(iid == ''){
			alert('请选择合约');
			return;
		}
		AddInstrumentHandler(iid);
	}
});
$('.remodal-order>div:last-child>span').click(function(){
	$(this).css('background-image','');
});