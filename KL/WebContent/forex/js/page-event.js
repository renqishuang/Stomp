$('button[name=page]').bind('click',function(){
	var page = $('._userstate-trade-table').getPageTool();
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
			var i=300;
			setInterval(function(){
				if(i == 0) return;
				var updateDt={a:100+i,b:i+1,c:i+2,d:i+3,userId:5,e:'f'};
				page.update(updateDt);
				i--;
			},1000);
			/*var j=200;
			setInterval(function(){
				if(i == 0) return;
				var updateDt={a:100+j+1,b:100+j+2,c:100+j+3,d:100+j+4,userId:27,e:'g'};
				page.update(updateDt);
				j--;
			},100);*/
			break;
		case 'close':
			if(page.getSortKey() == 'b') return;
			page.setSortKey('b');
			page.repeatSort();
			page.action(page.startIndex);
			break;
		case 'open':
			if(page.getSortKey() == 'a') return;
			page.setSortKey('a');
			page.repeatSort();
			page.action(page.startIndex);
			break;
		case 'filter':
			page.setFilter('a','1');
			break;
		case 'clearFilter':
			page.clearFilter();
		default:
			break;
	}
});