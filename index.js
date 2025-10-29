


let taskList = [];
let taskName;
let taskStatus;
let taskDueDate;
let taskCategory;
let addTaskButton = document.getElementById("addTaskButton");
let categoryFilterButton = document.getElementById("categoryFilterButton");
let statusFilterButton = document.getElementById("statusFilterButton");
let nextId = 1; // Initialize a counter outside the function/loop where objects are created
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // getMonth() is 0-indexed
const year = today.getFullYear();
const todayformattedDate = `${month}/${day}/${year}`; 


function addTask(task){
    console.log(task);
    if(task.taskName.trim() === ""){
        alert("Cannot add an empty item to Task Managament App!");   
        clearInputFeilds();
        return;
    }if(taskList.includes(task.taskName.toLowerCase() ||task.taskName.toUpperCase() || task.taskName )){
        alert(`${task.taskName} is already on the list`);
        clearInputFeilds();
    } else if(!task.taskDueDate && !task.taskStatus){
        task.taskDueDate =  todayformattedDate;
        task.taskStatus = "Over Due";
        taskList.push(task);  
        renderTasks();
        clearInputFeilds();
    }else if(!task.taskCategory){
      task.taskCategory = "Work";
      taskList.push(task);  
      renderTasks();
      clearInputFeilds();

    }else if(!task.taskStatus){
        task.taskStatus = "In Progress";
        taskList.push(task);
        renderTasks();
        clearInputFeilds();
    }
    else {
        taskList.push(task);  
        renderTasks();
        alert(`${task.taskName} has been added to the list.`);
       event.preventDefault();
       clearInputFeilds();
 }
               
};

function clearInputFeilds(){
    document.getElementById("TaskNameInput").value = "";
    document.querySelector("input[name='status']:checked").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("categoryDropdown").value = "";
}


function renderTasks(){
    const taskTableBody = document.querySelector("tbody");
    taskTableBody.innerHTML =""; //clear existing rows
    taskList.forEach(task => {
    const row = document.createElement('tr');

    // Task ID Cell
    const idCell = document.createElement("td");
    idCell.textContent = task.id;
    row.appendChild(idCell);

   
    // Task Name Cell
       const nameCell = document.createElement("td");
       nameCell.textContent = task.taskName;
       row.appendChild(nameCell);

      // Task Category Cell 
       const categoryCell = document.createElement("td");
       categoryCell.textContent = task.taskCategory;
       row.appendChild(categoryCell);


       // Task DueDate Cell
       const dueDateCell = document.createElement("td");
       dueDateCell.textContent = task.taskDueDate;
       row.appendChild(dueDateCell);

       // Task Status Cell
       const statusCell = document.createElement("td");
       statusCell.textContent = task.taskStatus;
       row.appendChild(statusCell);

    
       

//   Actions cell (e.g., Edit, Delete buttons)
//     const actionsCell = document.createElement("td");

//     Actions cell (e.g., Edit, Delete buttons)
//     const editButton = document.createElement("button");
//     editButton.textContent = "Edit";
//     editButton.onclick = () => editTask(task.id); // Implement editTask function
//     actionsCell.appendChild(editButton);


    taskTableBody.appendChild(row);
  });
}
//Local Storage Functions 
function saveTask(taskList){
    localStorage.setItem('taskList',JSON.stringify(taskList));
}
function loadTasks() {
    const storedTasks = localStorage.getItem('taskList');
    if (storedTasks) {
        return JSON.parse(storedTasks);
    }
    return []; // Return an empty array if no tasks are stored
}
// // Call renderTasks to display tasks when the page loads
document.addEventListener("DOMContentLoaded",() => {
       initalTasks = loadTasks();
});

function filterTaskByStatus(inputValue){
   const filteredArrForStatus = taskList.filter(task => task.taskStatus.includes(inputValue));     
   console.log(filteredArrForStatus);
   if(filteredArrForStatus.length === 0){
    alert("no Items match status filter");
   }else {
     console.log(filteredArrForStatus);
     alert(`${filteredArrForStatus.length} task matched your status filter of ${inputValue}`);
     renderTasks(filteredArrForStatus);
   }
};

function filterTaskByCategory(inputValue){
    const filteredArrForCategory = taskList.filter(task => task.taskCategory.includes(inputValue));
     console.log(filteredArrForCategory);
    if(filteredArrForCategory.length === 0){
     alert("no Items match category filter")
    }else {
        console.log(filteredArrForCategory);
       alert(`${filteredArrForCategory.length} task matched your category filter of ${inputValue}`);
      renderTasks(filteredArrForCategory);
    }
};

addTaskButton.addEventListener("click",function(){
   let newTask = {id: nextId++  ,  // Assign the current value of nextId and then increment it
                 taskName: document.getElementById("TaskNameInput").value,
                 taskStatus: document.querySelector("input[name='status']:checked").value,
                 taskDueDate: document.getElementById("dateInput").value,
                 taskCategory: document.getElementById("categoryDropdown").value,
   };
   console.log("add task was clicked was clicked");
    console.log(newTask);
    // taskList.push(newTask);
    addTask(newTask);
    renderTasks();
    console.log(taskList)
});

categoryFilterButton.addEventListener("click",function(){
    let categoryFilterInput = document.getElementById("categorySelect").value;
    console.log("category filter was clicked here is my input value" + categoryFilterInput)
    filterTaskByCategory(categoryFilterInput)
   
});

statusFilterButton.addEventListener("click", function(){
let  statusFilterInput = document.getElementById("statusSelect").value;
  console.log("status filter was clicked here is my input value" + statusFilterInput)
      filterTaskByStatus(statusFilterInput)

});