
let taskList = [];
let taskName;
let taskStatus;
let taskDueDate;
let taskCategory;
let addTaskButton = document.getElementById("addTaskButton");
let editTaskButton = document.getElementById("editTaskButton");
let categoryFilterButton = document.getElementById("categoryFilterButton");
let statusFilterButton = document.getElementById("statusFilterButton");
let nextId = 1; // Initialize a counter outside the function/loop where objects are created
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; // getMonth() is 0-indexed
const year = today.getFullYear();
const todayformattedDate = `${month}-${day}-${year}`; 

//define functions

//create Function
function addTask(task){
    if(task.taskName.trim() === "" || !task.taskName){
        alert("Cannot add an empty item to Task Managament App!");   
        clearInputFeilds();
        return;
    } if (taskList.includes(task.taskName.toLowerCase()) || taskList.includes(task.taskName.toUpperCase()) || taskList.includes(task.taskName)){
        alert(`${task.taskName} is already on the list`);
        clearInputFeilds();
        return;
    }else if(!task.taskDueDate){
        task.taskDueDate =  todayformattedDate;
        if(task.taskDueDate < todayformattedDate ){
        task.taskStatus = "Over Due";
        taskList.push(task);  
        renderTasks();
        clearInputFeilds();
        }
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
        task.taskStatus = "Over Due";
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


// Edit task Function 

function editTask(){
   let userInput = prompt("Which task would you like to Edit: (Use ID)");
     taskToEdit = taskList.find((task) => task.id == userInput);
        if(!taskToEdit){
            alert("There are No Task that match that Description. Please try editing again.")
        }else{
           let changeNameInput = prompt("what would you like the new name of task to be:");
          taskToEdit.taskName = changeNameInput;
          let  changeStatusInput = prompt("what would you like the new status to be: In Progress,Over Due,Completed");
          taskToEdit.taskStatus = changeStatusInput;
          renderTasks();
        }
     }


//clear Form Function
function clearInputFeilds(){
    document.getElementById("TaskNameInput").value = "";
    document.querySelector("input[name='status']:checked").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("categoryDropdown").value = "";
}

//Table Rendering For List

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
       task.taskDueDate = task.taskDueDate;
       row.appendChild(dueDateCell);

       // Task Status Cell
       const statusCell = document.createElement("td");
       statusCell.textContent = task.taskStatus;
       row.appendChild(statusCell);

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


//Filter Functions
function filterTaskByStatus(inputValue){
   const filteredArrForStatus = taskList.filter(task => task.taskStatus.includes(inputValue));     
   if(filteredArrForStatus.length === 0){
    alert("no Items match status filter");
   }else {
     alert(`${filteredArrForStatus.length} task matched your status filter of ${inputValue}`);
     renderTasks();
   }
};

function filterTaskByCategory(inputValue){
    const filteredArrForCategory = taskList.filter(task => task.taskCategory.includes(inputValue));
    if(filteredArrForCategory.length === 0){
     alert("no Items match category filter")
    }else {
       alert(`${filteredArrForCategory.length} task matched your category filter of ${inputValue}`);
       renderTasks();
    }
};


//Event Listeners 
addTaskButton.addEventListener("click",function(){
   let newTask = {id: nextId++  ,  // Assign the current value of nextId and then increment it
                 taskName: document.getElementById("TaskNameInput").value,
                 taskStatus: document.querySelector("input[name='status']:checked").value,
                 taskDueDate: document.getElementById("dateInput").value,
                 taskCategory: document.getElementById("categoryDropdown").value,
   };
    // taskList.push(newTask);
    addTask(newTask);
    renderTasks();
});

categoryFilterButton.addEventListener("click",function(){
    let categoryFilterInput = document.getElementById("categorySelect").value;
    filterTaskByCategory(categoryFilterInput)  
});

statusFilterButton.addEventListener("click", function(){
let  statusFilterInput = document.getElementById("statusSelect").value;
      filterTaskByStatus(statusFilterInput)
});
editTaskButton.addEventListener("click",function(){
    editTask();
});