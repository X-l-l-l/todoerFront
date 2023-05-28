let usrid;
let usrname;
let idList = 0;
let idItem = 0;

function getLists(user) {
  const val = $.ajax({
    url: "http://localhost:8080/users/" + user,
    type: "GET",
    dataType: "json",
    success: function (response) {
      usrid = response.id;
      drawLists(response.todos);
    },
  });
  return val;
}

$(document).ready(async function () {
  var user = sessionStorage.getItem("user");
  usrname = user;
  getLists(user).then((resp) => {
    console.log(resp);
    $(".name").text("Welcome, " + resp.name);
    sessionStorage.setItem("id", resp.id);
    sessionStorage.setItem("name", resp.name);
  });

  console.log(sessionStorage.getItem("id"));
});

function drawLists(lists) {
  $("div").remove(".list");
  console.log(lists);
  lists.forEach((list) => {
    var items = '<div id="' + list.id + '" class="items">';
    list.items.forEach((item) => {
      console.log(item);
      if (idItem > list.id) {
        idItem = list.id;
      }
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
    items += "</div>";
    $(".lists").append(
      '<div class="list"><h1 class="list_title">' +
        list.title +
        "</h1><h3>" +
        list.description +
        "</h3>" +
        items +
        '<div class="iteminput"><input type="text" class="newitemname"><input onclick="addItem(event)" type="button" value="Add Item"><input onclick="clearItems()" type="button" value="Clear">' +
        '<input onclick="deleteList(event)" type="button" value="Delete"></input></div></div>'
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
    todo: {
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
        getLists(usrname);
      },
      500: function () {
        console.log("hoooo");
      },
    },
  });
}

async function createList() {
  var title = $("input[name=title]").val();
  var description = $("input[name=description]").val();

  console.log(usrid);

  var data = JSON.stringify({
    title: title,
    description: description,
    user: {
      id: usrid,
    },
  });

  console.log(data);

  $.ajax({
    url: "http://localhost:8080/todos",
    contentType: "application/json",
    dataType: "json",
    type: "POST",
    data: data,
    statusCode: {
      200: function () {
        console.log("heeey");
        getLists(usrname);
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
    url: "http://localhost:8080/todos/" + id,
    contentType: "application/json",
    dataType: "json",
    type: "DELETE",
  });
  event.target.parentNode.parentNode.style.display = "none";
}

function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}

function settings() {
  sessionStorage.setItem("id", usrid);
  window.location.href = "settings.html";
}

function groups() {
  sessionStorage.setItem("id", usrid);
  window.location.href = "groups.html";
}

function search() {
  // Declare variables
  let input = $(".search").val();
  var all = document.getElementsByClassName("list");

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
