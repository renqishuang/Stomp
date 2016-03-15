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
function OMSetMouseOver(div){
	$(div).css('background-image','url(images/order_manager_set_down.png)');
}
function OMSetMouseOut(div){
	$(div).css('background-image','url(images/order_manager_set_up.png)');
}
function OMConditionMouseOver(div){
	$(div).css('background-image','url(images/matiaojian0.png)');
}
function OMConditionMouseOut(div){
	$(div).css('background-image','url(images/matiaojian1.png)');
}
function OMConditionMouseDown(div){
	$(div).css('background-image','url(images/matiaojian1.png)');
}
function OMOrderMouseOver(div){
	$(div).css('background-image','url(images/maxiadan0.png)');
}
function OMOrderMouseOut(div){
	$(div).css('background-image','url(images/maxiadan1.png)');
}
function OMOrderMouseDown(div){
	$(div).css('background-image','url(images/maxiadan1.png)');
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