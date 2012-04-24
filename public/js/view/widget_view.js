View.Widget = {};

View.Widget.Alert = (function() {
	function Alert() {
		this.el = $('#alert');
		this.initialize();
	}

	Alert.prototype = {
		initialize: function() {
			this.el.hide();
		},

		error: function(message) {
			var alert = this;
			var slide;
			alert.el.find('p').text(message);
			alert.el.slideDown(function() {
				slide = setTimeout(function() {
					alert.el.slideUp();
				}, 2000);
			});
		}
	};

	return Alert;
})();
