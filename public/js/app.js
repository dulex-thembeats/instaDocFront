const url = "https://dulex-instadoc.herokuapp.com/doctors/all";
const message1 = document.querySelector("#message1");

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    if (data.error) {
      message1.textContent = data.error;
    } else {
      var txt = "";

      for (let i in data.data) {
        console.log(data.data[i].firstname + " " + data.data[i].lastname);
        txt +=
          data.data[i].firstname +
          " " +
          data.data[i].lastname +
          " " +
          data.data[i].specialization +
          " " +
          "<a href='/delete'>DELETE</a>" +
          " " +
          "<br>";
      }
      message1.innerHTML = txt;
      //   var source = $("#src").html();
      //   var template = Handlebars.compile(source);
      //   $("body").append(template({ objects: data }));
      //   //   message1.textContent = data;
      console.log(data);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
