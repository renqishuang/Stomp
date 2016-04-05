function KLAddInstruMouseOver(li){
	var hasInstru = $(li).attr('hasInstru');
	var isSelect = $(li).attr('isSelect');
	if(hasInstru == 'true'){
		if(isSelect != 'true'){
			$(li).css('background-image','url(images/dingbuxuanzhongjiaoyi.png)');
		}
		var delSpan = $(li).find('span[name=instru_del]');
		delSpan.css('display','inline-block')
	}else{
		$(li).css('background-image','url(images/zengjiaheyueover.png)');
	}
}
function KLAddInstruMouseOut(li){	
	var hasInstru = $(li).attr('hasInstru');
	var isSelect = $(li).attr('isSelect');
	if(hasInstru == 'true'){
		if(isSelect != 'true'){
			$(li).css('background-image','url(images/dingbumorenjiaoyi.png)');
		}
		var delSpan = $(li).find('span[name=instru_del]');
		delSpan.css('display','none');
	}else{
		$(li).css('background-image','url(images/zengjiaheyue.png)');
	}
}
//获取行情-产品
function getMarketProductInfo(){
	var method = 'marketInfo';//方法
	var data = {"oper":"product"};
	var param = JSON.stringify(data);
	$.ajax({
		url:WebServiceTransferUrl+'/call_ws/output',
		type:'post',
		dataType:"json",
		//async:false,//同步请求
		data:{
			ws_url:WebServiceStrageUrl,
			ws_func:method,
			ws_param:param
		},
		timeout:AjaxTimeOut, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			console.log('market - product info');
			console.log(data);
			if(state === 0){
				var res = data.res.data,len=res.length;
				for(var i=0;i<len;i++){
					var eid = res[i].eid,
						ename = res[i].ename,
						product = res[i].product;
					var tempObj = {
						eid:eid,
						ename:ename,
						product:product
					};
					MarketInfoObj[eid]=tempObj;
				}
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
//获取行情-合约
function getMarketInstruInfo(){
	var method = 'marketInfo';//方法
	var data = {"oper":"searchAllInst"};
	var param = JSON.stringify(data);
	$.ajax({
		url:WebServiceTransferUrl+'/call_ws/output',
		type:'post',
		dataType:"json",
		//async:false,//同步请求
		data:{
			ws_url:WebServiceStrageUrl,
			ws_func:method,
			ws_param:param
		},
		timeout:AjaxTimeOut, //设置超时5秒钟
		success:function(data){
			var state = data.rc;
			console.log('market - instrument info');
			console.log(data);
			if(state === 0){
				//MarketInfoObj
				var res = data.res,
					exchanges=res.exchanges,exchangeLen=exchanges.length,
					products=res.products,productLen=products.length,
					instruments=res.instruments,instrumentLen=instruments.length;
				for(var i=0;i<exchangeLen;i++){
					var eid = exchanges[i].eid,
						ename = exchanges[i].ename;
					var tempObj = {
						eid:eid,
						ename:ename,
						product:[]
					}
					MarketInfoObj[eid]=tempObj;
				}
				for(var i=0;i<productLen;i++){
					var pid = products[i].pid,
						pname = products[i].pname,
						eid = products[i].eid;
					var product = {
						pid:pid,
						pname:pname,
						instrument:[]
					};
					MarketInfoObj[eid].product.push(product);
				}
				for(var i=0;i<instrumentLen;i++){
					var iid = instruments[i].iid,
						iname = instruments[i].iname,
						pid = instruments[i].pid,
						eid = instruments[i].eid;
					var product = MarketInfoObj[eid].product,length=MarketInfoObj[eid].product.length;
					for(var j=0;j<length;j++){
						var temp = MarketInfoObj[eid].product[j];
						if(pid == temp.pid){
							var ins = {
								iid:iid,
								iname:iname
							};
							MarketInfoObj[eid].product[j].instrument.push(ins);
						}
					}
				}
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
//交易所点击
function marketExchangeSelect(select){
	var productSelect = $(select).next();
	var productSelectWrap = productSelect.find('.remodal-add-instru-select-product');
	if(!productSelectWrap.is(':hidden')){
		productSelectWrap.hide();
	}
	var instruSelect = productSelect.next();
	var instruSelectWrap = instruSelect.find('.remodal-add-instru-select-instru');
	if(!instruSelectWrap.is(':hidden')){
		instruSelectWrap.hide();
	}
	var exchangeCls = 'remodal-add-instru-select-exchange';
	var exchangeObj = $('.'+exchangeCls);
	if(exchangeObj.length == 0){
		var htmlFrag = "<div class='"+exchangeCls+"'><ul></ul></div>";
		var exchangeWrap = $('.remodal-add-instru-wrap').find('span[name=exchange]');
		exchangeWrap.append($(htmlFrag));
		for(var key in MarketInfoObj){
			var eid = MarketInfoObj[key].eid;
			var ename = MarketInfoObj[key].ename;
			var html = "<li ename='"+ename+"' eid='"+eid+"' onclick='selectExchageMouseClick(this,event)' onmouseover='selectExchangeMouseOver(this)' onmouseout='selectExchangeMouseOut(this)'>"+ename+"</li>";
			$('.'+exchangeCls).append($(html));
		}
	}else{
		if(exchangeObj.is(':hidden')){
			exchangeObj.show();
		}
	}
}
//产品点击
function marketProductSelect(select){
	var exchangeSelect = $(select).prev();
	var exchangeSelectWrap = exchangeSelect.find('.remodal-add-instru-select-exchange');
	if(!exchangeSelectWrap.is(':hidden')){
		exchangeSelectWrap.hide();
	}
	var instruSelect = $(select).next();
	var instruSelectWrap = instruSelect.find('.remodal-add-instru-select-instru');
	if(!instruSelectWrap.is(':hidden')){
		instruSelectWrap.hide();
	}
	
	var eid = $(select).attr('eid');
	var pid = $(select).attr('pid');
	var productCls = 'remodal-add-instru-select-product';
	var productObj = $('.'+productCls);
	if(productObj.length == 0){
		var htmlFrag = "<div class='"+productCls+"'><ul></ul></div>";
		var exchangeWrap = $('.remodal-add-instru-wrap').find('span[name=product]');
		exchangeWrap.append($(htmlFrag));
		for(var key in MarketInfoObj){
			if(key == eid){
				var product = MarketInfoObj[key].product,productLen = product.length;
				for(var i=0;i<productLen;i++){
					var pid = product[i].pid,pname = product[i].pname;
					var html = "<li pid='"+pid+"' pname='"+pname+"' onclick='selectProductMouseClick(this,event)' onmouseover='selectExchangeMouseOver(this)' onmouseout='selectExchangeMouseOut(this)'>"+pname+"</li>";
					$('.'+productCls).append($(html));
				}
			}
			break;
		}
	}else{
		if(productObj.is(':hidden')){
			productObj.show();
		}
		productObj.empty();
		for(var key in MarketInfoObj){
			if(key == eid){
				var product = MarketInfoObj[key].product,productLen = product.length;
				for(var i=0;i<productLen;i++){
					var pid = product[i].pid,pname = product[i].pname;
					var html = "<li pid='"+pid+"' pname='"+pname+"' onclick='selectProductMouseClick(this,event)' onmouseover='selectExchangeMouseOver(this)' onmouseout='selectExchangeMouseOut(this)'>"+pname+"</li>";
					productObj.append($(html));
				}
				break;
			}
		}
	}
}
//合约点击
function marketInstrumentSelect(select){
	var productSelect = $(select).prev();
	var productSelectWrap = productSelect.find('.remodal-add-instru-select-product');
	if(!productSelectWrap.is(':hidden')){
		productSelectWrap.hide();
	}
	
	var exchangeSelect = $(select).prev();
	var exchangeSelectWrap = exchangeSelect.find('.remodal-add-instru-select-exchange');
	if(!exchangeSelectWrap.is(':hidden')){
		exchangeSelectWrap.hide();
	}
	
	var eid = $(select).attr('eid');
	var pid = $(select).attr('pid');
	var instruCls = 'remodal-add-instru-select-instru';
	var instruObj = $('.'+instruCls);
	if(instruObj.length == 0){
		var htmlFrag = "<div class='"+instruCls+"'><ul></ul></div>";
		var instruWrap = $('.remodal-add-instru-wrap').find('span[name=instrument]');
		instruWrap.append($(htmlFrag));
		var products = MarketInfoObj[eid].product,productLen = products.length;
		var selectInstruFrag = "<li iid='' iname='' onclick='selectInstruMouseClick(this,event)' onmouseover='selectExchangeMouseOver(this)' onmouseout='selectExchangeMouseOut(this)'>请选择合约</li>";
		$('.'+instruCls).append(selectInstruFrag);
		for(var i=0;i<productLen;i++){
			var product = products[i];
			if(pid == product.pid){
				var instruments = product.instrument,insLen = instruments.length;
				for(var j=0;j<insLen;j++){
					var ins = instruments[j],
						iid = ins.iid,
						iname = ins.iname;
					var html = "<li iid='"+iid+"' iname='"+iname+"' onclick='selectInstruMouseClick(this,event)' onmouseover='selectExchangeMouseOver(this)' onmouseout='selectExchangeMouseOut(this)'>"+iid+"</li>";
					$('.'+instruCls).append($(html));
				}
				break;
			}
		}
	}else{
		if(instruObj.is(':hidden')){
			instruObj.show();
		}
		instruObj.empty();
		var selectInstruFrag = "<li iid='' iname='' onclick='selectInstruMouseClick(this,event)' onmouseover='selectExchangeMouseOver(this)' onmouseout='selectExchangeMouseOut(this)'>请选择合约</li>";
		instruObj.append(selectInstruFrag);
		var products = MarketInfoObj[eid].product,productLen = products.length;
		for(var i=0;i<productLen;i++){
			var product = products[i];
			if(pid == product.pid){
				var instruments = product.instrument,insLen = instruments.length;
				for(var j=0;j<insLen;j++){
					var ins = instruments[j],
						iid = ins.iid,
						iname = ins.iname;
					var html = "<li iid='"+iid+"' iname='"+iname+"' onclick='selectInstruMouseClick(this,event)' onmouseover='selectExchangeMouseOver(this)' onmouseout='selectExchangeMouseOut(this)'>"+iid+"</li>";
					instruObj.append($(html));
				}
				break;
			}
		}
	}
}

//交易所鼠标悬浮事件
function selectExchangeMouseOver(li){
	$(li).css('color','#507BE7');
	$(li).css('background-color','black');
}
//交易所鼠标移出事件
function selectExchangeMouseOut(li){
	$(li).css('color','white');
	$(li).css('background-color','#4E5358');
}
//交易所下拉条鼠标点击
function selectExchageMouseClick(li,event){
	var eid = $(li).attr('eid');
	var ename = $(li).attr('ename');
	var parent = $(li).parents('span[name=exchange]');
	parent.find('span:first-child').html(ename);
	parent.attr('eid',eid);
	var productSelect = parent.next();
	productSelect.attr('eid',eid);
	var instruSelect = productSelect.next();
	instruSelect.attr('eid',eid);
	for(var key in MarketInfoObj){
		if(key == eid){
			var product = MarketInfoObj[key].product,productLen = product.length;
			for(var i=0;i<productLen;i++){
				if(i == 0){
					var pid = product[i].pid,
						pname = product[i].pname;
					productSelect.attr('pid',pid);
					productSelect.find('span:first-child').html(pname);
					
					instruSelect = productSelect.next();
					instruSelect.attr('pid',pid);
					instruSelect.find('span:first-child').html('请选择合约');
				}
			}
		}
	}
	var selectWrap = $(li).parents('.remodal-add-instru-select-exchange');
	selectWrap.hide();
	event.stopPropagation();
}
//产品下拉条鼠标点击
function selectProductMouseClick(li,event){
	var pid = $(li).attr('pid'),
		pname = $(li).attr('pname'),
		parent = $(li).parents('span[name=product]');
	parent.find('span:first-child').html(pname);
	parent.attr('pid',pid);
	var instruSelect = parent.next();
	instruSelect.attr('pid',pid);
	instruSelect.find('span:first-child').html('请选择合约');
	var selectWrap = $(li).parents('.remodal-add-instru-select-product');
	selectWrap.hide();
	event.stopPropagation();
}
//合约下拉条点击
function selectInstruMouseClick(li,event){
	var iid = $(li).attr('iid'),
		parent = $(li).parents('span[name=instrument]'),
		selectWrap = $(li).parents('.remodal-add-instru-select-instru');
	if(iid == '') return;
	parent.find('span:first-child').html(iid);
	parent.attr('iid',iid);
	selectWrap.hide();
	event.stopPropagation();
}
//添加合约
function KLAddInstruMouseDown(li){
	var hasInstru = $(li).attr('hasInstru');
	if(hasInstru != 'true'){
		RemodalInstance.open();
		var remodalWrap = $('.remodal');
		var titleWrap = remodalWrap.children('.remodal-title');
		titleWrap.html('添加合约');
		var contentWrap = remodalWrap.children('.remodal-content');
		contentWrap.attr('remodalConType','addInstrument');
		contentWrap.empty();
		var htmlFrag = "<div class='remodal-add-instru-wrap'>"+
				  	   	   "<span eid='' onclick='marketExchangeSelect(this)' name='exchange'><span></span><span name='combox-btn'></span></span>"+
				  	   	   "<span pid='' eid='' onclick='marketProductSelect(this)' name='product'><span></span><span name='combox-btn'></span></span>"+
				  	   	   "<span iid='' eid='' pid='' onclick='marketInstrumentSelect(this)' name='instrument'><span></span><span name='combox-btn'></span></span>"+
				  	   "</div>";
		contentWrap.append(htmlFrag);
		var exchangeSelect = contentWrap.find('span[name=exchange]');
		var productSelect = contentWrap.find('span[name=product]');
		var instrumentSelect = contentWrap.find('span[name=instrument]');
		var index = 0;
		for(var i in MarketInfoObj){
			var eid = MarketInfoObj[i].eid,
				ename = MarketInfoObj[i].ename,
				product = MarketInfoObj[i].product,
				productLen = product.length;
			if(index == 0){
				var pid = product[0].pid,pname = product[0].pname;
				exchangeSelect.attr('eid',eid);
				
				productSelect.attr('eid',eid);
				productSelect.attr('pid',pid);
				
				instrumentSelect.attr('eid',eid);
				instrumentSelect.attr('pid',pid);
				
				exchangeSelect.find('span:first-child').html(ename);
				productSelect.find('span:first-child').html(pname);
				instrumentSelect.find('span:first-child').html('请选择合约');
			}
			index++;
		}
	}
}
function KLDeleteInstrument(wrap){
	var parent = $(wrap).parent();
	var instru = parent.attr('value');
	RemodalInstance.open();
	var remodalWrap = $('.remodal');
	var titleWrap = remodalWrap.children('.remodal-title');
	titleWrap.html('删除合约');
	var contentWrap = remodalWrap.children('.remodal-content');
	contentWrap.attr('remodalConType','deleteInstrument');
	contentWrap.empty();
	var htmlFrag = "<div instru='"+instru+"' class='remodal-del-instru remodal-notification'>确定删除此合约么?"+
		"</div>";
	contentWrap.append($(htmlFrag));
}
//删除合约
function DeleteInstrumentHandler(iid){
	var method = 'room';//方法
	var inst=[];
	inst.push(iid);
	var data = {
		"aid":CurrentAccountID,
		"rmc":CurrentRMC,
		"uid":CurrentUserId,
		"lc":CurrentLC,
		"oper":"removeInst",
		"rid":CurrentRoomID,
		inst:inst
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
			console.log('delete instrument');
			console.log(data);
			if(state === 0){
				var res = data.res;
				var returncode = res.returncode;
				if(returncode == 0){//删除成功
					//正常是接到MQ推送数据后处理,先在这处理
					var instruListWrap = $('.KL_Instrument_Wrap'),
						liList = instruListWrap.find('li'),
						liLen = liList.length;
					for(var i=0;i<liLen;i++){
						var li = liList.eq(i);
						var value = li.attr('value');
						if(value == iid){
							li.remove();
							var liFrag = "<li value='' name='addInstrumentOne' onclick='KLAddInstruMouseDown(this)' onmouseover='KLAddInstruMouseOver(this)' onmouseout='KLAddInstruMouseOut(this)'><span name='instru_text_bg'><span name='instru_name'></span><span name='instru_id'></span></span><span name='instru_price'></span><span name='instru_del' onclick='KLDeleteInstrument(this)'></span></li>";
							instruListWrap.append($(liFrag));
							
							//下拉合约下拉选项重新赋值
							var selectObj = $('.Order_Instrument_Select');
							var delOption = selectObj.find('option[value='+iid+']');
							delOption.remove();
							
							var options = selectObj.find('option'),optionLen = options.length;
							//如果一个合约都没有了
							if(optionLen == 0){
								selectObj.val('');
							}
							//如果删除的合约是当前正选中的合约, 切换到第一个合约
							if(iid == selectObj.val()){
								for(var j=0;j<optionLen;j++){
									if(j == 0){
										selectObj.val(options.eq(j).attr('value'));
									}
								}
								orderInstrumentSwitch(selectObj[0]);
							}
							//修改添加合约区域, 第一个合约的样式
							var firstLi = liList.eq(0);
							if(firstLi.length != 0){
								firstLi.css('background-image','url(images/dingbuxuanzhongjiaoyi.png)');
								firstLi.attr('hasInstru',true);
								firstLi.attr('isSelect',true);
								firstLi.attr('value', iid);
								var textWrap = firstLi.find('span[name=instru_text_bg]');
								textWrap.css('background-image','url(images/heyueItemtxt_bg.png)');
								textWrap.css('color','white');
								var priceSpan = li.find('span[name=instru_price]');
								priceSpan.html(price);
								priceSpan.css('color','#E60302');
							}
							break;
						}
					}
				}else if(returncode == 26){//不能删除持仓合约
					RemodalInstance.open();
					var remodalWrap = $('.remodal');
					var titleWrap = remodalWrap.children('.remodal-title');
					titleWrap.html('删除合约提示');
					var contentWrap = remodalWrap.children('.remodal-content');
					contentWrap.attr('remodalConType','invalid');
					contentWrap.empty();
					var htmlFrag = "<div class='remodal-notification'>合约删除失败, 不能删除有持仓合约"+
						"</div>";
					contentWrap.append($(htmlFrag));
				}
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
//添加合约
function AddInstrumentHandler(iid){
	var method = 'room';//方法
	var inst=[];
	inst.push(iid);
	var data = {
		"aid":CurrentAccountID,
		"rmc":CurrentRMC,
		"uid":CurrentUserId,
		"lc":CurrentLC,
		"oper":"addInst",
		"rid":CurrentRoomID,
		inst:inst
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
			console.log('add instrument');
			console.log(data);
			if(state === 0){
				var res = data.res;
				var returncode = res.returncode;
				if(returncode == 0){//添加成功
					//正常是接到MQ数据后处理,暂时在这先调试
					var instruListWrap = $('.KL_Instrument_Wrap'),
						liList = instruListWrap.find('li'),
						liLen = liList.length;
					var price=0,iname='测试';
					/*var iid = tempData.iid;
						iname = tempData.iname,
						step = tempData.step,
						price = tempData.price,
						volmul = tempData.volmul,
						deprate = tempData.deprate;*/
					for(var i=0;i<liLen;i++){
						var li = liList.eq(i);
						var value = li.attr('value');
						var isSelect = li.attr('isSelect');
						//取消选中样式
						if(isSelect == 'true'){
							li.css('background-image','url(images/dingbumorenjiaoyi.png)');
							li.attr('hasInstru',true);
							li.attr('isSelect',false);
							var priceSpan = li.find('span[name=instru_price]');
							priceSpan.css('color','#06E65A');
							var textWrap = li.find('span[name=instru_text_bg]');
							textWrap.css('background-image','');
							textWrap.css('color','black');
						}
						if(value == ''){
							var addInstruBg = 'url(images/dingbuxuanzhongjiaoyi.png)',
								isSelect = true,
								pricecolor='#E60302';
							var textWrap = li.find('span[name=instru_text_bg]');
							textWrap.css('background-image','url(images/heyueItemtxt_bg.png)');
							textWrap.css('color','white');
							//添加选中样式
							var inameSpan = li.find('span[name=instru_name]');
							inameSpan.html(iname);
							var iidSpan = li.find('span[name=instru_id]');
							iidSpan.html(iid);
							li.css('background-image',addInstruBg);
							li.attr('hasInstru',true);
							li.attr('isSelect',isSelect);
							li.attr('value',iid);
							var priceSpan = li.find('span[name=instru_price]');
							priceSpan.html(price);
							priceSpan.css('color',pricecolor);
							//切换合约
							var selectObj = $('.Order_Instrument_Select');
							var htmlFrag = "<option value='"+iid+"'>"+iid+"</option>";
							selectObj.append($(htmlFrag));
							selectObj.val(iid);
							//全局对象RoomInstrumentListInfo的设置
							/*RoomInstrumentListInfo[iid]={
								deprate:tempData.deprate,
								digits:0,
								iid:tempData.iid,
								price:tempData.price,
								step:tempData.step,
								volmul:tempData.volmul
							};*/
							orderInstrumentSwitch(selectObj[0]);
							break;
						}
					}
				}
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