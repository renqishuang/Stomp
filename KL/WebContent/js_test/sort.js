/**
 * 数组按数字正序排列
 */
Array.prototype.numberSort=function(){
	this.sort(function(a,b){
		return a-b;
	});
}
/**
 * 数组按数字倒序排列
 */
Array.prototype.numberReverse=function(){
	this.sort(function(a,b){
		return b-a;
	});
}
/**
 * JSON数组按照指定排列
 * key JSON对象Key值
 * reverse 是否反转
 * type 数据类型 
 */
function JSONSort(key, reverse, type) {
    rev = (reverse) ? -1 : 1;
    return function (a, b) {
        a = a[key];
        b = b[key];
        if (typeof (primer) != 'undefined') {
            a = type(a);
            b = type(b);
        }
        if (a < b) { return rev * -1; }
        if (a > b) { return rev * 1; }
        return 1;
    }
};