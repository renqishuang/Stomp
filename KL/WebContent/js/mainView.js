function signalsConnectMouseOver(div,e){
	//console.log($(div));
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
		ShowTrandePointLine = false;
		drawKL();
	}else{
		$('.KL_TradeLine_Bg').css('background-image','url('+CurrentImagePath+'/hideTradeLine_small2.png)');
		$(div).attr('isClick',false);
		ShowTrandePointLine = true;
		drawKL();
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
function screenWidthAndHeightSet(width,height){
	//整个区域宽高设置
	var KLWrap = $('.KL_Wrap_Div');
	KLWrap.css('width',width);
	KLWrap.css('height',height);
	//KLWrap.css('margin','0px');
	//中心区域高度设置
	var mainView = $('.KL_MainView_Wrap');
		centerRegion = $('.KL_MainView_Region_Center'),
		leftSplit = $('.KL_MainView_Region_Left'),
		leftTrade = $('.KL_MainView_Left_Trade'),
		rightSplit = $('.KL_MainView_Region_Right'),
		headerRegion = $('.KL_Instrument_Wrap'),
		footerRegion = $('.KL_FooterRegion'),
		asideRegion= $('.KL_TapeViewer_Wrap');
	var leftSplitWidth = rightSplit.width(),
		rightSplitWidth = rightSplit.width();
	if(!leftTrade.is(':hidden')) leftSplitWidth += leftTrade.width(); 
	var centerHeight = height - headerRegion.height() - footerRegion.height();
	centerHeight = centerHeight-3;//好像是有边框
	mainView.css('height',centerHeight);
	asideRegion.css('height',centerHeight);
	//中心区域内部组件高度设置
	var intervalWrap = $('.KL_TimeShareChart_Interval'),
		maWrap = $('.KL_MA_Price_Wrap');
		orderWrap = $('.KL_OrderManger_Wrap'),
		yCanvas = $('.KL_Canvas_Y_Axis_Region'),
		klCanvas = $('.KL_Canvas'),
		moveWrap = $('.KL_Canvas_Move_Wrap');
	var centerMainHeight = centerHeight - intervalWrap.height() 
		- maWrap.height() - orderWrap.height();
	centerMainHeight = centerMainHeight - 4;//好像是有边框
	yCanvas[0].height = centerMainHeight;
	klCanvas[0].height = centerMainHeight;
	moveWrap.css('height',centerMainHeight);
	//盘口界面高度设置
	var tapeView = $('.KL_TapeViewer_Wrap');
	var	tapeViewWidth = tapeView.width();
	if(tapeView.is(':hidden')) tapeViewWidth=0;
	var tapeViewOne = $('.Tape_Sub_Viewer_One');
	var tapeViewTwo = $('.Tape_Sub_Viewer_Two');
	var tapeViewThree = $('.Tape_Sub_Viewer_Three');
	var tapeViewFour = $('.Tape_Sub_Viewer_Trade');
	var tapeViewFive = $('.Tape_Sub_Viewer_Trade_Profit');
	var tapeThreeHeight = centerHeight - tapeViewOne.height() - tapeViewFour.height() 
		- tapeViewFive.height();
	tapeViewThree.css('height',tapeThreeHeight/2-2);
	tapeViewTwo.css('height',tapeThreeHeight/2-2);
	//中心区域宽度设置
	var orderManaFirstWrap = $('.KL_OrderManager_FirstWrap');
	var orderManaSeconWrap = $('.KL_OrderManager_SecondWrap');
	var mainViewWidth = width-tapeViewWidth;
	mainView.css('width',mainViewWidth);
	var centerWidth = mainViewWidth-leftSplitWidth-rightSplitWidth;
	centerRegion.css('width',centerWidth);
	var klCanvasWidth = centerWidth - yCanvas[0].width - moveWrap.width()-10;
	klCanvas[0].width=klCanvasWidth;
	
	orderManaFirstWrap.css('width',centerWidth-orderManaSeconWrap.width()-10);
	//重新画图
	drawKL();
	//账户信息界面设置
	var KLFooterWrap = $('.KL_FooterRegion');
	if(KLFooterWrap.length != 0){
		KLFooterWrap.find('li').css('width',KLFooterWrap.width()/9-2);
	}
	//挂单提示黄色虚线
	var canvasCoord =getPageCoord($('.KL_Canvas')[0]);
	var orderDashWraps = $('div[class^=order-dashed-wrap-]'),
		orderDashLen = orderDashWraps.length;
	for(var i=0;i<orderDashLen;i++){
		var dashWrap = orderDashWraps.eq(i);
		if(!dashWrap.is(':hidden')){
			dashWrap.css('left',canvasCoord.x);
			dashWrap.css('width',$('.KL_Canvas')[0].width);
		}
	}
	//条件单提示红色虚线
	var coorderDashWraps = $('div[class^=coorder-dashed-wrap-]');
		coorderDashLen = coorderDashWraps.length;
	for(var i=0;i<coorderDashLen;i++){
		var dashWrap = coorderDashWraps.eq(i);
		if(!dashWrap.is(':hidden')){
			dashWrap.css('left',canvasCoord.x);
			dashWrap.css('width',$('.KL_Canvas')[0].width);
		}
	}
	//最新价格提示框
	var lastPriceLeft = $('.KL_Y_Axis_Last_Price_Tip_Left');
	var lastPriceRight = $('.KL_Y_Axis_Last_Price_Tip_Right');
	var yAxisCoord = getPageCoord($('.KL_Canvas_Y_Axis_Region')[0]);
	if(!lastPriceLeft.is(':hidden')){
		lastPriceLeft.css('left',yAxisCoord.x);
	}
	if(!lastPriceRight.is(':hidden')){
		lastPriceRight.css('left',yAxisCoord.x+$('.KL_Canvas_Y_Axis_Region')[0].width+
				$('.KL_Canvas')[0].width);
	}
}

function fullScreenMouseClick(div){
	var isClick = $(div).attr('isClick');
	$(div).css('background-image','none');
	if(isClick == 'false'){
		$('.KL_FullScreen_Bg').css('background-image','url('+CurrentImagePath+'/exitFullScreen_small2.png)');
		$(div).attr('isClick',true);
		var width = screen.availWidth, //宽度用screen对象 高度用window对象
			height = window.innerHeight;
		screenWidthAndHeightSet(width,height);
	}else{
		$('.KL_FullScreen_Bg').css('background-image','url('+CurrentImagePath+'/fullScreen_small2.png)');
		$(div).attr('isClick',false);
		var width = MainViewDefaultWidth;
			height = MainViewDefaultHeight;
		screenWidthAndHeightSet(width,height);
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
	if(maWrap.length == 0) return;
	if(name == 'noShow'){
		type = '不显示';
		maWrap.find('span[type=MA]').hide();
		maWrap.find('span[type=MA]').next().hide();
		maWrap.find('span[type=BOLL]').hide();
		maWrap.find('span[type=BOLL]').next().hide();
	}else if(name == 'ma'){
		type = 'MA组合';
		maWrap.find('span[type=BOLL]').hide();
		maWrap.find('span[type=BOLL]').next().hide();
		maWrap.find('span[type=MA]').show();
		maWrap.find('span[type=MA]').next().show();
	}else if(name == 'boll'){
		maWrap.find('span[type=MA]').hide();
		maWrap.find('span[type=MA]').next().hide();
		maWrap.find('span[type=BOLL]').show();
		maWrap.find('span[type=BOLL]').next().show();
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
	contentWrap.attr('remodalConType','MASet');
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
					MesBoxInstance.show();
					MesBoxInstance.setContent('最多可选择3条均线');
					return;
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
//K线移动事件
function canvasMoveHandler(btn){
	var name = btn.attr('name');
	if(name == 'up'){
		if(CurrentBarWidth >= 54) return;
		CurrentBarWidth += 2;
		$('img[type=tradePoint]').css('width',$('img[type=tradePoint]').width()+1);
		$('img[type=tradePoint]').css('height',$('img[type=tradePoint]').height()+1);
		drawKL();
	}else if(name == 'down'){
		if(CurrentBarWidth <= 10) return;
		CurrentBarWidth -= 2;
		$('img[type=tradePoint]').css('width',$('img[type=tradePoint]').width()-1);
		$('img[type=tradePoint]').css('height',$('img[type=tradePoint]').height()-1);
		drawKL();
	}else if(name == 'left'){
		if(CurrentKLStartIndex <= 0) return;
		CurrentKLMoveMark = true;
		CurrentKLStartIndex -= 3;
		CurrentKLEndIndex -= 3;
		drawKL();
	}else if(name == 'right'){
		var totalCount = GlobalKLData.ks.length;
		//大于KL数据的总个数时，停止移动
		if(CurrentKLEndIndex >= totalCount - 1) {
			CurrentKLMoveMark = false;
			return;
		}
		CurrentKLStartIndex += 3;
		CurrentKLEndIndex += 3;
		drawKL()
	}
}