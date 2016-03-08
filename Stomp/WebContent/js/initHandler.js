$(document).ready(function() {
	window.MQStompClient = null;
	window.MQStompSub = null;
	window.MQMessageMonitor = false;
	window.LoadHisKLData = false;
	window.CurrentDataTime = null;
	//设置其他分段按钮的样式
	function setKLTimeSharingInterStyle(list){
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
	
	var KLTimeShareDiv = $('div.KL_TimeShareChart_Interval');
	var KLTimeShareList = KLTimeShareDiv.find("li");
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
				setKLTimeSharingInterStyle(KLTimeShareList);//设置其他分时样式
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
});