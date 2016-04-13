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
	}else if(remodalType == 'condition'){
		var priceSelect = remodalContent.find('select[name=lastPrice]'),
			priceVal = priceSelect.val();
		var con;
		if(priceVal == 'dayu'){
			con = 0;
		}else if(priceVal == 'dayudengyu'){
			con = 1;
		}else if(priceVal == 'xiaoyu'){
			con = 2;
		}else if(priceVal == 'xiaoyudengyu'){
			con = 3;
		}
		var dpriceWrap = remodalContent.find('span[name=price]');
			dprice = dpriceWrap.attr('value');
		
		var cpriceInput = remodalContent.find('input[name=price]');
		var cprice = cpriceInput.val();
		
		var dirWrap = remodalContent.find('span[name=dir]');
		var dir = dirWrap.attr('value');
		var coWrap = remodalContent.find('span[name=co]')
		var co = coWrap.attr('value');
		
		var volWrap = remodalContent.find('span[name=vol]'),
			vol = volWrap.attr('value');
		
		var iidWrap = remodalContent.find('span[name=iid]'),
			iid = iidWrap.attr('value');
		
		//console.log('co-'+con+',price-'+price+',dir-'+dir+',co-'+co+',vol-'+vol);
		conditionOrderService(con,dprice,cprice,dir,co,vol,iid);
	}
});
$('.remodal-order>div:last-child>span').click(function(){
	$(this).css('background-image','');
});