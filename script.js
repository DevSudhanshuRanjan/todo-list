// what the below line does is that it will do all the functions only and only after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //what this line will do is that it will take all the data from the local storage in the form of a string and then parse it into its original form that is array. And if there is no data then it will return an empty array

  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") {
      alert("Enter the task before submitting.");
      return;
    }

    const newTask = {
      id: Date.now(), // This will help to add unique id for the task.
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasksToStorage();
    renderTask(newTask);
    todoInput.value = ""; //this will help to clear the input.
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
    ${task.text}
    <button>Delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasksToStorage();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // to stop the event bubbling up
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasksToStorage();
    });
    todoList.appendChild(li);
  }

  // saving the tasks to the local storage of the browser.
  // for this we are using function to do so.

  function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  /*
Points to be noticed from the following function is :
1. by writing `localStorage` we are invoking the functionality of the localStorage.
2. the setItem takes the data in key:value pair , where it's not necessary that the key should
have to be a string but it is neccesary to have the value to be string.
3. we are using the `JSON.stringify` to convert the array of tasks to the string.
4. also whenever a new task in added, the local storage is not updated, rather it's rewrite the
whole data
*/
});
