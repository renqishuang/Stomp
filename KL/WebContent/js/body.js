$('body').bind('click',function(){
	//MA菜单是否展示
	var maOptionWrap = $('.KL_MA_Options_Wrap');
	if(maOptionWrap.length != 0){
		if(!maOptionWrap.is(':hidden')){
			maOptionWrap.hide();
			var select = $('.KL_MA_Select');
			if(select.length !== 0){
				$(select).css('color','rgb(132, 148, 164)');
				$(select).css('background-color','#191F26');
				$(select).css('border','1px solid rgb(132, 148, 164)');
				$('.KL_MA_Select_Indicate').css('background-image','url('+CurrentImagePath+'/indicatrixComboxBtn_normal.png)');
			}
		}
	}
});