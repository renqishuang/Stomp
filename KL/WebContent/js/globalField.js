window.WebServiceTransferUrl = 'http://jyw.zlw.com';
window.KLWebSocketUrl = 'ws://192.168.1.188:61610';
window.TradeWebSocketUrl = 'ws://192.168.1.188:61625';
window.KLWebSocketUrl='ws://mq1.zlw.com:61634';
window.TradeWebSocketUrl='ws://mq1.zlw.com:61633';

//window.WebServiceStrageUrl = 'http://192.168.1.231:8080/axis2/services/StrategyEngine?wsdl';
//window.WebServiceTradeUrl = 'http://192.168.1.227:8888/axis2/services/SimTrade?wsdl';
window.WebServiceStrageUrl = 'http://kline1.zlw.com:8080/axis2/services/StrategyEngine?wsdl';
window.WebServiceTradeUrl = 'http://simtradesvc.zlw.com:8888/axis2/services/SimTrade?wsdl';

window.CurrentInstrumentID = 'i1609';//当前合约
window.CurrentAccountID = 3179;
window.CurrentRoomID=1553;
window.CurrentUserId=3018;
window.CurrentLC='lkajoasd8';
window.CurrentRMC=4928;

window.CurrentAccountID = 18349;
window.CurrentRoomID=17384;
window.CurrentUserId=348517;
window.CurrentLC='4eed4aa58024f9c608cc72ff8d37d4bf';
window.CurrentRMC=68300;

window.CurrentInstrumentDigits = 1;//价格后保留小数位数
window.CurrentInstrumentInfo={};//合约信息(包括价格小数点位数等)
window.AjaxTimeOut = 30000;//ajax请求超时时间
window.AvalibleAmount = 0;//可用资金
window.CanvasPagePosition={};//canvas相对坐标
window.GlobalKLOptionObj = null;//canvas配置
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