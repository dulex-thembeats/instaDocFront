const form = document.getElementById("sign-in-form");
const email = document.getElementById("login-email");
const password = document.getElementById("login-pass");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const mail = email.value;
  const pass = password.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: mail,
    password: pass,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("localhost:3000/admin/login", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  // fetch(url)
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     if (data.error) {
  //       message1.textContent = data.error;
  //     } else {
  //       message1.textContent = data.forecast;
  //       message2.textContent = data.location;
  //     }
  //   });
});
