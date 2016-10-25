(function(){
	"use strict";
	var app = {

		init:function(){
			// let's go
			this.listeners();
		},
		listeners:function(){
			$("#markdown").on("click",this.getmarkdown.bind(this));
			$("#json").on("click",this.getJSON.bind(this));

		},

		getmarkdown:function(){
			$.ajax("http://192.168.1.40:1337/alice.md")
			.done(this.ajaxDone)
			.fail(this.ajaxFail)
			.always(this.ajaxAlways);

		},
		ajaxDone:function(response){
			console.log(response)

			
			var	converter = new showdown.Converter();
			var html =converter.makeHtml(response);
			$("#md").html(html);

		},
		ajaxFail: function(response) {
			console.log("fail !");
		},

		ajaxAlways : function(response) {
			console.log("complete");
		},	



		getJSON:function(){
			$.ajax("http://192.168.1.40:1337/menu.json")
			.done(this.jsonDone)
			.fail(this.	jsonFail)
			.always(this.jsonAlways);
		},
		jsonDone:function(json){
			console.log(json);
			var menus=json.menu;
			var lien= "http://192.168.1.40:1337/menu.json";
			for(var i=0;i<menus.length ;i++){
				$("#rec").append("<li>"+"<a href= >"+lien+menus[i].title+menus[i].path+"</li>");
			}
			


		},
		jsonFail:function(){
			console.log('fail');
		},
		jsonAlways:function(){
			console.log('complete');
		}

	};


	$(document).ready(function(){
		app.init();
	});
})();