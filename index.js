
//  Adding New Tasks
// Create input fields for the task name, category, deadline, status 
// Include an “Add Task” button that will add the task to the task list.
// Each task should be stored as an object with properties such as task name,
//  category, deadline, and status.
// Add the task object to an array that holds all tasks.


let taskList = [];
let taskName;
let taskStatus;
let taskDueDate;
let taskCategory;
let addTaskButton = document.getElementById("addTaskButton");


function addTask(taskName,taskStatus,taskDueDate,taskCategory){
    if(!taskName || !taskStatus || !taskDueDate || !taskCategory){
        console.log("All values are required");
    }else {
   const task =  {taskName: taskName, 
                 taskStatus: taskStatus,
                 taskDueDate:  taskDueDate,
                 taskCategory: taskCategory
   };
    console.log(task);
    console.log(task.taskName)
    // console.log(`${taskList[task.taskName]} has been to the list.`)
    }
}
addTask("Mow The Lawn","Incomplete","11/2/32","housework");


function renderTasks(){
    const taskTableBody = document.querySelector("tbody");
    taskTableBody.innerHTML =""; //clear existing rows
    taskList.forEach(task => {
    const row = document.createElement('tr');
   
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


    

          // Actions cell (e.g., Edit, Delete buttons)
    // const actionsCell = document.createElement("td");

    // Actions cell (e.g., Edit, Delete buttons)
    // const editButton = document.createElement("button");
    // editButton.textContent = "Edit";
    // editButton.onclick = () => editTask(task.id); // Implement editTask function
    // actionsCell.appendChild(editButton);

    // const deleteButton = document.createElement("button");
    // deleteButton.textContent = "Delete";
    // deleteButton.onclick = () => deleteTask(task.id); // Implement deleteTask function
    // actionsCell.appendChild(deleteButton);
    // row.appendChild(actionsCell);

    taskTableBody.appendChild(row);
  });
}

addTaskButton.addEventListener("click",function(){
   let newTask = {taskName: document.getElementById("TaskNameInput").value,
                 taskStatus: document.querySelector("input[name='status']:checked").value,
                 taskDueDate: document.getElementById("dateInput").value,
                 taskCategory: document.getElementById("categoryDropdown").value,
   };
   console.log("I was clicked");
    console.log(newTask);
    taskList.push(newTask);
    addTask(newTask);
    renderTasks();
    console.log(taskList)
});
// Call renderTasks to display tasks when the page loads
// document.addEventListener("DOMContentLoaded", renderTasks);