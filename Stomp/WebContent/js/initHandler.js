function getOrderManagerConditionTpl(){
	var html = "<div class='Order_Manager_TB_Condition'>"+
				"<table border='1' cellspacing='0' cellpadding='1'>"+
					"+<tr>"+
						"+<th>类型</th>"+
						"+<th>状态</th>"+
						"+<th>触发条件</th>"+
						"+<th>合约</th>"+
						"+<th>买卖</th>"+
						"+<th>开平</th>"+
						"+<th>报单价格</th>"+
						"+<th>报单手数</th>"+
						"+<th>预埋时间</th>"+
						"+</tr>"+
						"+<tr>"+
						"+<td></td>"+
						"+<td></td>"+
						"+<td></td>"+
						"+<td></td>"+
						"+<td></td>"+
						"+<td></td>"+
						"+<td></td>"+
						"+<td></td>"+
						"+<td></td>"+
						"+</tr>"+
						"+</table>"+
						"+</div>";
	return html;
}

//设置其他分段按钮的样式
function setKLIntervalStyle(list){
	var i=0,length=list.length;
	for(;i<length;i++){
		var li = list[i];
		if($(li).attr('isMouseDown') == 'true'){
			$(li).attr('isMouseDown','false');
			$(li).css('backgroundColor','transparent');
			$(li).css('color','#8494A4');
		}
	}
}
//设置K线周期事件
function setKLIntervalEvent(KLTimeShareList){
	var i=0,length=KLTimeShareList.length;
	//设置分时段按钮的点击事件
	for(;i<length;i++){
		var li = KLTimeShareList[i];
		var value = $(li).val();
		$(li).attr('isMouseDown','false');
		$('li').mousedown(function(e){
			if($(this).attr('isMouseDown') == 'false'){
				CurrentDataTime = null;
				LoadHisKLData = false;
				MQMessageMonitor = false;
				setKLIntervalStyle(KLTimeShareList);//设置其他分时样式
				$(this).attr('isMouseDown','true');
				$(this).css('backgroundColor','#8494A4');
				$(this).css('color','black');
				//取消原来的订阅 ,开始新的订阅
				if(MQStompSub) MQStompSub.unsubscribe();
				var val = $(this).val()
				loadHisKLineData(val);//加载数据  
				//drawKL();//画图
			}
		});
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

$(document).ready(function() {
	window.MQStompClient = null;
	window.MQStompSub = null;
	window.MQMessageMonitor = false;
	window.LoadHisKLData = false;
	window.CurrentDataTime = null;
	window.LoadHisLineFinish = false;
	window.LoadTapeFinish = false;
	//分时段设置
	var KLTimeShareDiv = $('div.KL_TimeShareChart_Interval');
	var KLTimeShareList = KLTimeShareDiv.find("li");
	setKLIntervalEvent(KLTimeShareList);
	
	//下单器设置
	var orderManagerFirstWrap = $('.KL_OrderManager_FirstWrap');
	if(orderManagerFirstWrap.length != 0){
		orderManagerLeftRegion(orderManagerFirstWrap);
	}
	
  if(window.WebSocket) {
      var destination;
      //订阅数据WS接口地址
      MQStompClient = Stomp.client(MQWSFullUrl);
	  MQStompClient.connect("","", function(frame) {
		  //默认触发1分钟K线图
		  $(KLTimeShareList[0]).trigger('mousedown');
      }); 
  } else {
    $("#connect").html("\
        <h1>Get a new Web Browser!</h1>\
        <p>\
        Your browser does not support WebSockets. This example will not work properly.<br>\
        Please use a Web Browser with WebSockets support (WebKit or Google Chrome).\
        </p>\
    ");
  }
  //获取盘口数据
  getTapeData();
});