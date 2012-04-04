View.Dragging = (function() {
  function validated_calculated_x(calculated_x) {
    var right_boundary = content.el.width() / 2 - _current_point.el.width();
    var left_boundary = -content.el.width() / 2;

    if (calculated_x > right_boundary) {
      calculated_x = right_boundary;
    }
    else if (calculated_x < left_boundary) {
      calculated_x = left_boundary
    }
    return calculated_x;
  }

  function validated_calculated_y(calculated_y) {
    var bottom_boundary = content.el.height() / 2 - _current_point.el.height();
    var top_boundary = -content.el.height() / 2;

    if (calculated_y > bottom_boundary) {
      calculated_y = bottom_boundary;
    }
    else if (calculated_y < top_boundary) {
      calculated_y = top_boundary;
    }
    return calculated_y;
  }

  var _z_index = 0;
  var _offset_x;
  var _offset_y;
  var _center_x;
  var _center_y;
  var _current_point;

  function Dragging() {
    this.is_dragging = false;
    this.initialize();
  }

  Dragging.prototype = {
    initialize: function() {
      var dragging = this;
      points.el.on('mousedown', 'li', function(event) {
        event.preventDefault();
        _current_point = points.get(event.currentTarget);
        dragging.set_coordinate(event);
      });

      $(document).on('mousemove', function(event) {
        if (_current_point) {
          dragging.is_dragging = true;
          _current_point.set_coordinate(dragging.get_coordinate(event), _z_index);
        }
      });

      $(document).on('mouseup', function() {
        _current_point = undefined;
        Connection.save(points.toJSON());
      });
    },

    set_current_point: function(point) {
      _current_point = point;
    },

    set_coordinate: function(event) {
      _z_index++;
      _center_x = content.el.width() / 2;
      _center_y = content.el.height() / 2;

      var current_offset = $(event.currentTarget).offset();
      _offset_x = event.clientX - current_offset.left;
      _offset_y = event.clientY - current_offset.top;
    },

    get_coordinate: function(event) {
      var calculated_x = event.clientX - _center_x - _offset_x;
      var calculated_y = event.clientY - _center_y - _offset_y;

      return {
        x: validated_calculated_x(calculated_x),
        y: validated_calculated_y(calculated_y)
      }
    }
  };

  return Dragging;
})();