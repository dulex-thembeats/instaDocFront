const TaskForm = document.querySelector("#add-tasks");
TaskForm.addEventListener("submit", (e) => {
  const task = document.querySelector("#task").value;
  e.preventDefault();
  console.log(task);
  console.log(inMemoryToken);

  fetch("http://localhost:3000/tasks/", {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer ${inMemoryToken}",
    },
    body: JSON.stringify({
      Task: task,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
});

// const TaskForm = document.querySelector( "#add-tasks" );
// TaskForm.addEventListener( "submit", ( e ) => {
//     const task = document.querySelector( '#task' ).value;
//     e.preventDefault();
//     console.log( task );

//     // ------ This is what you have to add --------
//     const localstorage_user = JSON.parse(localStorage.getItem('user'))
//     const inMemoryToken = localstorage_user.token
//     // -------------------------------------------

//     console.log( inMemoryToken )
