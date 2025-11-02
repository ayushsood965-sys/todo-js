const inputField = document.querySelector("#inputField");
const addTaskButton = document.querySelector("#addTaskButton");
const taskList = document.querySelector("#task-list");
const deleteButtons = document.querySelectorAll(".delete-btn");
let todos = [];

// code for creating a new todo and then saving it to the localStorage
function createTodo() {
  let todoNew = inputField.value;
  todos.push(todoNew);
  inputField.value = "";
  let li = document.createElement("LI");
  li.innerText = todoNew;
  li.innerHTML = `<span>${todoNew}</span> <button class="delete-btn">Delete</button>`;
  li.setAttribute("data-id", todos.length);
  taskList.appendChild(li);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Code for loading the todos from localStorage
function getTodos() {
  let storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
  return todos;
}

// Code for displaying the todos on the page
function displayTodos() {
  todos.forEach((todo) => {
    let li = document.createElement("LI");
    li.innerHTML = `<span>${todo}</span> <button class="delete-btn">Delete</button>`;
    li.setAttribute("data-id", todos.indexOf(todo));
    taskList.appendChild(li);
  });
}

getTodos();
displayTodos();
// code for creating a new todo and then saving it to the localStorage
addTaskButton.addEventListener("click", function () {
  createTodo();
});

inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    createTodo();
  }
});

// Code for deleting a todo
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    let li = event.target.parentElement;
    let todoText = li.querySelector("span").innerText;
    li.remove();
    getTodos();
    newtodos = todos.filter((todo) => todo !== todoText);
    localStorage.setItem("todos", JSON.stringify(newtodos));
  }
});
