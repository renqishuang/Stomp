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
	$(div).css('background-image','url('+CurrentImagePath+'/showLegend_small1.png)');
	$('.KL_Legend_Bg').hide();
}
function soundMouseClick(div){
	var isClick = $(div).attr('isClick');
	$(div).css('background-image','none');
	if(isClick == 'false'){
		$('.KL_Sound_Bg').css('background-image','url('+CurrentImagePath+'/openSound_small2.png)');
		$(div).attr('isClick',true);
	}else{
		$('.KL_Sound_Bg').css('background-image','url('+CurrentImagePath+'/closeSound_small2.png)');
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
		$(div).css('background-image','url('+CurrentImagePath+'/closeSound_small1.png)');
	}else{
		$(div).css('background-image','url('+CurrentImagePath+'/openSound_small1.png)');
	}
	$('.KL_Sound_Bg').hide();
}
function tradeLineMouseClick(div){
	var isClick = $(div).attr('isClick');
	$(div).css('background-image','none');
	if(isClick == 'false'){
		$('.KL_TradeLine_Bg').css('background-image','url('+CurrentImagePath+'/showTradeLine_small2.png)');
		$(div).attr('isClick',true);
	}else{
		$('.KL_TradeLine_Bg').css('background-image','url('+CurrentImagePath+'/hideTradeLine_small2.png)');
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
		$(div).css('background-image','url('+CurrentImagePath+'/hideTradeLine_small1.png)');
	}else{
		$(div).css('background-image','url('+CurrentImagePath+'/showTradeLine_small1.png)');
	}
	$('.KL_TradeLine_Bg').hide();
}
function fullScreenMouseClick(div){
	var isClick = $(div).attr('isClick');
	$(div).css('background-image','none');
	if(isClick == 'false'){
		$('.KL_FullScreen_Bg').css('background-image','url('+CurrentImagePath+'/exitFullScreen_small2.png)');
		$(div).attr('isClick',true);
	}else{
		$('.KL_FullScreen_Bg').css('background-image','url('+CurrentImagePath+'/fullScreen_small2.png)');
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
		$(div).css('background-image','url('+CurrentImagePath+'/fullScreen_small1.png)');
	}else{
		$(div).css('background-image','url('+CurrentImagePath+'/exitFullScreen_small1.png)');
	}
	$('.KL_FullScreen_Bg').hide();
}
function MASelectClick(select,e){
	$(select).css('color','black');
	$(select).css('background-color','rgb(132, 148, 164)');
	$(select).css('border-bottom','1px solid black');
	$('.KL_MA_Select_Indicate').css('background-image','url('+CurrentImagePath+'/indicatrixComboxBtn_select.png)');
	$('.KL_MA_Options_Wrap').show();
	e.stopPropagation();
}
function maOptionMouseClick(option,event){
	var name = $(option).attr('name'),type
	if(CurrentKLMASet == name) return;
	CurrentKLMASet = name;
	var maWrap = $('.KL_MA_Price_Wrap');
	if(name == 'noShow'){
		type = '不显示';
		if(maWrap.length != 0){
			maWrap.find('span').hide();
		}
	}else if(name == 'ma'){
		type = 'MA组合';
		if(maWrap.length != 0){
			maWrap.find('span').show();
		}
	}else if(name == 'boll'){
		type = 'BOLL';
	}
	var selectWrap = $('.KL_MA_Select');
	selectWrap.find('span[name=ma_type_wrap]').html(type);
	selectWrap.css('color','rgb(132, 148, 164)');
	selectWrap.css('background-color','#191F26');
	selectWrap.css('border','1px solid rgb(132, 148, 164)');
	$('.KL_MA_Select_Indicate').css('background-image','url('+CurrentImagePath+'/indicatrixComboxBtn_normal.png)');
	$(option).parent().hide();
	event.stopPropagation();
	//重新画图
	drawKL();
}
function maOptionMouseOver(option){
	$(option).css('background-color','#A0B2BB');
}
function maOptionMouseOut(option){
	$(option).css('background-color','rgb(132, 148, 164)');
}
function indicatrixSetMouseClick(btn){
	RemodalInstance.open();
	var remodalWrap = $('.remodal');
	if(remodalWrap.length == 0 ) return;
	//设置高度和宽度
	var maRemodalWidth = 335,maRemodalHeight = 415;
	
	remodalWrap.css('width',maRemodalWidth);
	remodalWrap.css('height',maRemodalHeight);
	
	var titleWrap = remodalWrap.children('.remodal-title');
	titleWrap.html('MA提示');
	var contentWrap = remodalWrap.children('.remodal-content');
	contentWrap.attr('remodalConType','invalid');
	contentWrap.empty();
	var MASetWrapCls = 'MA_Set_Menu';
	var htmlFrag = "<div class='"+MASetWrapCls+"'>"+
						"<div name='comment_wrap'>"+
							"<span name='comment'>选择显示的均线(最多可显示3条)</span>"+
							"<span name='default'>恢复默认</span>"+
						"</div>"+
						"<ul></ul>"+
					"</div>";
	contentWrap.append($(htmlFrag))
	var maWrap = $('.'+MASetWrapCls);
	if(maWrap.length !=  0){
		var ul = maWrap.find('ul');
		var maIndex = 1;
		var currentCheckCount = CurrentKLMAArr.length;
		
		ul.attr('checkCount',currentCheckCount);
		for(var m in GlobalKLMAObj){
			var name = GlobalKLMAObj[m].name,
				color = GlobalKLMAObj[m].color,
				count = GlobalKLMAObj[m].count;
			var elCount = CurrentKLMAArr.containEleCount(m);
			var nameColor = '#7D8A9A';
			var checkUrl = 'url(images/maset_combox_normal.png)',
				isCheck = false;
			if(elCount > 0){
				nameColor = 'white';
				checkUrl = 'url(images/maset_combox_select.png)';
				isCheck = true;
			}
			var liFrag = "<li>"+
							"<span isClick='"+isCheck+"' name='check_label'>"+
								"<span style='background-image:"+checkUrl+";' name='check'></span>"+
								"<span style='color:"+nameColor+";' name='name'>MA"+maIndex+"</span>"+
							"</span>"+
							"<input value='"+count+"' type='text'>"+
							"<span name='color_wrap'>"+
								"<input value='"+color+"' type='color'>"+
								"<span style='background-color:"+color+";' name='select'></span>"+
							"</span>"+
						"</li>";
			ul.append($(liFrag));
			maIndex++;
		}
		//MA颜色选择事件
		var colorWrap = maWrap.find('input[type=color]');
		colorWrap.bind('change',function(){
			MAColorSet($(this)[0]);
		});
		//check选择事件
		var checkWrap = maWrap.find('span[name=check_label]');
		checkWrap.click(function(){
			var isClick = $(this).attr('isClick');
			var ulWrap = $(this).parents('ul');
			var checkCount = Number(ulWrap.attr('checkCount'));
			if(isClick == 'false'){
				if(checkCount == 3){
					alert('最多可选择3条均线');return;
					/*RemodalInstance.open();
					var remodalWrap = $('.remodal');
					if(remodalWrap.length == 0 ) return;
					remodalWrap.css('width',RemodalDefaultWidth);
					remodalWrap.css('height',RemodalDefaultHeight);
					var titleWrap = remodalWrap.children('.remodal-title');
					titleWrap.html('系统提示');
					var contentWrap = remodalWrap.children('.remodal-content');
					contentWrap.attr('remodalConType','invalid');
					contentWrap.empty();
					var htmlFrag = "<div class='remodal-notification'>最多可选择3条均线"+
						"</div>";
					contentWrap.append($(htmlFrag));
					return;*/
				}
				ulWrap.attr('checkCount',checkCount+1);
				$(this).find('span[name=check]').css('background-image','url(images/maset_combox_select.png)');
				$(this).find('span[name=name]').css('color','white');
				$(this).attr('isClick',true);
			}else{
				ulWrap.attr('checkCount',checkCount-1);
				//判断已选择的MA个数
				$(this).find('span[name=check]').css('background-image','url(images/maset_combox_normal.png)');
				$(this).find('span[name=name]').css('color','#7D8A9A');
				$(this).attr('isClick',false);
			}
		});
	}
	/*var htmlFrag = "<div class='remodal-notification'>请选择正确合约id"+
		"</div>";
	contentWrap.append($(htmlFrag));*/
}
function indicatrixSetMouseOver(btn){
	$(btn).css('background-image','url('+CurrentImagePath+'/indicatrixSetBtn2.png)');
}
function indicatrixSetMouseOut(btn){
	$(btn).css('background-image','url('+CurrentImagePath+'/indicatrixSetBtn1.png)');
}
function MAColorSet(input){
	var color = $(input).val();
	$(input).next().css('background-color',color);
}