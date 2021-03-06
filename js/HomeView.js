var HomeView = function(store) {
 
	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
        this.getCopInfo("08");
    };


	this.render = function() {
        this.el.html(HomeView.template());
        return this;
    };

	this.findByName = function() {
	    store.findByName($('.search-key').val(), function(employees) {
	        $('.employee-list').html(HomeView.liTemplate(employees));
	        if (self.iscroll) {
	            console.log('Refresh iScroll');
	            self.iscroll.refresh();
	        } else {
	            console.log('New iScroll');
	            self.iscroll = new IScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
	        }
	    });
	};

	this.getCopInfo = function(copId) {

		var request = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://34.213.184.98:8000/cops/info?userId=" + copId,
		  "method": "GET"
		};

		$.ajax(request).done(function (response) {
			if(request) {
				console.log(response.copDetails);
				$('.cop-stuff').html(HomeView.testJSONTemplate(response.copDetails));
			} else {
				console.log("could not fetch Cop Data");
				var defaultResponse = {copId: "00", displayName: "None Found", phone: "None Found"};
				$('.cop-stuff').html(HomeView.testJSONTemplate(defaultResponse));
			}
		  

		  


		});

	};

    this.initialize();
 
}



HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());
HomeView.testJSONTemplate = Handlebars.compile($("#test-json-response").html());