(function(){
	/**
	 * 分页工具
	 * 用于只请求单页数据
	 */
	$.fn.extend({
		getPageTool:function(tableConfig){
			var me = $(this);
			function PageTool(tableConfig){
				var options={
					startIndex:null,
					endIndex:null,
					trDtIndex:'trDtIndex',
					trDtAttr:'trDt',
					pageSize:null,
					currentPage:null,
					data:null,
					dataCount:0,
					totalPage:null,
					hasPage:false,//是否已经有了分页
					disablePageColor:'#BDB6B6',
					enablePageColor:'white',
					uniqueMark:null,//每行数据的唯一标识
					useWSData:null,//true:使用WebSocket获取数据,false:使用WebService获取数据
					isFilter:false,
					filterStr:'',
					filterKey:'',
					filterData:[]
				};
				$.extend(this,options,tableConfig);
				this.table=me;
			}
			PageTool.prototype={
				getPageSize:function(){
					return this.pageSize;
				},
				setSort:function(sort){
					this.sort=sort;
				},
				getSort:function(){
					return this.sort;
				},
				removeTr:function(){
					if(this.table.length === 0)return;
					this.table.find('tr:not(":first-child")').remove();
				},
				sendMsg:function(){
					if(typeof this.sendWSMsg === 'function'){
						this.sendWSMsg();
					}
				},
				prevPage:function(){
					if(this.currentPage === 1) return;
					this.startIndex = this.startIndex-this.pageSize;
					this.setCurrentPage();
					this.calcPage();
					if(this.useWSData === true){
						this.sendMsg();
					}else{
						this.action();
						
					}
				},
				nextPage:function(){
					if(this.currentPage === this.totalPage) return;
					this.startIndex = this.startIndex+this.pageSize;
					this.setCurrentPage();
					this.calcPage();
					if(this.useWSData === true){
						this.sendMsg();
					}else{
						this.action();
						
					}
				},
				setCurrentPage:function(){
					if(this.pageSize === null || this.startIndex === null) return;
					this.currentPage = this.startIndex/this.pageSize+1;
				},
				setTotalPage:function(){
					if(this.pageSize === null) return;
					this.totalPage=Math.ceil(this.getTotalCount()/this.pageSize);
					this.totalPage = this.totalPage === 0 ? this.totalPage = 1 : this.totalPage;
				},
				setTotalCount:function(dataCount){
					this.dataCount = dataCount;
				},
				getTotalCount:function(){
					if(this.useWSData === true){
						return this.dataCount;
					}else{
						return this.data.length;
					}
				},
				append:function(){
					var pagetool = this;
					if(this.table.length == 0) return;
					if(this.hasPage === false){
						var tableCls = '_table-page-tool';
						var frag = "<div onselectstart='return false;' class='"+tableCls+"'>"+
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
							pagetool.startIndex=Number($(this).val())*pagetool.pageSize;
							pagetool.calcPage();
							if(this.useWSData === true){
								pagetool.sendMsg();
							}else{
								pagetool.action();
							}
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
						//console.log('总页数小于1');
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
				clearFilter:function(){
					this.isFilter=0;
				},
				setFilter:function(key,filterStr){
					this.isFilter=1;
					this.filterKey=key;
					this.filterValue=filterStr;
				},
				action:function(){
					if(this.setTableData && typeof this.setTableData == 'function'){
						//this.startIndex = startIndex;
						this.setTableData();
					}
					//this.calcPage();
				},
				getData:function(){
					return this.data;
				},
				setData:function(data){
					this.data=data;
				},
				hide:function(){
					if(!this.table) return;
					var pageToolWrap = this.table.next();
					pageToolWrap.hide();
				},
				show:function(){
					if(!this.table) return;
					var pageToolWrap = this.table.next();
					pageToolWrap.show();
				}
			};
			if(!me[0].pageTool){
				me[0].pageTool = new PageTool(tableConfig);
				me[0].pageTool.generateTr();
				me[0].pageTool.append();
				me[0].pageTool.calcPage();
				return me[0].pageTool;
			}else{
				return me[0].pageTool;
			}
		}
	});
})();