//根据日期转换成日期字符整数 
function converDateStrByDate(date){
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	if(month < 10) month ="0"+month;
	if(day < 10) day = "0"+day;
	return parseInt(year+""+month+""+day);
}
//日期转换  根据时间串,分离出年月日 如(20160215)
function convertDate(val, withWeek) {
    var year = Math.ceil(val / 10000) - 1;//ceil向上取整數天花板数
    var day = val % 100;
    var month = (Math.ceil(val / 100) - 1) % 100;
    var d = new Date();
    d.setYear(year);
    d.setMonth(month - 1);
    d.setDate(day);//设置一个月的某一天
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (withWeek) {
        var weekNames = ['日', '一', '二', '三', '四', '五', '六'];
        //Date.getDay()返回星期中的某一天, 返回0~6之间的数, 0表示星期日
        var time = year + '-' + month + '-' + day + '(星期' + weekNames[d.getDay()] + ')';
        return time;
    }
    else {
    	//console.log("年->"+year+"月->"+month+"日->"+day);
        return year + '-' + month + '-' + day;
    }
}
//根据毫秒数获取时分秒
function msecondConvertToDate(millisecond){
	var date = new Date(millisecond);
	var hours = date.getHours(),
	minutes = date.getMinutes(),
	seconds=date.getSeconds();
	hours = hours < 10 ? hours+'0' : hours;
	minutes = minutes < 10 ? minutes + '0' : minutes;
	seconds = seconds < 10 ? seconds + '0' : seconds;
	return hours+':'+minutes+':'+seconds;
}

//根据毫秒数, 获取年月日格式为  yyyy/MM/dd
function getYMDFormatOne(millisecond){
	var date = new Date(millisecond);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	month = month < 9? '0'+month:month;
	var day = date.getDate();
	day = day < 9? '0'+day:day;
	var ymd = year+'/'+month+'/'+day;
	return ymd;
}
//根据毫秒数, 获取时分
function getHourMinute(millisecond){
	var date = new Date(millisecond);
	var hours = date.getHours(),
	minutes = date.getMinutes();
	hours = hours < 10 ? hours+'0' : hours;
	minutes = minutes < 10 ? minutes + '0' : minutes;
	return hours+':'+minutes;
}

//获取当前时分秒
function getCurrentHMS(){
	var date = new Date();
	var hours = date.getHours(),
	minutes = date.getMinutes(),
	seconds=date.getSeconds();
	hours = hours < 10 ? hours+'0' : hours;
	minutes = minutes < 10 ? minutes + '0' : minutes;
	seconds = seconds < 10 ? seconds + '0' : seconds;
	return hours+':'+minutes+':'+seconds;
}
//获取当天的毫秒数
function getCurrentMilliSecond(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	month = month < 9? '0'+month:month;
	var day = date.getDate();
	var ds = year+'-'+month+'-'+day;
	return Date.parse(ds+' 00:00:00');
}
//获取当前的毫秒数
function getCurrentTimes(){
	var date = new Date();
	var time = date.getTime();
	return time;
}
//获取当天的年月日
function getCurrentYMD(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	month = month < 9? '0'+month:month;
	var day = date.getDate();
	return year+'-'+month+'-'+'-'+day;
}