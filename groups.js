let usrid;
let usrname;

function getLists(user) {
  const val = $.ajax({
    url: "http://localhost:8080/groups/get/" + sessionStorage.getItem("id"),
    type: "GET",
    dataType: "json",
    success: function (response) {
      drawLists(response);
    },
  });
  return val;
}

$(document).ready(async function () {
  var user = sessionStorage.getItem("user");
  usrname = user;
  getLists(user).then((resp) => {
    console.log(resp);
    $(".name").text("Welcome, " + sessionStorage.getItem("name"));
  })
  usrid = sessionStorage.getItem("id")
  console.log(sessionStorage.getItem("id"))
});

function drawLists(lists) {
  $("div").remove(".list")
  console.log(lists);
  lists.forEach((list) => {
    var items = '<div id="' + list.id + '" class="items">';
    list.items.forEach((item) => {
      console.log(item);
      var check = "";
      if (item.completed) {
        check = "checked";
      }
      items +=
        '<div class="itemline"><input id="' +
        item.id +
        '" onclick="onCheck(event)" class="item" type="checkbox"' +
        check +
        '><label for="item" class="str">' +
        item.text +
        "</label></div>";
    });
    var users = ""
    list.users.forEach((user) => {
      users += user.username + ', '
    })

    items += "</div>";
    $(".lists").append(
      '<div class="list"><h1 class="list_title">' +
        list.name +
        "</h1><h3>" +
        list.description +
        "</h3>" +
        items +
        '<div class="iteminput"><input type="text" class="newitemname"><input onclick="addItem(event)" type="button" value="Add Item"><input onclick="clearItems()" type="button" value="Clear">' +
        '<input onclick="deleteList(event)" type="button" value="Leave"></input></div>'+ '<h3>Members</h3>' + users.slice(0,-2) +
        '<div class="adduser"><input type="text" class="newusername"><input type="button" class="newuserbutton" onclick="addUser(event)" value="Add user"></div>'+ '</div>'
    );
  });
}

function onCheck(event) {
  var ch = event.target.checked;
  var id = event.target.id;

  $.ajax({
    url: "http://localhost:8080/items/" + id + "?completed=" + ch,
    contentType: "application/json",
    type: "PUT",
  });
}

function becomeInvisible() {
  $("#newlist").css("display", "none");
  $("#newlistform").css("display", "flex");
}

function becomeVisible() {
  $("#newlist").css("display", "flex");
  $("#newlistform").css("display", "none");
}

function addItem(event) {
  let n =
    event.target.parentNode.parentNode.querySelector(".newitemname").value;
  let id = event.target.parentNode.parentNode.querySelector(".items").id;
  console.log(id);

  var data = JSON.stringify({
    text: n,
    completed: false,
    group: {
      id: id,
    },
  });

  $.ajax({
    url: "http://localhost:8080/items",
    contentType: "application/json",
    dataType: "json",
    type: "POST",
    data: data,
    statusCode: {
      200: function () {
        console.log("heeey");
        getLists(usrname)
      },
      500: function () {
        console.log("hoooo");
      },
    },
  });
}

async function createList() {
  var name = $("input[name=title]").val();
  var description = $("input[name=description]").val();

  console.log(usrid);

  var data = JSON.stringify({
    name: name,
    description: description,
    users: [{
      id: sessionStorage.getItem("id"),
    }],
  });

  console.log(data);

  $.ajax({
    url: "http://localhost:8080/groups",
    contentType: "application/json",
    dataType: "json",
    type: "POST",
    data: data,
    statusCode: {
      200: function () {
        console.log("heeey");
        getLists(usrname)
      },
      500: function () {
        console.log("hoooo");
      },
    },
  });
  becomeVisible();
}

function clearItems() {
  $(".item:checkbox:checked").each(function () {
    console.log(this);
    $.ajax({
      url: "http://localhost:8080/items/" + this.id,
      contentType: "application/json",
      dataType: "json",
      type: "DELETE",
    });
    this.parentNode.style.display = "none";
  });
}

function deleteList(event) {
  let id = event.target.parentNode.parentNode.querySelector(".items").id;
  $.ajax({
    url: "http://localhost:8080/groups/removeuser/"+id+"?username="+sessionStorage.getItem("user"),
    contentType: "application/json",
    dataType: "json",
    type: "PUT",
  });
  event.target.parentNode.parentNode.style.display = "none";
}

function logout(){
  sessionStorage.clear()
  window.location.href = "login.html"
}

function settings(){
  sessionStorage.setItem("id", usrid)
  window.location.href = "settings.html"
}

function lists(){
  window.location.href = "home.html"
}

function search() {
  // Declare variables
  let input = $(".search").val();
  var all = document.getElementsByClassName("list")

  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < all.length; i++) {
    var text = all[i].querySelector("h1").innerHTML;
    if (text.toUpperCase().indexOf(input.toUpperCase()) > -1) {
      all[i].style.display = "";
    } else {
      all[i].style.display = "none";
    }
  }
}

function addUser(event){
  let uname = $(".newusername").val()
  let id = event.target.parentNode.parentNode.querySelector(".items").id;
  $.ajax({
    url: "http://localhost:8080/groups/adduser/"+id+"?username="+uname,
    contentType: "application/json",
    dataType: "json",
    type: "PUT",
    statusCode: {
      200: function () {
        console.log("heeey");
        getLists(usrname)
      },
      500: function () {
        console.log("hoooo");
      },
    },
  });
}


function getNotifications(){
  $.ajax({
    url: "http://localhost:8080/notifications/"+sessionStorage.getItem("id"),
    contentType: "application/json",
    dataType: "json",
    type: "GET",
    success: function(resp){
      console.log(resp);
      let fullNoty = ""
      resp.forEach((notyf) => {
        let noty = '<p>'+notyf.text+'</p>';
        fullNoty+=noty;
      })
      $(".notif p").remove();
      $(".notif").append(fullNoty);
      $(".notif").toggleClass("visible")
    }
  });

}


function getNotifications() {
  $.ajax({
    url: "http://localhost:8080/notifications/" + sessionStorage.getItem("id"),
    contentType: "application/json",
    dataType: "json",
    type: "GET",
    success: function (resp) {
      console.log(resp);
      let fullNoty = "";
      resp.forEach((notyf) => {
        let noty = '<p id="' + notyf.id + '">' + notyf.text + "</p>";
        fullNoty += noty;
      });
      $(".notif p").remove();
      $(".notif").append(fullNoty);
      $(".notif").toggleClass("visible");
    },
  });
}

function clearNotifications() {
  $(".notif p").each(function () {
    console.log(this);
    $.ajax({
      url: "http://localhost:8080/notifications/" + this.id,
      contentType: "application/json",
      dataType: "json",
      type: "DELETE",
    });
  }).then(getNotifications());
}
