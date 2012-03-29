Model.Quadrant = (function() {
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


