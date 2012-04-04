View.Dialog = {};

View.Dialog.Export = (function() {
  function Export() {
    this.el = $('#export-db');
    this.initialize();
  }

  Export.prototype = {
    initialize: function() {
      var dialog = this;
      export_operation.el.on('click', function(event) {
        event.preventDefault();
        dialog.open(points.toJSON());
      });
    },

    open: function(db) {
      this.el.dialog({
        modal: true,
        width: 'auto',
        open: function() {
          $(this).find('textarea').val(db);
        }
      })
    }
  };

  return Export;
})();

View.Dialog.Point = (function() {
  function get_buttons(dialog, point) {
    return [
      {
        text: 'Save',
        click: function() {
          point.set_description(dialog.get_text());
          point.set_type(dialog.get_type());
          point.set_name(dialog.get_title());
          dialog.close();
        }
      },
      {
        text: 'Remove',
        click: function() {
          points.remove(point);
          dialog.close();
        }
      }
    ];
  }

  function Point() {
    this.el = $('#point-detail');
    this.point = undefined;
    $('#type').buttonset();
    this.initialize();
  }

  Point.prototype = {
    initialize: function() {
      var dialog = this;
      points.el.on('click', 'li', function(event) {
        if (!dragging.is_dragging) {
          var point = points.get(event.currentTarget);
          dialog.open(point);
        }
        dragging.is_dragging = false;
      });
    },

    open: function(point) {
      var dialog = this;
      dialog.el.dialog({
        title: point.get_name(),
        modal: true,
        width: 'auto',
        open: function() {
          dialog.set_title(point.get_name());
          dialog.set_text(point.get_description());
          dialog.point = point;
          dialog.el.find('#' + point.get_type()).attr('checked', 'checked');
          $('#type').buttonset('refresh');
          dialog.el.find('#description').focus();
        },
        buttons: get_buttons(dialog, point)
      });
    },

    set_title: function(title) {
      this.el.find('#title').val(title);
    },

    set_text: function(text) {
      this.el.find('#description').val(text);
    },

    get_text: function() {
      return this.el.find('#description').val();
    },

    get_title: function() {
      return this.el.find('#title').val();
    },

    get_type: function() {
      return this.el.find(':radio[name="type"]:checked').val();
    },

    close: function() {
      this.el.dialog('close');
      this.point = undefined;
    }
  };

  return Point;
})();