//文档结构加载完成之前,做一些事情
(function(){
	var trLen = 5;
	//快捷挂单行数添加
	var cPDFrage = '<tr>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
					'</tr>';
	var cPDTable = $('.TradeInfoPendingDepute');
	if(cPDTable.length != 0){
		for(var i=0;i<trLen;i++){
			cPDTable.append($(cPDFrage));
		}
	}
	//快捷持仓行数添加
	var cMPTable = $('.TradeInfo_MP');
	if(cMPTable.length != 0){
		for(var i=0;i<trLen;i++){
			cMPTable.append($(cPDFrage));
		}
	}
	var pdFrag = '<tr>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
				'</tr>';
	//当日委托
	var pdTableWrap = $('.Order_Manager_TB_Delegation');
	if(pdTableWrap.length != 0){
		pdTable = pdTableWrap.find('table');
		for(var i=0;i<trLen;i++){
			pdTable.append($(pdFrag));
		}
	}
	var bargainFrag = '<tr>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
						'<td></td>'+
					'</tr>';
	//当日成交
	var bargainTBWrap = $('.Order_Manager_TB_Bargain');
	if(bargainTBWrap.length != 0){
		var bargainTB = bargainTBWrap.find('table');
		for(var i=0;i<trLen;i++){
			bargainTB.append($(bargainFrag));
		}
	}
	var pmFrag = '<tr>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
						'</tr>';
	//持仓信息
	var pmTBWrap = $('.Order_Manager_TB_Position');
	if(pmTBWrap.length != 0){
		var pmTB = pmTBWrap.find('table');
		for(var i=0;i<trLen;i++){
			pmTB.append($(pmFrag));
		}
	}
	var conditionFrag = '<tr>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
							'<td></td>'+
						'</tr>';
	//条件单
	var conditionTBWrap = $('.Order_Manager_TB_Condition');
	if(conditionTBWrap.length != 0){
		var conditionTB = conditionTBWrap.find('table');
		for(var i=0;i<trLen;i++){
			conditionTB.append($(conditionFrag));
		}
	}
	//合约选择区域添加事件
	var klInstruWrap = $('.KL_Instrument_Wrap');
	if(klInstruWrap.length != 0){
		var liList = klInstruWrap.find('li'),liLen = liList.length;
		for(var i=0;i<liLen;i++){
			var li = liList.eq(i);
			li.bind('click',function(){
				KLAddInstruMouseDown($(this)[0]);
			});
			li.bind('mouseover',function(){
				KLAddInstruMouseOver($(this)[0]);
			});
			li.bind('mouseout',function(){
				KLAddInstruMouseOut($(this)[0]);
			});
			//删除合约按钮
			var delWrap = li.find('span[name=instru_del]');
			delWrap.bind('click',function(){
				KLDeleteInstrument($(this)[0]);
			});
		}
	}
	//左侧分割线点击事件
	var mainViewLeftSplit = $('.KL_MainView_Left_Split');
	if(mainViewLeftSplit.length != 0){
		mainViewLeftSplit.bind('click',function(){
			mainViewLeftSplitClick($(this)[0]);
		});
		mainViewLeftSplit.bind('mouseover',function(){
			mainViewSplitMouseOver($(this)[0]);
		});
		mainViewLeftSplit.bind('mouseout',function(){
			mainViewSplitMouseOut($(this)[0]);
		});
	}
	//MA菜单事件
	var maOptionWrap = $('.KL_MA_Options_Wrap');
	if(maOptionWrap.length != 0){
		var options = maOptionWrap.find('div'),optionLen = options.length;
		for(var i=0;i<optionLen;i++){
			var option = options.eq(i);
			option.bind('click',function(){
				maOptionMouseClick($(this)[0],event);
			});
			option.bind('mouseover',function(){
				maOptionMouseOver($(this)[0]);
			});
			option.bind('mouseout',function(){
				maOptionMouseOut($(this)[0]);
			});
		}
	}
	//MA设置按钮
	var maSetBtn = $('.KL_Indicatrix_Set_Btn');
	if(maSetBtn.length != 0){
		maSetBtn.bind('click',function(){
			indicatrixSetMouseClick($(this));
		});
		maSetBtn.bind('mouseover',function(){
			indicatrixSetMouseOver($(this));
		});
		maSetBtn.bind('mouseout',function(){
			indicatrixSetMouseOut($(this));
		});
	}
	//连接状态
	var signalConWrap = $('.KL_Signals_Connect');
	if(signalConWrap.length != 0){
		signalConWrap.bind('mouseover',function(){
			signalsConnectMouseOver($(this)[0],event);
		});
		signalConWrap.bind('mouseout',function(){
			signalsConnectMouseOut($(this)[0],event);
		});
	}
	//打开图例
	var legendWrap = $('.KL_Legend_Wrap');
	if(legendWrap.length != 0){
		legendWrap.bind('mouseover',function(){
			legendMouseOver($(this)[0]);
		});
		legendWrap.bind('mouseout',function(){
			legendMouseOut($(this)[0]);
		});
	}
	//声音
	var soundWrap = $('.KL_Sound_Wrap');
	if(soundWrap.length != 0){
		soundWrap.bind('click',function(){
			soundMouseClick($(this)[0]);
		});
		soundWrap.bind('mouseover',function(){
			soundMouseOver($(this)[0]);
		});
		soundWrap.bind('mouseout',function(){
			soundMouseOut($(this)[0]);
		});
	}
	//交易线
	var tradeLineWrap = $('.KL_TradeLine_Wrap');
	if(tradeLineWrap.length != 0){
		tradeLineWrap.bind('click',function(){
			tradeLineMouseClick($(this)[0]);
		});
		tradeLineWrap.bind('mouseover',function(){
			tradeLineMouseOver($(this)[0]);
		});
		tradeLineWrap.bind('mouseout',function(){
			tradeLineMouseOut($(this)[0]);
		});
	}
	//全屏
	var fullScreenWrap = $('.KL_FullScreen_Wrap');
	if(fullScreenWrap.length != 0){
		fullScreenWrap.bind('click',function(){
			fullScreenMouseClick($(this)[0]);
		});
		fullScreenWrap.bind('mouseover',function(){
			fullScreenMouseOver($(this)[0]);
		});
		fullScreenWrap.bind('mouseout',function(){
			fullScreenMouseOut($(this)[0]);
		});
	}
	//选择合约
	var selectInstru = $('.Order_Instrument_Select');
	if(selectInstru.length != 0){
		selectInstru.bind('change',function(){
			orderInstrumentSwitch($(this)[0]);
		});
	}
	//下单器Wrap
	var orderManWap = $('.KL_OrderManager_SecondWrap');
	if(orderManWap.length != 0){
		//买卖
		var dirWraps = orderManWap.find('div[name=order_mana_dir]');
		for(var i=0;i<dirWraps.length;i++){
			var dirWrap = dirWraps.eq(i);
			var dirValue = dirWrap.attr('value');
			if(dirValue == '0'){//买
				dirWrap.bind('click',function(){
					OMBuySellOpenCloseMouseDown($(this)[0],'buy');
				});
				dirWrap.bind('mouseover',function(){
					OMBuySellOpenCloseMouseOver($(this)[0],'buy');
				});
				dirWrap.bind('mouseout',function(){
					OMBuySellOpenCloseMouseOut($(this)[0],'buy');
				});
			}else{//卖
				dirWrap.bind('click',function(){
					OMBuySellOpenCloseMouseDown($(this)[0],'sell');
				});
				dirWrap.bind('mouseover',function(){
					OMBuySellOpenCloseMouseOver($(this)[0],'sell');
				});
				dirWrap.bind('mouseout',function(){
					OMBuySellOpenCloseMouseOut($(this)[0],'sell');
				});
			}
		}
		//买卖
		var coWraps = orderManWap.find('div[name=order_mana_co]');
		for(var i=0;i<coWraps.length;i++){
			var coWrap = coWraps.eq(i);
			var coValue = coWrap.attr('value');
			if(coValue == '0'){
				coWrap.bind('click',function(){
					OMBuySellOpenCloseMouseDown($(this)[0],'open');
				});
				coWrap.bind('mouseover',function(){
					OMBuySellOpenCloseMouseOver($(this)[0],'open');
				});
				coWrap.bind('mouseout',function(){
					OMBuySellOpenCloseMouseOut($(this)[0],'open');
				});
			}else{
				coWrap.bind('click',function(){
					OMBuySellOpenCloseMouseDown($(this)[0],'close');
				});
				coWrap.bind('mouseover',function(){
					OMBuySellOpenCloseMouseOver($(this)[0],'close');
				});
				coWrap.bind('mouseout',function(){
					OMBuySellOpenCloseMouseOut($(this)[0],'close');
				});
			}
		}
		//价格类型
		var priceTypeWrap = $('.KL_OM_Price_Type_Wrap');
		if(priceTypeWrap.length != 0){
			priceTypeWrap.bind('click',function(){
				OMPriceTypeMouseDown($(this)[0]);
			});
		}
		//价格
		var priceWrap = $('.KL_OM_Price_Number');
		if(priceWrap.length != 0){
			var priceInput = priceWrap.find('input');
			priceInput.bind('focus',function(){
				OMPriceKeyFocus($(this)[0]);
			});
			priceInput.bind('keydown',function(){
				OMPriceKeyDown($(this)[0],event);
			});
			//加价
			var priceUp = priceWrap.find('div[name=price_up]');
			priceUp.bind('click',function(){
				OMPriceNumberUpClick($(this)[0]);
			});
			priceUp.bind('mouseover',function(){
				OMPriceNumberUpMouseOver($(this)[0]);
			});
			priceUp.bind('mouseout',function(){
				OMPriceNumberUpMouseOut($(this)[0]);
			});
			//减价
			var priceDown = priceWrap.find('div[name=price_down]');
			priceDown.bind('click',function(){
				OMPriceNumberDownClick($(this)[0]);
			});
			priceDown.bind('mouseover',function(){
				OMPriceNumberDownMouseOver($(this)[0]);
			});
			priceDown.bind('mouseout',function(){
				OMPriceNumberDownMouseOut($(this)[0]);
			});
		}
		//手数
		var volWrap = $('.KL_OM_Volume_Number');
		if(volWrap.length != 0){
			var volInput = volWrap.find('input');
			volInput.bind('keydown',function(){
				OMVolumeKeyPress($(this)[0],event);
			});
			//加手数
			var upVolWrap = volWrap.find('div[name=vol_up]');
			if(upVolWrap.length != 0){
				upVolWrap.bind('click',function(){
					OMVolumeUpClick($(this)[0]);
				});
				upVolWrap.bind('mouseover',function(){
					OMVolumeUpMouseOver($(this)[0]);
				});
				upVolWrap.bind('mouseout',function(){
					OMVolumeUpMouseOut($(this)[0]);
				});
			}
			//减手数
			var downVolWrap = volWrap.find('div[name=vol_down]');
			if(downVolWrap.length != 0){
				downVolWrap.bind('click',function(){
					OMVolumeDownClick($(this)[0]);
				});
				downVolWrap.bind('mouseover',function(){
					OMVolumeDownMouseOver($(this)[0]);
				});
				downVolWrap.bind('mouseout',function(){
					OMVolumeDownMouseOut($(this)[0]);
				});
			}
		}
		//设置
		var orderSetWrap = $('.KL_OM_Set_Wrap');
		if(orderSetWrap.length != 0){
			var btn = orderSetWrap.find('div');
			btn.bind('click',function(){
				OMSetClick($(this)[0]);
			});
			btn.bind('mouseover',function(){
				OMSetMouseOver($(this)[0]);
			});
			btn.bind('mouseout',function(){
				OMSetMouseOut($(this)[0]);
			});
		}
		var orderWrap = $('.KL_OM_Order_Wrap');
		if(orderWrap.length != 0){
			//条件单
			var conOrderWrap = orderWrap.find('div[name=condition_order]');
			conOrderWrap.bind('click',function(){
				OMConditionMouseDown($(this));
			});
			conOrderWrap.bind('mouseover',function(){
				OMConditionMouseOver($(this));
			});
			conOrderWrap.bind('mouseout',function(){
				OMConditionMouseOut($(this));
			});
			//下单
			var exOrderWrap = orderWrap.find('div[name=order]');
			exOrderWrap.bind('click',function(){
				OMOrderMouseDown($(this)[0]);
			});
			exOrderWrap.bind('mouseover',function(){
				OMOrderMouseOver($(this)[0]);
			});
			exOrderWrap.bind('mouseout',function(){
				OMOrderMouseOut($(this)[0]);
			});
		}
	}
	//右侧分割线
	var mainViewRightSplit = $('.KL_MainView_Right_Split');
	if(mainViewRightSplit.length != 0){
		mainViewRightSplit.bind('click',function(){
			mainViewRightSplitClick($(this)[0]);
		});
		mainViewRightSplit.bind('mouseover',function(){
			mainViewSplitMouseOver($(this)[0]);
		});
		mainViewRightSplit.bind('mouseout',function(){
			mainViewSplitMouseOut($(this)[0]);
		});
	}
	//盘口第三块区域
	var tapeThreeWrap = $('.Tape_Sub_Viewer_Three');
	if(tapeThreeWrap.length != 0){
		var htmlFrag = '<div></div>'+
						'<div></div>'+
						'<div></div>'+
						'<div></div>'+
						'<div></div>'+
						'<div></div>';
		var liList = tapeThreeWrap.find('li'),liLen = liList.length;
		for(var i=0;i<liLen;i++){
			var li = liList.eq(i);
			li.append(htmlFrag);
		}
	}
})();