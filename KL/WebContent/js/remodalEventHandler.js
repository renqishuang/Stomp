$('.remodal-open').click(function(){
	var remodal = $('.remodal');
	if(remodal.length != 0){
		remodal.css('width',RemodalDefaultWidth);
		remodal.css('height',RemodalDefaultHeight);
	}
});
$('.remodal-confirm').click(function(){
	var remodalContent = $(this).parent().prev();
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
	}else if(remodalType == 'MASet'){
		var MAMenu = remodalContent.find('.MA_Set_Menu');
		if(MAMenu.length != 0){
			var tempArr = [];
			var tempObj = {};
			var liList = MAMenu.find('li'),liLen = liList.length;
			for(var i=0;i<liLen;i++){
				var li = liList.eq(i);
				var MAName = li.find('span[name=name]').html();
				var checkLabel = li.find('span[name=check_label]');
				var check = checkLabel.attr('isClick');
				if(check == 'true'){
					tempArr.push(MAName);
				}
				var colorWrap = li.find('input[type=color]'),
					color = colorWrap.val();
				var countWrap = li.find('input[type=text]');
					count = countWrap.val();
					tempObj[MAName] = {
						name: 'MA'+	count,
						count: Number(count),
						color:color
					};
			}
			CurrentKLMAArr = tempArr;
			GlobalKLMAObj = tempObj;
			if(window.localStorage){
				localStorage.setItem('MAArr',CurrentKLMAArr);
				localStorage.setItem('MAObj',JSON.stringify(GlobalKLMAObj));
			}
		}
		var MAPriceWrap = $('.KL_MA_Price_Wrap');
		if(MAPriceWrap.length != 0) MAPriceWrap.empty();
		//重新画图
		drawKL();
	}
});
$('.remodal-order>div:last-child>span').click(function(){
	$(this).css('background-image','');
});