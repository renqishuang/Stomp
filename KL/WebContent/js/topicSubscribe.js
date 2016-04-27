//初始化添加所有合约的数据订阅(K线)
function addAllInstruKLSubscribe(){
	if(!KLWSClient) return;
	for(var iid in RoomInstrumentListInfo){
		var klDestination = "/topic/"+iid+"_"+CurrentKLInterval;//每个合约只订阅当前的周期
		if(RoomInstrumentListInfo[iid].klSubscribe){
			if(KLWebSocketCloseMark == false){
				//切换周期后，取消原来的订阅，开始新的订阅
				RoomInstrumentListInfo[iid].klSubscribe.unsubscribe();
				RoomInstrumentListInfo[iid].klSubscribe = null;
			}
		}
		RoomInstrumentListInfo[iid].klSubscribe = KLWSClient.subscribe(klDestination,function(message){
			KLWebSocketCloseMark = false;
			if(!LoadKLineDataFinish)return;
			//console.log('topic-kl------------------------');
			var tempData = JSON.parse(message.body),
				tempIid = tempData.iid,
				tempInterval = tempData.interval;
			//console.log('K线订阅的合约ID---'+tempIid+'---周期: '+tempInterval);
			if(tempIid == CurrentInstrumentID && tempInterval == CurrentKLInterval){
				//console.log('当前合约K线订阅价格->'+tempData.close);
				KLSubscribeHandler(tempData);//实时K线变化
			}else{
				var wrap = $('.KL_Instrument_Wrap'),
					li = wrap.find('li[value='+tempIid+']');
				if(li.length != 0){
					var price = tempData.close;
					li.find('span[name=instru_price]').html(price);
				}
			}
		});
	}
}
//添加K线数据订阅
function addInstruKLSubscribe(iid){
	if(iid == '') return;
	if(!KLWSClient) return;
	var klDestination = "/topic/"+iid+"_"+CurrentKLInterval;//每个合约只订阅当前的周期
	RoomInstrumentListInfo[iid].klSubscribe = KLWSClient.subscribe(klDestination,function(message){
		if(!LoadKLineDataFinish)return;
		//console.log('topic-kl------------------------');
		var tempData = JSON.parse(message.body),
			tempIid = tempData.iid,
			tempInterval = tempData.interval;
		//console.log('K线订阅的合约ID---'+tempIid+'---周期: '+tempInterval);
		if(tempIid == CurrentInstrumentID && tempInterval == CurrentKLInterval ){
			//console.log('当前合约K线订阅价格->'+tempData.close);
			KLSubscribeHandler(tempData);//实时K线变化
		}else{
			var wrap = $('.KL_Instrument_Wrap'),
				li = wrap.find('li[value='+tempIid+']');
			if(li.length != 0){
				var price = tempData.close;
				li.find('span[name=instru_price]').html(price);
			}
		}
	});
}
//取消K线数据订阅
function cancelInstruKLSubscribe(iid){
	if(iid == '') return;
	if(!KLWSClient) return;
	if(RoomInstrumentListInfo[iid].klSubscribe){
		RoomInstrumentListInfo[iid].klSubscribe.unsubscribe();
		RoomInstrumentListInfo[iid].klSubscribe=null;
	}
}


//添加盘口数据订阅
function addInstruTapeSubscribe(iid){
	if(iid == '') return;
	if(!KLWSClient) return;
	var tapeDestination = '/topic/'+iid+'_TAPE';
	RoomInstrumentListInfo[iid].tapeSubscribe = KLWSClient.subscribe(tapeDestination,function(message){
		//console.log("盘口数据");
		//console.log('topic-tape------------------------');
		var tempData = JSON.parse(message.body);
		//console.log('盘口订阅的合约ID---'+tempData.instrumentid);
		if(tempData.instrumentid == CurrentInstrumentID){
			TapeOneViewerHandler(tempData);
			TapeTwoViewerHandler(tempData);
			TapeThreeViewerHandler(tempData);
		}
	});
}

//取消盘口数据订阅
function cancelInstruTapeSubscribe(iid){
	if(iid == '') return;
	if(!KLWSClient) return;
	if(RoomInstrumentListInfo[iid].tapeSubscribe){
		RoomInstrumentListInfo[iid].tapeSubscribe.unsubscribe();
		RoomInstrumentListInfo[iid].tapeSubscribe = null;
	}
}