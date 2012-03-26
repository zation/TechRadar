var is_dragging = false;

function initialize_points() {
  for (var point_name in _db) {
    if (_db.hasOwnProperty(point_name)) {
      var point = _db[point_name];
      var point_element = $('<li class="' + point.type + '">' + point_name + '</li>');

      point_element.data('scope', point.scope);
      point_element.data('quadrant', point.quadrant);
      point_element.data('description', point.description);

      point_element.css({
        'margin-left': -point.coordinate_x,
        'margin-top': -point.coordinate_y
      });
      $('#points').append(point_element);
    }
  }
}

var z_index = 0;
var offset_x;
var offset_y;
var center_x;
var center_y;
var current_dragged_point;

function setPosition(event) {
  center_x = $(window).width() / 2;
  center_y = $(window).height() / 2;
  offset_x = event.offsetX;
  offset_y = event.offsetY;
}

function getPosition(event) {
  return {
    top: event.clientY - center_y - offset_y,
    left: event.clientX - center_x - offset_x
  }
}

function add_point() {
  $('#add-point').on('mousedown', function(event) {
    var new_point = $('<li class="changed">New Point</li>');
    event.preventDefault();
    $('#points').append(new_point);

    current_dragged_point = new_point;
    setPosition(event);

    new_point.css({
      'margin-left': getPosition(event).left,
      'margin-top': getPosition(event).top
    });
  });
}

function drag_point() {
  $('#points').on('mousedown', 'li', function(event) {
    event.preventDefault();
    current_dragged_point = $(event.currentTarget);
    setPosition(event);
    z_index++;
  });

  $(document).on('mousemove', function(event) {
    if (current_dragged_point) {
      var left = event.clientX - center_x - offset_x;
      var top = event.clientY - center_y - offset_y;
      is_dragging = true;
      current_dragged_point.css({
        'margin-left': getPosition(event).left,
        'margin-top': getPosition(event).top,
        'z-index': z_index
      });
    }
  });

  $(document).on('mouseup', function() {
    current_dragged_point = undefined;
  });
}

function view_point() {
  $('#points').on('click', 'li', function(event) {
    if (!is_dragging) {
      var point_element = $(event.currentTarget);
      $('#point-detail p').text(point_element.data('description'));
      $('#point-detail').dialog({
        title: point_element.text(),
        modal: true
      });
      $('.ui-widget-overlay').on('click', function() {
        $('#point-detail').dialog('close');
      });
    }
    is_dragging = false;
  });
}
