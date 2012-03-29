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
    }
  };

  return Point;
})();