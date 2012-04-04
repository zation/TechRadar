var Connection = (function() {
  function Connection() {
  }

  Connection.prototype = {
    save: function(db) {
      console.log(db)
      $.post('/points', {data: db}, function(data) {
        console.log(data);
      });
    }
  };

  return Connection;
})();