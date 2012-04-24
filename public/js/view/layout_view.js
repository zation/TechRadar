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
      content.el.dblclick(function(event) {
        var point = new Presenter.Point();
        point.set_name(points.get_new_point_name(point.get_name()));

        points.add(point);

        point.set_coordinate(dragging.get_coordinate_when_dblclick(event));
        Connection.save(points.toJSON());
      });
    },

    resize_width: function() {
      var calculate_width = $(window).width();
      if (calculate_width > this.el.height()) this.el.width(calculate_width);
    }
  };

  return Content;
})();

View.Layout.Sidebar = (function() {
  function Sidebar() {
    this.el = $('.sidebar');
  }

  Sidebar.prototype = {
    initialize: function() {}
  };

  return Sidebar;
})();

View.Layout.Login = (function() {
  function Login() {
    this.el = $('.login');
    this.initialize();
  }

  Login.prototype = {
    initialize: function() {
      $('.content').width($(window).width());

      $('#do-signup').on('click', function(event) {
        event.preventDefault();
        var action_url = $('#signup').attr('action');
        var team_name = $('#signup-teamname').val();
        var password = $('#signup-password').val();
        var post_data = {
          'team_name': team_name,
          'password': password
        };

        $.post(action_url, post_data, function(result) {
          if (result == 'succeed') {
            location.href = '/' + team_name;
          }
          else {
            alert.error(result);
          }
        });
      });

      $('#do-login').on('click', function(event) {
        event.preventDefault();
        var action_url = $('#login').attr('action');
        var team_name = $('#login-teamname').val();
        var password = $('#login-password').val();
        var post_data = {
          'team_name': team_name,
          'password': password
        };

        $.post(action_url, post_data, function(result) {
          if (result == 'succeed') {
            location.href = '/' + team_name;
          } else {
            alert.error(result);
          }
        });
      });
    }
  };

  return Login;
})();
