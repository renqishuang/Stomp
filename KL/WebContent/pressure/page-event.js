$('button[name=page]').bind('click',function(){
	var page = $('table').getPageStore();
	var action = $(this).attr('action');
	switch(action){
		case 'next':
			page.action(20);
			break;
		case 'prev':
			page.action(0);
			break;
		case 'sort':
			page.sort();
			page.action(page.startIndex);
			break;
		case 'reverse':
			page.reverse();
			page.action(page.startIndex);
			break;
		case 'insert':
			var insertDt={a:39,b:1,c:1,d:1,id:39};
			page.insert(insertDt);
			break;
		case 'update':
			var i=30;
			setInterval(function(){
				if(i == 0) return;
				var updateDt={a:i,b:i+1,c:i+2,d:i+3,userId:28};
				var userId = updateDt.userId;
				var tr = $('table').find('tr[userId='+userId+']');
				page.update(updateDt);
				i--;
			},1000);
			break;
		default:
			break;
	}
});