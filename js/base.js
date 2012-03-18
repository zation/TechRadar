$(document).ready(function() {
  function initialize_points() {
    for (var point_name in db) {
      if (db.hasOwnProperty(point_name)) {
        var point = db[point_name];
        var point_element = $('<li class="' + point.type + '">' + point_name + '</li>');
        point_element.css({
          'margin-left': -point.coordinate_x,
          'margin-top': -point.coordinate_y
        });
        $('#points').append(point_element);
      }
    }
  }

  function bind_events() {
    var center_x;
    var center_y;
    var current_dragged_point;
    var offset_x;
    var offset_y;
    var z_index;

    $('#points').on('mousedown', 'li', function(event) {
      current_dragged_point = $(event.currentTarget);
      center_x = $(window).width() / 2;
      center_y = $(window).height() / 2;
      offset_x = event.offsetX;
      offset_y = event.offsetY;
      z_index++;
    });

    $(document).on('mousemove', function(events) {
      if (current_dragged_point) {
        var left = events.clientX - center_x - offset_x;
        var top = events.clientY - center_y - offset_y;
        current_dragged_point.css({
          'margin-left': left,
          'margin-top': top,
          'z-index': z_index
        });
      }
    });

    $(document).on('mouseup', function() {
      current_dragged_point = undefined;
    });
  }

  initialize_points();
  bind_events();


});