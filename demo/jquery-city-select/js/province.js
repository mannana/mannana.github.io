define(function(){
	function Province(container,data){
		this.container = container;
		this.data = data;
		this.init();
	}
	Province.prototype = {
		init: function() {
			this.createDom();
		},
		createDom: function() {
			var i,len = this.data.length;
			var optionsStr = "";
			for(i=0;i<len;i++){
				optionsStr += '<option class="items" value="'+this.data[i].adcode+'">'+this.data[i].name+'</option>';
			}
			var str = '<select class="province">'+optionsStr+'</select>';
            this.container.html(str);
			this.ele = this.container.find('.province');
			this.ele.change($.proxy(this.handleSelectChange,this));
		},
		handleSelectChange: function(e) {
			var adcode = e.target.value;
			$(this).trigger("change",[adcode]);
		}
	}
	return Province;
})
