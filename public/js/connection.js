var Connection = {};
Connection.save = function(db) {
	$.post(team_name + '/points', {
		data: db
	});
};
Connection.get = function(callback) {
	$.get(team_name + '/points', callback);
};
