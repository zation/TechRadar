Presenter.Point = (function() {
  var template = '<li></li>';

  function initialize_element(point) {
    return $(template)
      .text(point.name)
      .css({
        'margin-left': point.coordinate.x,
        'margin-top': point.coordinate.y
      })
      .addClass(point.type);
  }

  function Point(options) {
    this.point = new Model.Point(options);
    this.el = initialize_element(this.point);
  }

  Point.prototype = {
    set_coordinate: function(coordinate, z_index) {
      var css_options = {
        'margin-left': coordinate.x,
        'margin-top': coordinate.y
      };
      if (z_index) {
        css_options['z-index'] = z_index;
      }
      this.el.css(css_options);
      this.point.set_coordinate(coordinate);
    },

    set_description: function(descritpion) {
      this.point.set_description(descritpion);
    },

    set_type: function(type) {
      this.el.removeClass();
      this.el.addClass(type);
      this.point.set_type(type);
    },

    set_name: function(name) {
      this.el.text(name);
      this.point.set_name(name);
    },

    save: function(options) {
      for (var key in options) {
        if (options.hasOwnProperty(key))
          this.point[key] = options[key];
      }
    },

    remove: function() {
      this.el.remove();
    },

    get_name: function() {
      return this.point.name;
    },

    get_description: function() {
      return this.point.description;
    },

    get_type: function() {
      return this.point.type;
    },

    is_equal: function(target) {
      return this == target;
    }
  };

  return Point;
})();