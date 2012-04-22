Model.Point = (function() {
  function Point(options) {
    var defaults = {
      name: 'New Point',
      coordinate: {
        x: 0,
        y: 0
      },
      type: 'new',
      scope: 'none_scope',
      quadrant: 'none_quadrant',
      description: ''
    };

    $.extend(this, defaults, options);
  }

  Point.prototype = {
    set_name: function(name) {
      this.name = name;
    },

    set_coordinate: function(coordinate) {
      this.coordinate = coordinate;
    },

    set_description: function(description) {
      this.description = description;
    },

    set_type: function(type) {
      this.point.type = type;
    }
  };

  return Point;
})();