define(function(){
    function City(container,data) {
        this.container = container;
        this.ele = this.container.find('.city');
        this.data = data;
        this.init();
    }
    City.prototype = {
        init:function() {
            this.createDom();
        },
        createDom:function() {
            var i,len = this.data.length;
            var optionsStr = "";
			if(this.data.length>0){
				for(i=0;i<len;i++){
					optionsStr += '<option class="items" value="'+this.data[i].adcode+'">'+this.data[i].name+'</option>';
				}
				if(!this.ele.length){
					var str = '<select class="city">'+optionsStr+'</select>';
					this.container.append(str);
					this.ele = this.container.find('.city');
					this.ele.change($.proxy(this.handleSelectChange,this));
				}else {
					this.ele.html(optionsStr);
				}
			}else{
				this.ele.remove();
			}
        },
        handleSelectChange: function(e) {
			var adcode = e.target.value;
            $(this).trigger("change",[adcode]);
        }
    };
    return City;
})
