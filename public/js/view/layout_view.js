View.Layout = {};

View.Layout.Content = (function() {
  function Content() {
    this.el = $('.content');
    this.initialize();
  }

  Content.prototype = {
    initialize: function() {
      var content = this;
      content.resize_width();
      $(window).on('resize', function() {
        content.resize_width();
      });
    },

    resize_width: function() {
      var calculate_width = $(window).width() - sidebar.el.width() - Number(sidebar.el.css('right').replace('px', ''));
      if (calculate_width > this.el.height())
        this.el.width(calculate_width);
    }
  };

  return Content;
})();

View.Layout.Sidebar = (function() {
  function Sidebar() {
    this.el = $('.sidebar');
  }

  Sidebar.prototype = {
    initialize: function() {
    }
  };

  return Sidebar;
})();