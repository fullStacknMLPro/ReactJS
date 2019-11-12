//Defining UI Variables
const form=document.querySelector('#task-form');
const taskInput=document.querySelector("#task");
const filter=document.querySelector('#filter');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');


// Load all event listeners
loadEventListener();


// Define all event listeners
function loadEventListener(){
  // DOM Load event
  document.addEventListener('DOMContentLoaded',getTasks);
  // Add task event
  form.addEventListener('submit',addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear tasks event
  clearBtn.addEventListener('click',clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup',filterTasks);
}

// Getting tasks from local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // Creat li element
    const li=document.createElement('li');
    // Add class
    li.classname='collection-item';
    // Create text node and append it to li
    li.appendChild(document.createTextNode(task));
    // Create link element
    const link=document.createElement('a');
    // Add class
    link.className="delete-item secondary-content";
    // Add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    // Append it to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e){
  if(taskInput.value===""){
    alert("Add a task, you knucklehead");
  }
  //Create li element
  const li=document.createElement('li');
  // Add class
  li.className='collection-item';
  // Create text node and append it to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create link element
  const link=document.createElement('a');
  // Add class
  link.className='delete-item secondary-content';
  // Add icon html
  link.innerHTML='<i class="fa fa-remove"></i>';
  // Append it to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeInLocalStorage(taskInput.value);

  // Clear task input value
  taskInput.value="";
  e.preventDefault();
}
// Create Local Storage
function storeInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm("Are you sure about your decision?")){
      e.target.parentElement.parentElement.remove();

      // Removing from LS
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }  
  }
}


// Remove from LS
function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){
    if(taskItem.textContent===task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}


// Clear Tasks
function clearTasks(){
  if(confirm("You are deleting all items. Are you reall sure about that?")){
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
  }
  // Clearing from Local storage
  clearFromLocalStorage();
}

// Clear task
function clearFromLocalStorage(){
  localStorage.clear();
}

// Filter tasks
function filterTasks(e){
  const text=e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item=task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text)!=-1){
        task.style.display='block';
      }
      else{
        task.style.display='none';
      }
    }
  );
}