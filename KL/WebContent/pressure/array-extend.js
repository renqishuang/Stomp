Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);  
};  
Array.prototype.numberSort=function(){
	this.sort(function(a,b){
		return a-b;
	});
}
Array.prototype.numberReverse=function(){
	this.sort(function(a,b){
		return b-a;
	});
}
function JSONSort(key, reverse, type) {
    rev = (reverse) ? -1 : 1;
    return function (a, b) {
        a = a[key];
        b = b[key];
        if (typeof (type) != 'undefined') {
            a = type(a);
            b = type(b);
        }
        if (a < b) { return rev * -1; }
        if (a > b) { return rev * 1; }
        return 1;
    }
};
function NormalNumArrQuickSort(arr) {
	if (arr.length <= 1) return arr;
	var pivotIndex = Math.floor(arr.length / 2);
	var pivot = arr.splice(pivotIndex, 1)[0];
	var left = [];
	var right = [];
	for (var i = 0; i < arr.length; i++){
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return NormalNumArrQuickSort(left).concat([pivot], NormalNumArrQuickSort(right));
};
function JSONArrQuickSort(arr,key,rev){
	if(arr.length <= 1) return arr;
	var pivotIndex = Math.floor(arr.length / 2);
	var pivotObj = arr.splice(pivotIndex, 1)[0];
	var pivot = pivotObj[key];
	var left = [];
	var right = [];
	for (var i = 0; i < arr.length; i++){
		if(rev == false){
			if (arr[i][key] < pivot) {
				left.push(arr[i]);
			} else {
				right.push(arr[i]);
			}
		}else{
			if (arr[i][key] > pivot) {
				left.push(arr[i]);
			} else {
				right.push(arr[i]);
			}
		}
		
	}
	return JSONArrQuickSort(left,key,rev).concat([pivotObj], JSONArrQuickSort(right,key,rev));
}