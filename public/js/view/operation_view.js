View.Operation = {};

View.Operation.Export = (function() {
  function Export() {
    this.el = $('#export');
  }

  Export.prototype = {};

  return Export;
})();

View.Operation.AddPoint = (function() {
  function AddPoint() {
    this.el = $('#add-point');
    this.initialize();
  }

  AddPoint.prototype = {
    initialize: function() {
      this.el.on('mousedown', function(event) {
        event.preventDefault();

        var point = new Presenter.Point();
        point.set_name(points.get_new_point_name(point.get_name()));

        points.add(point);

        dragging.set_current_point(point);
        dragging.set_coordinate(event);
      });
    }
  };

  return AddPoint;
})();

View.Operation.SidebarSwitcher = (function() {
  function SidebarSwitcher() {
    this.el = $('#sidebar-switcher');
    this.initialize();
  }

  SidebarSwitcher.prototype = {
    initialize: function() {
      var sidebar_switcher = this.el;
      sidebar_switcher.on('click', function() {
        sidebar.el.animate({
          right: sidebar.el.css('right') == '0px' ? -sidebar.el.width() : 0
        }, 1000, function() {
          var is_sidebar_hidden = sidebar.el.css('right') === '0px';
          if (is_sidebar_hidden) {
            sidebar_switcher.text('>>');
          } else {
            sidebar_switcher.text('<<');
          }
        });
      });
    }
  };

  return SidebarSwitcher;
})();

View.Operation.Login = (function() {
  function Login() {
    this.el = $('#do-login');
    this.initialize();
  }

  function validate_input(team_name, password) {
    var result = "";
    if (team_name === "") {
      result = "Please input the team name to login.";
    }
    if (password === "") {
      result = "Please input the password to login.";
    }
    return result;
  }

  Login.prototype = {
    initialize: function() {
      this.el.on('click', function(event) {
        event.preventDefault();

        var team_name = $('#login-teamname').val();
        var password = $('#login-password').val();
        var validate_result = validate_input(team_name, password);
        if (validate_result !== "") {
          alert.error(validate_result);
          return;
        }

        var action_url = $('#login').attr('action');

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

View.Operation.Signup = (function() {
  function Signup() {
    this.el = $('#do-signup');
    this.initialize();
  }

  function validate_input(team_name, password) {
    var result = "";
    if (team_name === "") {
      result = "Please input the team name to sign up.";
    }
    if (password === "") {
      result = "Please input the password to sign up.";
    }
    return result;
  }

  Signup.prototype = {
    initialize: function() {
      this.el.on('click', function(event) {
        event.preventDefault();

        var team_name = $('#signup-teamname').val();
        var password = $('#signup-password').val();
        var validate_result = validate_input(team_name, password);
        if (validate_result !== "") {
          alert.error(validate_result);
          return;
        }

        var action_url = $('#signup').attr('action');

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
    }
  };

  return Signup;
})();
