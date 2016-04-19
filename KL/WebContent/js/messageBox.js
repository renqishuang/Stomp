//创建提示框
(function(){
	function MessageBox(){
		this.messageCls = 'message_box_wrap';
	};
	MessageBox.prototype = {
		init:function(){
			var me = this;
			var cls = me.messageCls
			var htmlFrag = '<div class="'+cls+'">'+
								'<div class="message_box_title">系统提示</div>'+
								'<div class="message_box_close"></div>'+
								'<div class="message_box_content"></div>'+
								'<div class="message_box_footer"><div class="message_box_confirm"></div></div>'+
							'</div>';
			$('body').append($(htmlFrag));
			me.mbox = $('.'+cls);
			me.mbox.hide();
			me.mbox.find('.message_box_close').bind('click',function(){
				me.close();
			});
			me.mbox.find('.message_box_confirm').bind('click',function(){
				me.confirm();
			});
		},
		show:function(){
			//获取客户端页面的宽度
			this.mbox.show();
			var bodyWidth = $('body').width(),boxWidth = this.mbox.width(),
				boxHeight = this.mbox.height();
			this.mbox.css('left',(bodyWidth-boxWidth)/2);
			var screenHeight = screen.availHeight;
			this.mbox.css('top',(screenHeight-boxHeight)/2);
		},
		hide:function(){
			this.mbox.hide();
		},
		setTittle:function(title){
			this.mbox.find('.message_box_title').html(title);
		},
		setContent:function(content){
			this.mbox.find('.message_box_content').html(content);
		},
		confirm:function(){
			this.mbox.hide();
		},
		close:function(){
			this.mbox.hide();
		}
	}
	MesBoxInstance = new MessageBox();
	MesBoxInstance.init();
})();