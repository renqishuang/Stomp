(function(){
	$.fn.extend({
		createPageTool:function(tableConfig){
			var me = $(this);
			function PageTool(){
				var options={
						isFilter:false,
						filterStr:'',
						filterKey:'',
						filterData:[],
						uniqueMark:null,
						startKeyValue:null,
						endKeyValue:null,
						maxKeyValue:null,
						minKeyValue:null,
						sortkey:null,
						revMark:false,
						startIndex:null,
						endIndex:null,
						trDtIndex:'trDtIndex',
						trDtAttr:'trDt',
						sortType:parseInt,
						pageSize:null,
						currentPage:null,
						totalPage:null,
						hasPage:false,
						disablePageColor:'#BDB6B6',
						enablePageColor:'white',
						needPageTool:true
				};
				$.extend(this,options,tableConfig);
				this.table=me;
			}
			PageTool.prototype={
				firstPage:function(){
					
				},
				lastPage:function(){
					
				},
				prevPage:function(){
					if(this.currentPage === 1) return;
					this.action(this.startIndex-this.pageSize);
					this.setCurrentPage();
					this.calcPage();
				},
				nextPage:function(){
					if(this.currentPage === this.totalPage) return;
					this.action(this.startIndex+this.pageSize);
					this.setCurrentPage();
					this.calcPage();
				},
				setCurrentPage:function(){
					if(this.pageSzie === null || this.startIndex === null) return;
					this.currentPage = this.startIndex/this.pageSize+1;
				},
				setTotalPage:function(){
					if(this.pageSize === null) return;
					this.totalPage=Math.ceil(this.getTotalCount()/this.pageSize);
					this.totalPage = this.totalPage === 0 ? this.totalPage = 1 : this.totalPage;
				},
				getTotalCount:function(){
					if(this.isFilter === true){
						return this.filterData.length;
					}else{
						return this.data.length;
					}
				},
				append:function(){
					var pagetool = this;
					if(this.table.length == 0) return;
					if(this.hasPage === false){
						var tableCls = '_table-page-tool';
						var frag = "<div class='"+tableCls+"'>"+
										"共<span name='total-count'></span>条记录/共"+
										"<span name='total-page'></span>页，当前第"+
										"<span name='current-page'></span>页"+
										"<span name='prev'>上一页</span>"+
										"<span name='next'>下一页</span>"+
										"<select></select>"+
									"</div>";
						this.table.next().append($(frag));
						this.hasPage = true;
						this.startIndex=0;
						this.table.next().find('span[name=prev]').bind('click',function(){
							if($(this).attr('isDisabled') == 'true') return;
							pagetool.prevPage();
						});
						this.table.next().find('span[name=next]').bind('click',function(){
							if($(this).attr('isDisabled') == 'true') return;
							pagetool.nextPage();
						});
						this.table.next().find('select').bind('change',function(){
							if(Number($(this).val()) === pagetool.startIndex) return;
							pagetool.action(Number($(this).val())*pagetool.pageSize);
						});
					}
				},
				calcPage:function(){
					if(this.table.length == 0) return;
					var pageToolWrap = this.table.next();
					if(pageToolWrap.length == 0) return;
					if(this.pageSzie === null || this.startIndex === null) return;
					
					var totalCountWrap = pageToolWrap.find('span[name=total-count]');
					totalCountWrap.html(this.getTotalCount());
					
					var totalPageWrap = pageToolWrap.find('span[name=total-page]');
					this.setTotalPage();
					totalPageWrap.html(this.totalPage);
					
					var currentPageWrap = pageToolWrap.find('span[name=current-page]');
					this.setCurrentPage();
					currentPageWrap.html(this.currentPage);
					
					var pageSelect = this.table.next().find('select'),
						options=pageSelect.find('option');
					if(this.totalPage !== options.length){
						pageSelect.empty();
						for(var i=0;i<this.totalPage;i++){
							var pageNum = i+1;
							var optionFrag = "<option value="+i+">第"+pageNum+"页</option>";
							this.table.next().find('select').append($(optionFrag));
						}
					}else{
						pageSelect.val(this.currentPage-1);
					}
					
					if(this.totalPage <= 1){
						pageToolWrap.find('span[name=prev]').css('background-color',this.disablePageColor);
						pageToolWrap.find('span[name=prev]').attr('isDisabled','true');
						pageToolWrap.find('span[name=prev]').css('cursor','default');
						pageToolWrap.find('span[name=next]').css('background-color',this.disablePageColor);
						pageToolWrap.find('span[name=next]').css('cursor','default');
						pageToolWrap.find('span[name=next]').attr('isDisabled','true');
						console.log('总页数小于1');
						pageToolWrap.find('select').attr('disabled','true');
					}else{
						pageToolWrap.find('select').removeAttr('disabled');
						if(this.currentPage <= 1){
							pageToolWrap.find('span[name=prev]').css('background-color',this.disablePageColor);
							pageToolWrap.find('span[name=prev]').css('cursor','default');
							pageToolWrap.find('span[name=prev]').attr('isDisabled','true');
						}else{
							pageToolWrap.find('span[name=prev]').css('background-color',this.enablePageColor);
							pageToolWrap.find('span[name=prev]').css('cursor','pointer');
							pageToolWrap.find('span[name=prev]').attr('isDisabled','false');
						}
						if(this.currentPage >= this.totalPage){
							pageToolWrap.find('span[name=next]').css('background-color',this.disablePageColor);
							pageToolWrap.find('span[name=next]').css('cursor','default');
							pageToolWrap.find('span[name=next]').attr('isDisabled','true');
						}else{
							pageToolWrap.find('span[name=next]').css('background-color',this.enablePageColor);
							pageToolWrap.find('span[name=next]').css('cursor','pointer');
							pageToolWrap.find('span[name=next]').attr('isDisabled','false');
						}
					}
				},
				setSortType:function(type){
					this.sortType=type;
				},
				getSortKey:function(){
					return this.sortKey;
				},
				setSortKey:function(key){
					this.sortKey=key;
				},
				clearFilter:function(){
					this.isFilter = false;
					this.filterData=[];
					this.action(this.startIndex);
					this.calcPage();
				},
				setFilterData:function(){
					var me = this;
					me.filterData.length=0;
					if(this.isFilter === true && this.filterStr !== '' && 
							this.filterKey != ''){
						$.each(me.data,function(index,val){
							var regex = new RegExp(me.filterStr);
							var match = regex.test(val[me.filterKey]);
							if(match){
								me.filterData.push(val);
							}
						});
					}
				},
				setFilter:function(key,filterStr){
					var me = this;
					this.isFilter = true;
					this.filterStr=filterStr;
					this.filterKey = key;
					me.filterData.length=0;
					$.each(this.data,function(index,val){
						var regex = new RegExp(filterStr);
						var match = regex.test(val[key]);
						if(match){
							me.filterData.push(val);
						}
					});
					this.startIndex=0;
					this.action(this.startIndex);
				},
				action:function(startIndex){
					if(this.setTableData && typeof this.setTableData == 'function'){
						this.startIndex = startIndex;
						var endIndex = this.startIndex + this.pageSize - 1;
						if(this.isFilter === true){
							if(endIndex > this.filterData.length - 1){
								endIndex = this.filterData.length - 1;
							}
						}else{
							if(endIndex > this.data.length - 1){
								endIndex = this.data.length - 1;
							}
						}
						this.endIndex = endIndex;
						this.setTableData();
					}
					this.calcPage();
				},
				setKeyValueRange:function(){
					this.setFilterData();
					if(this.isFilter === true){
						if(this.revMark === false){
							this.startKeyValue = this.filterData[this.startIndex];
							this.endKeyValue = this.filterData[this.endIndex];
						}else{
							this.startKeyValue = this.filterData[this.endIndex];
							this.endKeyValue = this.filterData[this.startIndex];
						}
					}else{
						if(this.revMark === false){
							this.startKeyValue = this.data[this.startIndex];
							this.endKeyValue = this.data[this.endIndex];
						}else{
							this.startKeyValue = this.data[this.endIndex];
							this.endKeyValue = this.data[this.startIndex];
						}
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
					if(this.isFilter === true){
						this.filterData=JSONArrQuickSort(this.filterData,this.sortKey,false);
						if(this.filterData.length != 0){
							this.minKeyValue = this.filterData[0];
						}
					}else{
						this.data=JSONArrQuickSort(this.data,this.sortKey,false);
						if(this.data.length != 0){
							this.minKeyValue = this.data[0];
						}
					}
					this.revMark=false;
				},
				reverse:function(){
					if(!this.sortKey || !this.sortType) return;
					if(this.isFilter === true){
						this.filterData=JSONArrQuickSort(this.filterData,this.sortKey,true);
						if(this.filterData.length != 0){
							this.maxKeyValue = this.filterData[0];
						}
					}else{
						this.data=JSONArrQuickSort(this.data,this.sortKey,true);
						if(this.data.length != 0){
							this.maxKeyValue = this.data[0];
						}
					}
					this.revMark=true;
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
					//插入数据后，判断数据Key值是否在，当前页面Key值范围内
					this.setKeyValueRange();
					if(this.startKeyValue == null || this.endKeyValue == null) return;
					//判断插入数据的数据类型
					if(typeof dt[this.sortKey] === 'number'){
						if(dt[this.sortKey] < this.startKeyValue ||
								dt[this.sortKey] > this.endKeyValue){
							console.log('插入数据，不在当前页面范围内， 不需要重新加载页面');
						}else{
							console.log('插入数据，在当前页面范围内， 需要重新加载页面');
							this.action(this.startIndex);
						}
					}else if(dt[this.sortKey] === 'string'){
						if(dt[this.sortKey].charCodeAt(0) < this.startKeyValue.charCodeAt(0) ||
								dt[this.sortKey].charCodeAt(0) > this.endKeyValue.charCodeAt(0)){
							console.log('插入数据，不在当前页面范围内， 不需要重新加载页面');
						}else{
							console.log('插入数据，在当前页面范围内， 需要重新加载页面');
							this.action(this.startIndex);
						}
					}
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
								this.data[trDtIndex][key]=dt[key];
							}
							this.updateTr(dt);
						}else{
							if(this.revMark == false){
								//需要比对更新行所在位置的前一行和后一行的Key值
								var beforeLineDt = null,afterLineDt = null;
								var isNeedSort = false;
								if(trDtIndex === this.startIndex && trDtIndex !== this.data.length - 1){//在第一行
									afterLineDt = this.data[trDtIndex+1];
								}else if(trDtIndex === this.endIndex && trDtIndex !== this.startIndex){//在最后一行
									beforeLineDt = this.data[trDtIndex-1];
								}else if(trDtIndex === this.endIndex && trDtIndex == this.startIndex){
									isNeedSort = false;
									beforeLineDt = null,afterLineDt = null;
								}else{//在中间的行
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
								}else if(trDtIndex === this.endIndex && trDtIndex !== this.startIndex){//在最后一行
									beforeLineDt = this.data[trDtIndex-1];
								}else if(trDtIndex === this.endIndex && trDtIndex == this.startIndex){
									isNeedSort = false;
									beforeLineDt = null,afterLineDt = null;
								}else{
									//在中间的行
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
					if(this.isFilter === true){
						return this.filterData;
					}else{
						return this.data;
					}
				},
				setData:function(data){
					this.data=data;
				}
			};
			if(!me[0].pageTool){
				me[0].pageTool = new PageTool();
				if(tableConfig.needPageTool && 
						tableConfig.needPageTool === 'false'){
					me[0].pageTool.action(me[0].pageTool.startIndex);
					return me[0].pageTool;
				}else{
					me[0].pageTool.append();
					me[0].pageTool.calcPage();
					me[0].pageTool.action(me[0].pageTool.startIndex);
					return me[0].pageTool;
				}
			}
		},
		getPageTool:function(){
			if($(this)[0].pageTool) return $(this)[0].pageTool;
		}
	});
})();