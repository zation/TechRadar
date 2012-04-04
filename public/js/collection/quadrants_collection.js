Collection.Quadrants = (function() {
  function Quadrants() {
    this.list = [];
  }

  Quadrants.prototype = {
    add_quadrant: function(quadrant) {
      this.quadrant.push(quadrant);
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

  return Quadrants;
})();

