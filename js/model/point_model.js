Model.Point = (function() {
  function Point(options) {
    $.extend(true, this, options);
  }

  Point.prototype = {
    set_name: function(name) {
      this.name = name;
    },

    set_coordinate: function(coordinate) {
      this.coordinate = coordinate;
    },

    is_equal: function(point) {
      return this.name == point.name;
    },

    remove: function() {
      this.scope.remove_point(this);
      this.quadrant.remove_point(this);
    }
  };

  return Point;
})();