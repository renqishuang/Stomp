function monitorCashData(){
	var url='ws://192.168.1.18:8080/fx.backend/ws';
	//var url='ws://mq1.zlw.com:61634';
	function success(){
		console.log('-open');
	}
	function fail(){
		console.log('-fail');
	}
	function message(msg){
		var data = msg.data;
		if(data){
			data = JSON.parse(data);
			var rowData = data.data,rowLen = rowData.length
				buytotal =data.buytotal,
				selltotal = data.selltotal,
				total = data.total;
			rowData = JSONArrQuickSort(rowData,'symbol',false);
			var cashTable = $('._pandect-cash-table'),
				cashTrs = cashTable.find('tr'),
				cashTrLen = cashTrs.length;
			if(cashTrLen == 2){
				for(var i=0;i<rowLen;i++){
					var dt = rowData[i];
					var htmlFrag = '<tr trDt="'+JSON.stringify(dt)+'"><td name="symbol">'+dt.symbol+'</td>'+
										'<td name="sell">'+dt.sell+'</td>'+
										'<td name="buy">'+dt.buy+'</td>'+
										'<td name="spread">'+dt.spread+'</td>'+
										'<td name="dt">'+dt.dt+'</td>'+
										'<td name="buyvol">'+dt.buyvol+'</td>'+
										'<td name="buyavgprice">'+dt.buyavgprice+'</td>'+
										'<td name="buyprofit">'+dt.buyprofit+'</td>'+
										'<td name="sellvol">'+dt.sellvol+'</td>'+
										'<td name="sellavgprice">'+dt.sellavgprice+'</td>'+
										'<td name="sellprofit">'+dt.sellprofit+'</td>'+
										'<td name="vol">'+dt.vol+'</td>'+
										'<td name="profit">'+dt.profit+'</td>'+
										'<td onclick="pandectCashDetail(this)" name="detail">详细</td>'+
									'</tr>';
					cashTable.append($(htmlFrag));
				}
				var cashFootFrag =  '<tr><td name="count" colspan="5">合计:</td>'+
										'<td colspan="2">多盈亏</td>'+
										'<td name="buytotal">3</td>'+
										'<td colspan="2">空盈亏</td>'+
										'<td name="selltotal">5</td>'+
										'<td>总盈亏</td>'+
										'<td name="total">7</td>'+
										'<td></td>'+
									'</tr>';
				cashTable.append($(cashFootFrag));
			}else{
				for(var i=2;i<cashTrLen-1;i++){
					var tr = cashTrs.eq(i);
					//tr.find('td:not(:last-child)').html('');
					var dt = rowData[i-2];
					tr.attr('trDt',JSON.stringify(dt));
					tr.find('td[name=symbol]').html(dt.symbol);
					tr.find('td[name=sell]').html(dt.sell);
					tr.find('td[name=buy]').html(dt.buy);
					tr.find('td[name=spread]').html(dt.spread);
					tr.find('td[name=dt]').html(dt.dt);
					tr.find('td[name=buyvol]').html(dt.buyvol);
					tr.find('td[name=buyavgprice]').html(dt.buyavgprice);
					tr.find('td[name=buyprofit]').html(dt.buyprofit);
					tr.find('td[name=sellvol]').html(dt.sellvol);
					tr.find('td[name=sellavgprice]').html(dt.sellavgprice);
					tr.find('td[name=sellprofit]').html(dt.sellprofit);
					tr.find('td[name=vol]').html(dt.vol);
					tr.find('td[name=profit]').html(dt.profit);
				}
				cashTrs.find('td[name=buytotal]').html(buytotal);
				cashTrs.find('td[name=selltotal]').html(selltotal);
				cashTrs.find('td[name=total]').html(total);
			}
			
		}
		//console.log(msg);
		console.log('-message');
	}
	function close(event){
		console.log('-close');
	}
	WSClient.connect(url,success,fail,message,close);
}