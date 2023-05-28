$(document).ready(function () {
  $(".empty").css("opacity", "0");
  $(".error").css("opacity", "0");
  $(".success").css("opacity", "0");
  $(".match").css("opacity", "0");

  $(".field").mousedown(function () {
    $(this).css("border", "none").css("box-shadow", "none");
  });

  $("#login").click(function () {
    var username = $("input[name=username]").val();
    var password = $("input[name=password]").val();
    var email = $("input[name=email]").val();
    var confirm = $("input[name=confirm]").val();
    var name = $("input[name=name]").val();
    var date = $("input[name=date]").val();

    var data = JSON.stringify({
      name: name,
      dateOfBirth: date,
      email: email,
      username: username,
      password: password,
    });

    var empty = 0;

    if ($(".field[name=username]").val() == "") {
      $(".field[name=username]")
        .css("border", "2px solid red")
        .css("box-shadow", "0 0 3px red");
      empty = 1;
    } else {
      $(".field[name=username]")
        .css("border", "none")
        .css("box-shadow", "none");
    }
    if ($(".field[name=password]").val() == "") {
      $(".field[name=password]")
        .css("border", "2px solid red")
        .css("box-shadow", "0 0 3px red");
      empty = 1;
    } else {
      $(".field[name=password]")
        .css("border", "none")
        .css("box-shadow", "none");
    }
    if ($(".field[name=name]").val() == "") {
      $(".field[name=name]")
        .css("border", "2px solid red")
        .css("box-shadow", "0 0 3px red");
      empty = 1;
    } else {
      $(".field[name=name]").css("border", "none").css("box-shadow", "none");
    }
    if ($(".field[name=confirm]").val() == "") {
      $(".field[name=confirm]")
        .css("border", "2px solid red")
        .css("box-shadow", "0 0 3px red");
      empty = 1;
    } else {
      $(".field[name=confirm]").css("border", "none").css("box-shadow", "none");
    }
    if ($(".field[name=email]").val() == "") {
      $(".field[name=email]")
        .css("border", "2px solid red")
        .css("box-shadow", "0 0 3px red");
      empty = 1;
    } else {
      $(".field[name=email]").css("border", "none").css("box-shadow", "none");
    }
    if ($(".field[name=date]").val() == "") {
      $(".field[name=date]")
        .css("border", "2px solid red")
        .css("box-shadow", "0 0 3px red");
      empty = 1;
    } else {
      $(".field[name=date]").css("border", "none").css("box-shadow", "none");
    }

    if (empty == 1) {
      $(".empty").animate({ opacity: 1 }, 1000);
      $(".empty").animate({ opacity: 1 }, 5000);
      $(".empty").animate({ opacity: 0 }, 1000);
    } else {
      if (confirm != password) {
        $(".match").animate({ opacity: 1 }, 1000);
        $(".match").animate({ opacity: 1 }, 5000);
        $(".match").animate({ opacity: 0 }, 1000);

        $(".field[name=confirm]")
          .css("border", "2px solid red")
          .css("box-shadow", "0 0 3px red");

        $(".field[name=password]")
          .css("border", "2px solid red")
          .css("box-shadow", "0 0 3px red");
      } else {
        $.ajax({
          url: "http://localhost:8080/register",
          data: data,
          contentType: "application/json",
          type: "POST",
          dataType: "json",
          statusCode: {
            200: function () {
              $(".success").animate({ opacity: 1 }, 1000);
              $(".success").animate({ opacity: 1 }, 5000);
              $(".success").animate({ opacity: 0 }, 1000);
              $(".field").empty();
            },
            500: function () {
              if (empty == 0) {
                $(".error").animate({ opacity: 1 }, 1000);
                $(".error").animate({ opacity: 1 }, 5000);
                $(".error").animate({ opacity: 0 }, 1000);
                $(".field")
                  .css("border", "2px solid red")
                  .css("box-shadow", "0 0 3px red");
              }
            },
          },
        });
      }
    }
  });
});
