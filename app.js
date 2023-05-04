// Define UI Vars

const form = document.querySelector('.create-task-form');
const filter = document.querySelector('.filter-input');
const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Edit task event
  taskList.addEventListener('click', editTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const taskText = document.createElement('span');
    // Add class
    taskText.className = 'delete-item secondary-content';
    // Add icon html
    taskText.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(taskText);

    const editTask = document.createElement('span');
    editTask.className = 'edit-item secondary-content';
    editTask.innerHTML = '<i class="fa fa-edit"></i>';
    li.appendChild(editTask);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if(taskInput.value.trim() === '') {
    e.preventDefault();
    return null;
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const taskText = document.createElement('span');
  // Add class
  taskText.className = 'delete-item secondary-content';
  // Add icon html
  taskText.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(taskText);

  const editTask = document.createElement('span');
  editTask.className = 'edit-item secondary-content';
  editTask.innerHTML = '<i class="fa fa-edit"></i>';
  li.appendChild(editTask);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

function changeTask(task) {
  
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Ви впевнені що хочете видалити це завдання?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Edit Task
function editTask(e) {
  if(e.target.parentElement.classList.contains('edit-item')) {
    const oldTaskContent = e.target.parentElement.parentElement.firstChild.textContent;
    let answer = prompt('Введіть нове значення');
    while(answer.trim() === '') {
      answer = prompt('Введено невалідне значення. Введіть нове значення');
    }
    if(answer !== null) {
      answer = answer.trim();
      e.target.parentElement.parentElement.firstChild.textContent = answer;
      editTaskInLocalStorage(oldTaskContent, answer);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Edit LS
function editTaskInLocalStorage(oldTaskContent, newTask) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(oldTaskContent === task){
      tasks.splice(index, 1, newTask);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().includes(text.toLowerCase())){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}