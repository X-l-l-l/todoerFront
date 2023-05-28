$(document).ready(function () {
  $(".empty").css("opacity", "0");
  $(".error").css("opacity", "0");

  $(".field").mousedown(function () {
    $(this).css("border", "none").css("box-shadow", "none");
  });

  $("#login").click(function () {
    var username = $("input[name=username]").val();
    var password = $("input[name=password]").val();
    var data = JSON.stringify({
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

    if (empty == 1) {
      $(".empty").animate({ opacity: 1 }, 1000);
      $(".empty").animate({ opacity: 1 }, 5000);
      $(".empty").animate({ opacity: 0 }, 1000);
    }

    $.ajax({
      url: "http://localhost:8080/login",
      data: data,
      contentType: "application/json",
      type: "POST",
      dataType: "json",
      statusCode: {
        200: function () {
          sessionStorage.setItem("user", username);
          $(".login").submit();
        },
        401: function () {
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
  });
});
