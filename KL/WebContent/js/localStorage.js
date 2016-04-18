function getMAInitDT(){
	if(window.localStorage){
		window.CurrentKLMAArr = ['MA1','MA2','MA3'];
		var MAArr = localStorage.getItem('MAArr');
		console.log('local storage MAArr------>'+MAArr);
		if(MAArr){
			window.CurrentKLMAArr = MAArr.split(',');
		}else{
			localStorage.setItem('MAArr',CurrentKLMAArr);
		}
		var MAObj = localStorage.getItem('MAObj');
		console.log('local storage MAObj------>'+MAObj);
		if(MAObj){
			window.CurrentKLMAArr = JSON.parse(MAObj);
		}else{
			localStorage.setItem('MAObj',JSON.stringify(CurrentKLMAArr));
		}
	}
}