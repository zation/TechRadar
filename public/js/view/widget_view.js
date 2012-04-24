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
			alert.el.find('p').text(message);
			alert.el.slideDown(function() {
				setTimeout(function() {
					alert.el.slideUp();
				}, 2000);
			});
		}
	};

	return Alert;
})();