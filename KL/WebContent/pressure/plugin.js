/**
 * jQuery的插件开发级别有两种
 * 1)类级别
 * 2)对象级别
 */
//1.类级别  , 书写方式  $/jQuery都可以,  $.pluginName / $[pluginName] 都可以,如下
$.Renqs={
	name:function(){
		alert('插件开发');
	}
}
$['Hui']={
	name:function(){
		alert('类级别的插件开发');
	}
};
//调用方式  $.Renqs.name()/$['Hui'].name();