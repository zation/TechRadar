var Connection = {};
Connection.save = function(db) {
  $.post('/points', {data: db});
};
Connection.get = function(callback) {
	$.get('/points', callback);
};