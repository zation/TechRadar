View.Textarea = (function() {
  function Textarea() {
    this.el = $('#description, #export-db textarea');
    this.initialize();
  }

  Textarea.prototype = {
    initialize: function() {
      this.el.autoResize({
        maxHeight: 600,
        extraSpace: 20
      });
    }
  };

  return Textarea;
})();