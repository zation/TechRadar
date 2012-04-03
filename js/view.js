var is_dragging = false;
var points = new Collection.Points();
var point_dialog = new Presenter.Dialog.Point();
var export_dialog = new Presenter.Dialog.Export();
var z_index = 0;
var offset_x;
var offset_y;
var center_x;
var center_y;
var current_point;

function initialize_textarea() {
  $('#description, #export-db textarea').autoResize({
    maxHeight: 600,
    extraSpace: 20
  });
}

function initialize_actions() {
  $('#type').buttonset();
}

function initialize_points() {
  $('body').append(points.el);
  for (var point_name in _db) {
    if (_db.hasOwnProperty(point_name)) {
      var point_db = _db[point_name];
      var point = new Presenter.Point({
        name: point_name,
        coordinate: point_db.coordinate,
        type: point_db.type,
        scope: point_db.scope,
        quadrant: point_db.quadrant,
        description: point_db.description
      });
      points.add(point);
    }
  }
}

function setCoordinate(event) {
  center_x = $(window).width() / 2;
  center_y = $(window).height() / 2;
  offset_x = event.offsetX;
  offset_y = event.offsetY;
}

function getCoordinate(event) {
  return {
    y: event.clientY - center_y - offset_y,
    x: event.clientX - center_x - offset_x
  }
}

function add_point() {
  $('#add-point').on('mousedown', function(event) {
    event.preventDefault();

    var point = new Presenter.Point();
    points.add(point);

    current_point = point;
    setCoordinate(event);
  });
}

function export_points() {
  $('#export').on('click', function(event) {
    event.preventDefault();
    export_dialog.open(points.toJSON());
  });
}

function drag_point() {
  points.el.on('mousedown', 'li', function(event) {
    event.preventDefault();
    current_point = points.get(event.currentTarget);
    setCoordinate(event);
    z_index++;
  });

  $(document).on('mousemove', function(event) {
    if (current_point) {
      is_dragging = true;
      current_point.set_coordinate(getCoordinate(event), z_index);
    }
  });

  $(document).on('mouseup', function() {
    current_point = undefined;
  });
}

function view_point() {
  points.el.on('click', 'li', function(event) {
    if (!is_dragging) {
      var point = points.get(event.currentTarget);
      point_dialog.open(point);
    }
    is_dragging = false;
  });
}
