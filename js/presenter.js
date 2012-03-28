var Point_Presenter = (function() {
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

  function Point_Presenter(options) {
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
    var settings = $.extend({}, defaults, options);;

    this.point = new Point(settings);
    this.el = initialize_element(this.point);
  }

  Point_Presenter.prototype = {
    set_coordinate: function(coordinate, z_index) {
      var css_options = {
        'margin-left': coordinate.x,
        'margin-top': coordinate.y
      };
      if (z_index) {
        css_options['z_index'] = z_index;
      }
      this.el.css(css_options);
      this.point.set_coordinate(coordinate);
    },

    get_name: function() {
      return this.point.name;
    },

    get_description: function() {
      return this.point.description;
    },

    set_name: function(name) {
      this.el.text(name);
      this.point.set_name(name);
    }
  };

  return Point_Presenter;
})();

var Dialog = (function(){
  function Dialog() {
    this.el = $('#point-detail');
  }

  Dialog.prototype = {
    open: function(point) {
      this.el.dialog({
        title: point.get_name(),
        modal: true
      });
    },

    set_text: function(text) {
      this.el.text(text);
    },

    close: function() {
      this.el.dialog('close');
    }
  }

  return Dialog;
})();