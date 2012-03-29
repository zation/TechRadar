Collection.Points = (function() {
  var template = '<ul id="points"></ul>';

  function Points() {
    this.list = [];
    this.el = $(template);
  }

  Points.prototype = {
    add: function(point_presenter) {
      this.list.push(point_presenter);
      this.el.append(point_presenter.el);
    },

    get: function(point_element) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].el.is(point_element)) return this.list[i];
      }
    },

    remove: function(point) {
      for (var i = 0; i < this.points.length; i++) {
        if (this.points[i].is_equal(point)) {
          return this.points.splice(i, 1);
        }
      }
      return false;
    }
  };

  return Points;
})();