var Quadrant = (function() {
  function Quadrant(name) {
    this.name = name;
    this.points = [];
  }

  Quadrant.prototype = {
    add_point: function(point) {
      this.points.push(point);
    },

    remove_point: function(point) {
      for (var i = 0; i < this.points.length; i++) {
        if (this.points[i].is_equal(point)) {
          return this.points.splice(i, 1);
        }
      }
      return false;
    }
  };

  return Quadrant;
})();

var Scope = (function() {
  function Scope(name) {
    this.name = name;
    this.points = [];
  }

  Scope.prototype = {
    add_point: function(point) {
      this.points.push(point);
    },

    remove_point: function(point) {
      for (var i = 0; i < this.points.length; i++) {
        if (this.points[i].is_equal(point)) {
          return this.points.splice(i, 1);
        }
      }
      return false;
    }
  };

  return Scope;
})();

var Point = (function() {
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

