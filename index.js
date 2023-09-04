let addBtn = document.querySelector(".add-btn");
let inputField = document.querySelector(".input-field");
let clearAllBtn = document.querySelector(".clear-all");

let todoList = document.getElementById("todo-list");

var todos = [];

function displayList() {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => addItem(todo));
}

function addItem(item) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const dueDate = document.createElement("p");

  let date = new Date();
  let endHr=date.getHours()
  let endMin=date.getMinutes()
  console.log(date.toLocaleDateString)
  dueDate.textContent = `Tomorrow:${endHr}:${endMin}`;

  delBtn.textContent = "remove";
  delBtn.addEventListener("click", (e) => deleteItem(item));

  li.innerHTML = `<span id="${item}"><input type="checkbox"  onchanged=${listenToCheck}>${item}</span>`;
  li.addEventListener("change", listenToCheck);

  todoList.appendChild(li);
  todoList.appendChild(delBtn);
  todoList.appendChild(dueDate);

  var savedList = JSON.stringify(todos);
  localStorage.setItem("todos", savedList);
}

function listenToCheck(e) {
  let isChecked = e.target.checked;
  let todo = document.getElementById(e.target.parentNode.id);
  if (isChecked) {
    todo.style.textDecoration = "line-through";
  } else {
    todo.style.textDecoration = "none";
  }
  console.log(isChecked);
}

function deleteItem(id) {
  var index = todos.indexOf(id);
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoList.innerHTML = "";
  displayList();
}

function deleteAll() {
  todos = [];
  todoList.innerHTML = "";
  localStorage.clear();
}

//listerning to the enter key to add an item
inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addBtn.click();
  }
});

//clearing all
clearAllBtn.addEventListener("click", (e) => deleteAll());

//adding action to add button
addBtn.addEventListener("click", (e) => {
  let todo = inputField.value;
  if (todo == "") {
    alert("Empty TODO");
    return;
  }
  if (todos.includes(todo)) {
    alert("Already exist");
    return;
  }
  todos.push(todo);
  addItem(todo);
});

displayList();
