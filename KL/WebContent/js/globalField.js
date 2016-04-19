window.WebServiceTransferUrl = 'http://jyw.zlw.com';
window.KLWSClient = null;//K线WS客户端
window.KLWSSubscribe = null;//K线数据订阅者
window.AccountWSSubscribe = null;//账户数据订阅者
window.TapWSSubscribe=null;//盘口数据订阅者
window.KLMQMessageMonitor = false;//K线消息监听标记
window.TradeWSClient = null; //交易WS客户端
window.CurrentDataTime = null;//当前更新K线开盘时间
window.LoadKLineDataFinish = false;//K线数据是否加载完成
window.LoadTapeFinish = false;//盘口是否加载完成

window.KLWebSocketUrl = 'ws://192.168.1.188:61610';
window.TradeWebSocketUrl = 'ws://192.168.1.188:61625';
window.WebServiceStrageUrl = 'http://192.168.1.231:8080/axis2/services/StrategyEngine?wsdl';
window.WebServiceTradeUrl = 'http://192.168.1.227:8888/axis2/services/SimTrade?wsdl';
window.CurrentAccountID = 3179;
window.CurrentRoomID=1553;
window.CurrentUserId=12583;
window.CurrentLC='ea46bff33476133b71a17210bcd2b28e';
window.CurrentRMC=8514;

window.KLWebSocketUrl='ws://mq1.zlw.com:61634';
window.TradeWebSocketUrl='ws://mq1.zlw.com:61633';
//K线内网 192.168.1.157 ,Trade内网: 192.168.1.151
window.WebServiceStrageUrl = 'http://kline1.zlw.com:8080/axis2/services/StrategyEngine?wsdl';
window.WebServiceTradeUrl = 'http://simtradesvc.zlw.com:8888/axis2/services/SimTrade?wsdl';
window.CurrentAccountID = 18349;
window.CurrentRoomID=17384;
window.CurrentUserId=348517;
window.CurrentLC='4eed4aa58024f9c608cc72ff8d37d4bf';
window.CurrentRMC=68300;

window.CurrentInstrumentID = '';//当前合约
window.CurrentInstrumentDigits = 0;//价格后保留小数位数
window.RoomInstrumentListInfo = {};
window.AjaxTimeOut = 90000;//ajax请求超时时间
window.AvalibleAmount = 0;//可用资金
window.CanvasPagePosition={};//canvas相对坐标
window.GlobalKLOptionObj = null;//canvas配置
window.GlobalKLYAxisObj = null;
window.KLPainter=null;//画家对象
window.CurrentKLObj = null;//全局KL对象
window.CurrentDataTime = null;//接受MQ数据时,判断是否是一个时间段的K线
window.GlobalKLData = { //存储所有K线数据
	ks:[]
};
window.CurrentKLStartDate=0;//当前K线开始时间
window.CurrentKLEndDate=0;//当前K线结束时间
window.CurrentKLInterval = 60;//当前K线周期
window.CurrentBarWidth=10; //K线的宽度
window.CurrentSpaceWidth=4;//K线之间的间距
window.CurrentMaxKLShowCount = 0;
window.CurrentKLStartIndex=0;
window.CurrentKLEndIndex=0;
window.KLHasTradePointer = false;//当前K线是否有交易点
window.CurrentKLXIndex=null;//标记当前鼠标所在K线的X索引(在整个屏幕K线范围内 0 ~ 屏幕显示K线最大值)
window.PendingDeputeInitFinish = false;//标识委托单是否初始化完成
window.PendingDeputePriceArr=[];//存储委托挂单的报单价格
window.SwitchInstruLoadKL= false; //是否是切换合约, 加载K线数据
window.MarketInfoObj={};//存储市场行情
window.AllOrderInitFinish = false;
window.SystemDataLoadFinish = false;
window.CurrentPresettlement=null; //昨结价
window.CurrentServiceRootPath='test/KL/WebContent/';
window.CurrentImagePath='images';
//当前MA设置
window.CurrentKLMASet = 'ma';//noShow,ma,boll
//KL日均线
window.CurrentKLMAArr = ['MA1','MA2','MA3'];
window.GlobalKLMAObj={
	'MA1':{
		name:'MA5',
		count:5,
		color:'#0063CD'
	},
	'MA2':{
		name:'MA10',
		count:10,
		color:'#FFCB34'
	},
	'MA3':{
		name:'MA20',
		count:20,
		color:'#71DDFF'
	},
	'MA4':{
		name:'MA30',
		count:30,
		color:'#FF3009'
	},
	'MA5':{
		name:'MA40',
		count:40,
		color:'#969696'
	},
	'MA6':{
		name:'MA60',
		count:60,
		color:'#E65696'
	},
	'MA7':{
		name:'MA120',
		count:120,
		color:'#A66CBD'
	},
	'MA8':{
		name:'MA250',
		count:250,
		color:'#A3D648'
	}
};
//Remodal default width and height
window.RemodalDefaultWidth = 440;
window.RemodalDefaultHeight = 285;