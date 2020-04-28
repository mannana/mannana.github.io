requirejs.config({
	paths:{
		"jquery": "jquery-1.11.3.min",
		"data": "data",
		"Province": "province",
		"City": "city",
		"Area": "area"
	}
})
requirejs(["jquery","data","Province","City","Area"],function($,data,Province,City,Area){
	function CitySelect(container){
		this.container = typeof container == 'string' ? $($(container)[0]) : $(container[0]);
		this.init();
	}
	CitySelect.prototype = {
		init: function() {
			this.level1 = data.districts[0].districts;
			this.level2 = this.level1[0].districts;
			this.level3 =this.level2[0].districts;		
			this.province = new Province(this.container,this.level1);
			this.city = new City(this.container,this.level2);
			this.Area = new Area(this.container,this.level3);
			this.bindEvents();
		},
		bindEvents: function() {
			$(this.province).on("change",$.proxy(this.handleProvinceChange,this));
			$(this.city).on("change",$.proxy(this.handleCityChange,this));
		},
		handleProvinceChange: function(e,adcode) {
			var i,len=this.level1.length;
			for(i=0; i<len; i++){
				if(this.level1[i].adcode==adcode){
					this.level2 =this.level1[i].districts;
					this.city = new City(this.container,this.level2);
					this.level3 = this.level2.length?this.level2[0].districts:[];		
					this.Area = new Area(this.container,this.level3);				
					return;
				}
			}
		},
		handleCityChange: function(e,adcode) {
			var i,len=this.level2.length;
			for(i=0; i<len; i++){
				if(this.level2[i].adcode==adcode){
					this.level3 = this.level2[i].districts;
					this.Area = new Area(this.container,this.level3);
					return;
				}
			}
		}
	}
	new CitySelect($(".city-box"));
})
