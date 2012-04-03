Presenter.Dialog = {};

Presenter.Dialog.Export = (function() {
  function Export() {
    this.el = $('#export-db');
  }

  Export.prototype = {
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

Presenter.Dialog.Point = (function() {
  function Point() {
    this.el = $('#point-detail');
    this.point = undefined;
  }

  function get_buttons(dialog, point) {
    return [
      {
        text: 'Save',
        click: function() {
          point.set_description(dialog.get_text());
          point.set_type(dialog.get_type());
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

  Point.prototype = {
    open: function(point) {
      var point_dialog = this;
      point_dialog.el.dialog({
        title: point.get_name(),
        modal: true,
        width: 'auto',
        open: function() {
          point_dialog.set_text(point.get_description());
          point_dialog.point = point;
          point_dialog.el.find('#' + point.get_type()).attr('checked', 'checked');
          $('#type').buttonset('refresh');
          point_dialog.el.find('#description').focus();
        },
        buttons: get_buttons(point_dialog, point)
      });
    },

    set_text: function(text) {
      this.el.find('#description').val(text);
    },

    get_text: function() {
      return this.el.find('#description').val();
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