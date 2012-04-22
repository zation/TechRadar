Collection.Points = (function() {
  var template = '<ul id="points"></ul>';

  function Points() {
    this.list = [];
    this.el = $(template);
    this.initialize();
  }

  function initialize_from_db(data) {
    if (data !== "") {
      var _db = JSON.parse(data);
      for (var point_name in _db) {
        if (_db.hasOwnProperty(point_name)) {
          var point_db = _db[point_name];
          var point = new Presenter.Point({
            name: point_name,
            coordinate: point_db.coordinate,
            type: point_db.type,
            scope: point_db.scope,
            quadrant: point_db.quadrant,
            description: point_db.description
          });
          points.add(point);
        }
      }
    }
  }

  Points.prototype = {
    initialize: function() {
      var points = this;
      content.el.append(points.el);
      Connection.get(initialize_from_db);
    },

    get_new_point_name: function(name) {
      function generate_name() {
        return name + '(' + duplicated_number + ')';
      }

      if (!this.is_contain(name)) return name;
      var duplicated_number = 1;

      while (this.is_contain(generate_name(name))) {
        duplicated_number++;
      }
      return generate_name(name);
    },

    add: function(point_presenter) {
      this.list.push(point_presenter);
      this.el.append(point_presenter.el);
    },

    get: function(point_element) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].el.is(point_element)) return this.list[i];
      }
      return undefined;
    },

    is_contain: function(name) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].get_name() == name) return true;
      }
      return false;
    },

    toJSON: function() {
      var result_JSON = {};
      var point;
      for (var i = 0; i < this.list.length; i++) {
        point = this.list[i].point;
        result_JSON[point.name] = point;
      }
      return JSON.stringify(result_JSON);
    },

    remove: function(point) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].is_equal(point)) {
          point.remove();
          return this.list.splice(i, 1);
        }
      }
      return false;
    }
  };

  return Points;
})();
