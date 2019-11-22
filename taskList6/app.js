// Defining UI Variables
const form=document.querySelector("#task-form");
const taskInput=document.querySelector("#task");
const filter=document.querySelector("#filter");
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector(".clear-tasks");

// Load all event handlers
loadAllEventListeners();

// Defining all event listeners
function loadAllEventListeners(){
    // Add task event
    form.addEventListener('submit',addTask);
}

// Add task
function addTask(e){
    if(taskInput.value===""){
        alert("Please enter something as input value.")
    }

    // Create li element
    const li=document.createElement('li');
    // Add class
    li.className="collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create link element
    const link=document.createElement("a");
    // Add class
    link.className="delete-item secondary-content";
    // Create html icon
    link.innerHTML='<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);



    // Clear input value
    taskInput.value="";




    e.preventDefault();   

}
