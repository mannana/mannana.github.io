define(function(){
    function Area(container,data) {
        this.container = container;
        this.ele = this.container.find('.area');
        this.data = data;
        this.init()
    }
    Area.prototype = {
        init:function() {
            this.createDom();
        },
        createDom:function() {
            if(this.data.length>0){
                var i,len = this.data.length;
    			var optionsStr = "";
    			for(i=0;i<len;i++){
    				optionsStr += '<option class="items" value="'+this.data[i].adcode+'">'+this.data[i].name+'</option>';
    			}
                if(!this.ele.length){
                    var str = '<select class="area">'+optionsStr+'</select>';
                    this.container.append(str);
        			this.ele = this.container.find('.area');
                }else {
                    this.ele.html(optionsStr);
                }
            }else{
				this.ele.remove();
			}
        }
    }
    return Area;
})
