(function(){
	"use strict";
	$.fn.extend({
		createPageStore:function(tableConfig){
			var me = this,options={
				uniqueMark:null,
				trDtIndex:null,
				trDtAttr:null,
				maxKeyValue:null,
				minKeyValue:null,
				sortType:null,
				sortkey:null,
				revMark:false,
				startIndex:null
			};
			function PageStore(tableConfig){
				$.extend(this,options,tableConfig);
				this.table = me;
			}
			PageStore.prototype={
				setSortType:function(type){
					this.sortType=type;
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
					if(!this.uniqueMark || !this.table || !this.sortKey ||
							!this.trDtAttr || !this.trDtIndex || 
							this.startIndex === null) return;
					var uniqueValue = dt[this.uniqueMark];
					var tr = this.table.find('tr['+this.uniqueMark+'='+uniqueValue+']');
					if(tr.length !== 0){
						var trDt = tr.attr(this.trDtAttr);
						if(trDt) trDt = JSON.parse(trDt);
						var trDtIndex = tr.attr(this.trDtIndex);
						if(dt[this.sortKey] == trDt[this.sortKey]){//key-value wheath change
							console.log('update: current tr no need sort');
							for(var key in dt){
								this.data[trDtIndex][key]=dt[key];
							}
							this.updateTr(dt);
						}else{
							console.log('update: current tr need sort');
							for(var key in dt){
								this.data[trDtIndex][key]=dt[key];
							}
							this.repeatSort();
							this.action(this.startIndex);
						}
					}else{
						console.log('update: no current tr need sort and update data');
						var len = this.data.length;
						for(var i=0;i<len;i++){
							var tempDt = this.data[i];
							if(tempDt[this.uniqueMark] == dt[this.uniqueMark]){
								this.data.splice(i,1,dt);
							}
						}
						this.repeatSort();
						this.action(this.startIndex);
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
		}
	});
})(jQuery);