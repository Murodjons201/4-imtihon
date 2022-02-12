"use strict";

//ELEMENTLARNI CHAQIRIB OLISH:
const elFormLogin = document.querySelector(".login-form");
const elUsernameInput = document.querySelector(".login-form__email");
const elPasswordInput = document.querySelector(".login-form__password");
const elErrorLogin = document.querySelector(".loginError");

//FORMA SUBMITIGA QULOQ SOLISH:
elFormLogin.addEventListener("submit", function (evt) {
  evt.preventDefault();

  //INPUTDAN LOGIN VA PAROLLARNI OLISH:
  const usernameInputValue = elUsernameInput.value;
  const PasswordInputValue = elPasswordInput.value;

  //API DAN LOGIN QAYTARISH:
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: usernameInputValue,
      password: PasswordInputValue,
    }),
  })
    .then((res) => res.json())
    .then((dataLogin) => {
      if (dataLogin.token) {
        window.localStorage.setItem("token", dataLogin.token);
        window.location.replace("index.html");
      } else {
        elErrorLogin.textContent = "Login yoki Parolinggizni xato kirittingiz!";
      }
    });

  usernameInputValue = null;
  PasswordInputValue = null;
});
