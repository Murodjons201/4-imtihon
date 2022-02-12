"use strict";

//ELEMENTLARNI CHAQIRIB OLISH:
const elResult = document.querySelector(".books-result");
const elLogout = document.querySelector(".logout");

//LOGOUT:
elLogout.addEventListener("click", function (evt) {
  evt.preventDefault();
  window.localStorage.removeItem("token");
  window.location.replace("login.html");
});
