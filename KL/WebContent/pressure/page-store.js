(function(){
	"use strict";
	$.fn.extend({
		createPageStore:function(tableConfig){
			var me = this,options={
				uniqueMark:null,
				maxKeyValue:null,
				minKeyValue:null,
				sortkey:null,
				revMark:false,
				startIndex:null,
				trDtIndex:'trDtIndex',
				trDtAttr:'trDt',
				sortType:parseInt,
			};
			function PageStore(tableConfig){
				$.extend(this,options,tableConfig);
				this.table = me;
			}
			PageStore.prototype={
				setSortType:function(type){
					this.sortType=type;
				},
				getSortKey:function(){
					return this.sortKey;
				},
				setSortKey:function(key){
					this.sortKey=key;
				},
				action:function(startIndex){
					if(this.setTableData && typeof this.setTableData == 'function'){
						this.startIndex = startIndex;
						this.setTableData();
					}
				},
				repeatSort:function(){
					if(this.revMark == false){
						this.sort();
					}else{
						this.reverse();
					}
				},
				sort:function(){
					if(!this.sortKey || !this.sortType) return;
					this.data=JSONArrQuickSort(this.data,this.sortKey,false);
					//this.data.sort(JSONSort(this.sortKey,false,this.sortType));
					this.revMark=false;
					if(this.data.length != 0){
						this.minKeyValue = this.data[0];
					}
				},
				reverse:function(){
					if(!this.sortKey || !this.sortType) return;
					//this.data.sort(JSONSort(this.sortKey,true,this.sortType));
					this.data=JSONArrQuickSort(this.data,this.sortKey,true);
					this.revMark=true;
					if(this.data.length != 0){
						this.maxKeyValue = this.data[0];
					}
				},
				insert:function(dt){
					if(!this.sortKey || this.startIndex === null) return;
					var keyValue = dt[this.sortKey];
					if(this.revMark == false){
						if(keyValue > this.maxKeyValue){
							this.data.push(dt);
						}else if(keyValue < this.minKeyValue){
							this.data.unshift(dt);
						}else{
							this.data.push(dt);
							this.sort();
						}
					}else{
						if(keyValue > this.maxKeyValue){
							this.data.unshift(dt);
						}else if(keyValue < this.minKeyValue){
							this.data.push(dt);
						}else{
							this.data.push(dt);
							this.reverse();
						}
					} 
					this.action(this.startIndex);
				},
				update:function(dt){
					var me = this;
					if(!this.uniqueMark || !this.table || !this.sortKey ||
							!this.trDtAttr || !this.trDtIndex || 
							this.startIndex === null) return;
					var uniqueValue = dt[this.uniqueMark];
					var tr = this.table.find('tr['+this.uniqueMark+'='+uniqueValue+']');
					if(tr.length !== 0){
						var trDt = tr.attr(this.trDtAttr);
						if(trDt) trDt = JSON.parse(trDt);
						var trDtIndex = Number(tr.attr(this.trDtIndex));
						if(dt[this.sortKey] == trDt[this.sortKey]){//key-value wheath change
							console.log('更新ID在当前页，更新K值没变，不需要排序');
							for(var key in dt){
								this.data[this.startIndex+trDtIndex][key]=dt[key];
							}
							this.updateTr(dt);
						}else{
							if(this.revMark == false){
								//需要比对更新行所在位置的前一行和后一行的Key值
								var beforeLineDt = null,afterLineDt = null;
								var isNeedSort = false;
								if(trDtIndex === this.startIndex && trDtIndex !== this.data.length - 1){//在第一行
									afterLineDt = this.data[trDtIndex+1];
								}else if(trDtIndex === this.data.length - 1 && trDtIndex !== this.startIndex){//在最后一行
									beforeLineDt = this.data[trDtIndex-1];
								}else if(trDtIndex === this.data.length - 1 && trDtIndex == this.startIndex){//在中间的行
									isNeedSort = false;
									beforeLineDt = null,afterLineDt = null;
								}else{
									beforeLineDt = this.data[trDtIndex-1];
									afterLineDt = this.data[trDtIndex+1];
								}
								
								if(beforeLineDt === null && afterLineDt !== null){//只比较后一行
									if(dt[this.sortKey] > afterLineDt[this.sortKey]){
										isNeedSort = true;
									}
								}else if(beforeLineDt !== null && afterLineDt === null){
									if(dt[this.sortKey] < beforeLineDt[this.sortKey]){
										isNeedSort = true;
									}
								}else if(beforeLineDt !== null && afterLineDt !== null){
									if(dt[this.sortKey] > afterLineDt[this.sortKey] ||
											dt[this.sortKey] < beforeLineDt[this.sortKey]){
										isNeedSort = true;
									}
								}
								if(isNeedSort === false){
									for(var key in dt){
										this.data[trDtIndex][key]=dt[key];
									}
									tr.attr(this.trDtAttr,JSON.stringify(dt));
									console.log('升序->更新ID在当前页，更新Key值没越界，不需要排序');
									this.updateTr(dt);
								}else{
									console.log('升序->更新ID在当前页，更新Key值越界，需要排序');
									for(var key in dt){
										this.data[trDtIndex][key]=dt[key];
									}
									tr.attr(this.trDtAttr,JSON.stringify(dt));
									this.repeatSort();
									//需要排序
									this.action(this.startIndex);
								}
							}else{
								var isNeedSort = false;
								//需要比对更新行所在位置的前一行和后一行的Key值
								var beforeLineDt = null,afterLineDt = null;
								var isNeedSort = false;
								if(trDtIndex === this.startIndex && trDtIndex !== this.data.length - 1){//在第一行
									afterLineDt = this.data[trDtIndex+1];
								}else if(trDtIndex === this.data.length - 1 && trDtIndex !== this.startIndex){//在最后一行
									beforeLineDt = this.data[trDtIndex-1];
								}else if(trDtIndex === this.data.length - 1 && trDtIndex == this.startIndex){//在中间的行
									isNeedSort = false;
									beforeLineDt = null,afterLineDt = null;
								}else{
									beforeLineDt = this.data[trDtIndex-1];
									afterLineDt = this.data[trDtIndex+1];
								}
								
								if(beforeLineDt === null && afterLineDt !== null){//只比较后一行
									if(dt[this.sortKey] < afterLineDt[this.sortKey]){
										isNeedSort = true;
									}
								}else if(beforeLineDt !== null && afterLineDt === null){
									if(dt[this.sortKey] > beforeLineDt[this.sortKey]){
										isNeedSort = true;
									}
								}else if(beforeLineDt !== null && afterLineDt !== null){
									if(dt[this.sortKey] < afterLineDt[this.sortKey] ||
											dt[this.sortKey] > beforeLineDt[this.sortKey]){
										isNeedSort = true;
									}
								}
								if(isNeedSort === false){
									for(var key in dt){
										this.data[trDtIndex][key]=dt[key];
									}
									tr.attr(this.trDtAttr,JSON.stringify(dt));
									console.log('降序->更新ID在当前页，更新Key值没越界，不需要排序');
									this.updateTr(dt);
								}else{
									console.log('降序->更新ID在当前页，更新Key值越界，需要排序');
									for(var key in dt){
										this.data[trDtIndex][key]=dt[key];
									}
									tr.attr(this.trDtAttr,JSON.stringify(dt));
									this.repeatSort();
									this.action(this.startIndex);
								}
							}
							
						}
					}else{
						console.log('update: no current tr not need sort,only to update data');
						var len = this.data.length;
						$.each(me.data,function(i,value){
							if(value[me.uniqueMark] == dt[me.uniqueMark]){
								me.data.splice(i,1,dt);
								return false;
							}
						});
						/*this.repeatSort();
						this.action(this.startIndex);*/
					}
				},
				updateTr:function(dt){
					if(this.updateTrData && typeof this.updateTrData == 'function'){
						//replace data
						this.updateTrData(dt);
					}
				},
				getData:function(){
					return this.data;
				},
				setData:function(data){
					this.data=data;
				}
			}
			var pageStore = new PageStore(tableConfig);
			me[0].pageStore = pageStore;
		},
		getPageStore:function(){
			if(this[0].pageStore){
				return this[0].pageStore;
			}{
				return null;
			}
		},
		destroyPageStore:function(){
			this[0].pageStore = null;
		}
	});
})(jQuery);