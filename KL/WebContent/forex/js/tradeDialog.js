(function(){
	$.fn.extend({
		createTradeDialog:function(data){
			var me = $(this);
			function TradeDialog(){
				var options={
					baseCls:'_trade-nohandle-dialog-',
					width:630,
					height:170,
					spaceHeight:20,
					startTop:30
				};
				$.extend(this,options);
			}
			TradeDialog.prototype={
				generate:function(data){
					var dialog = this;
					if(!data || !data.ord) return;
					var dialogCls=this.baseCls+data.ord;
					var dialogHtmlFrag = "<div style='width:"+this.width+"px;height:"+this.height+"px' dialogDt='"+JSON.stringify(data)+"' class='"+dialogCls+"'>"+
						"<div name='header'>"+
							"<span name='countdown'>倒计时:</span>"+
							"<span name='time'></span>"+
							"<span name='aid'>交易账号: "+data.aid+"</span>"+
							"<span name='close'></span>"+
						"</div>"+
						"<div>"+
							"<table name='table-one' border='1' cellspacing='0'>"+
								"<tr>"+
									"<th>品种代码</th>"+
									"<th>卖出价</th>"+
									"<th>买入价</th>"+
									"<th>点差</th>"+
									"<th>最后更新</th>"+
								"</tr>"+
								"<tr>"+
									"<td>"+data.symbol+"</td>"+
									"<td>"+data.sell+"</td>"+
									"<td>"+data.buy+"</td>"+
									"<td>"+data.spread+"</td>"+
									"<td>"+data.dt+"</td>"+
								"</tr>"+
							"</table>"+
							"<table name='table-two' border='1' cellspacing='0'>"+
								"<tr>"+
									"<th>订单号</th>"+
									"<th>品种代码</th>"+
									"<th>类型</th>"+
									"<th>手数</th>"+
									"<th>委托价</th>"+
									"<th>委托时间</th>"+
									"<th>止盈</th>"+
									"<th>止损</th>"+
								"</tr>"+
								"<tr>"+
									"<td>"+data.ord+"</td>"+
									"<td>"+data.symbol+"</td>"+
									"<td>"+data.tp+"</td>"+
									"<td name='vol'>"+data.vol+"</td>"+
									"<td>"+data.opr+"</td>"+
									"<td>"+data.odt+"</td>"+
									"<td>"+data.limit+"</td>"+
									"<td>"+data.stop+"</td>"+
								"</tr>"+
							"</table>"+
						"</div>"+
						"<div name='control'>"+
							"<button name='confirm'>接受</button>"+
							"<button name='refuse'>拒绝</button>"+
						"</div>"+
					"</div>";
					var count = this.getDialogCount();
					//if(count === 1) return;
					var coord = this.calcPosition();
					$('body').append($(dialogHtmlFrag));
					this.addEvent(dialogCls,data);
					if(data.auto ===  0){
						var time = data.time;
						$('.'+dialogCls).find('span[name=time]').html(time);
						var countDownInter = setInterval(function(){
							if(time >= 0){
								$('.'+dialogCls).find('span[name=time]').html(time);
								time -=1;
							}else{
								console.log('结束倒计时');
								//$('.'+dialogCls).hide();
								dialog.destroyTradeDialog(data.ord);
								pendingRefuseSendMsg(data);
								clearInterval(countDownInter);
							}
						},1000);
					}else{
						$('.'+dialogCls).find('span[name=countdown]').hide();
					}
					$('.'+dialogCls).css('left',coord.left);
					$('.'+dialogCls).css('top',coord.top);
					$('.'+dialogCls).enableDrag({
						dragBaseCls:dialog.baseCls,
						dragCls:dialogCls
					});
				},
				addEvent:function(cls,data){
					var me = this;
					if($('.'+cls).length === 0) return;
					$('.'+cls).find('button[name=confirm]').bind('click',function(){
						console.log('confirm');
						me.destroyTradeDialog(data.ord);
					});
					$('.'+cls).find('button[name=refuse]').bind('click',function(){
						console.log('refuse');
						me.destroyTradeDialog(data.ord);
						pendingRefuseSendMsg(data);
					});
				},
				getDialogCount:function(){
					var count = $('div[class^='+this.baseCls+']').length;
					return count;
				},
				//根据弹出框的个数，计算弹出框的位置
				calcPosition:function(){
					var totalWidth = window.innerWidth,
						totalHeight = window.innerHeight;
					var count = this.getDialogCount();
					var left = Math.ceil(totalWidth - this.width)/2;
					//var top = Math.ceil((totalHeight - this.height * (count+1))/2);
					var top = this.startTop + (this.height+this.spaceHeight) * count;
					var coord={
						top:top,
						left:left
					};
					return coord;
				},
				destroyTradeDialog:function(ord){
					var dialogCls = this.baseCls+ord;
					var tradeDialog = $('.'+dialogCls);
					if(tradeDialog.length !== 0){
						tradeDialog.remove();
					}
				}
			}
			if(!me[0].tradeDialog){
				me[0].tradeDialog = new TradeDialog(data);
				me[0].tradeDialog.generate(data);
			}else{
				me[0].tradeDialog.generate(data);
			}
		}
	});
})();