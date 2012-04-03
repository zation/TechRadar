Model.Point = (function() {
  function Point(options) {
    var defaults = {
      name: 'New Point',
      coordinate: {
        x: 0,
        y: 0
      },
      type: 'changed',
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
    }
  };

  return Point;
})();