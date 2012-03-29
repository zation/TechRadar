Presenter.Dialog = (function() {
  function Dialog() {
    this.el = $('#point-detail');
    this.point = undefined;
  }

  function get_buttons(dialog, point) {
    return [
      {
        text: 'Save',
        click: function() {
          point.save({
            description: dialog.get_text()
          });
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

  Dialog.prototype = {
    open: function(point) {
      var _this = this;
      _this.el.dialog({
        title: point.get_name(),
        modal: true,
        width: 'auto',
        open: function() {
          _this.set_text(point.get_description());
          _this.point = point;
        },
        buttons: get_buttons(_this, point)
      });
    },

    set_text: function(text) {
      this.el.find('#description').text(text);
    },

    get_text: function() {
      return this.el.find('#description').text();
    },

    close: function() {
      this.el.dialog('close');
      this.point = undefined;
    }
  };

  return Dialog;
})();