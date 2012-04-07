var Connection = {};
Connection.save = function(db) {
  $.post('/points', {data: db});
}