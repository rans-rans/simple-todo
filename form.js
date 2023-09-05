document.querySelector(".clear-all").addEventListener("click", clearAll);
document.querySelector(".add-btn").addEventListener("click", addItem);

function clearAll() {
  document.getElementById("todo-list").innerHTML = "";
  localStorage.clear();
}

function addItem(e) {
  let inputField = document.querySelector(".input-field");
  let todo =typeof(e)=='string'?e: inputField.value;
  if (todo == "") return;
  const exists = document.getElementById(todo);
  if (exists != null) return;
  let date = new Date();
  let endHr = date.getHours();
  let endMin = date.getMinutes();
  let todoList = document.getElementById("todo-list");
  const li = document.createElement("li");
  li.id = todo;
  const span = document.createElement("span");
  const todoText = document.createElement("p");
  todoText.textContent = todo;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", listenToCheck);
  const timeText = document.createElement("p");
  timeText.textContent = `${endHr}:${endMin}`;
  let delBtn = document.createElement("button");
  delBtn.textContent = "remove";
  delBtn.addEventListener("click", deleteItem);

  li.appendChild(span);
  li.appendChild(timeText);

  span.appendChild(checkbox);
  span.appendChild(todoText);
  span.appendChild(delBtn);

  todoList.appendChild(li);
  let savedData = [];
  todoList.childNodes.forEach((e) => {
    savedData.push(e.id);
  });
  console.log(savedData);
  localStorage.setItem("todos", JSON.stringify(savedData));
}

function getStoredData() {
  let storedData = JSON.parse(localStorage.getItem("todos")) || [];
  storedData.forEach((data)=>{
    addItem(data)
  })
}

function deleteItem(e) {
  const li = e.target.parentNode.parentNode.id;
  document.getElementById(li).remove();
}

function listenToCheck(e) {
  let isChecked = e.target.checked;
  let todo = e.target.parentNode.parentNode;
  console.log(todo);
  if (isChecked) {
    todo.style.textDecoration = "line-through";
  } else {
    todo.style.textDecoration = "none";
  }
}

getStoredData();
