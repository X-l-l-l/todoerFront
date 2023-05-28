function update() {
  var name = $('.field[name="name"]').val();
  var date = $('.field[name="date"]').val();
  var email = $('.field[name="email"]').val();
  var password = $('.field[name="password"]').val();

  console.log(name, date, email, password);

  var url = "http://localhost:8080/users/" + sessionStorage.getItem("id")+"?"

  if (name){
    url+='name='+name+"&"
  }
  if (date){
    url+='date='+date+"&"
  }
  if (email) {
    url+='email='+email+"&"
  }
  if (password) {
    url+='password='+password+"&"
  }
  url=url.slice(0, -1);
  console.log(url)

  $.ajax({
    url: url,
    type: "PUT",
    statusCode: {
      200: function () {
        window.location.href = "home.html";
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
