const title = document.querySelector(".add-task");
const desc = document.querySelector(".add-desc");
const prio = document.querySelector(".add-prio");
const btn = document.querySelector("#save-btn");
const taskListContainer = document.querySelector("#task-list");


class Task {
    constructor(title, description, priority){
        this.title = title;
        this.description = description;
        this.priority = priority;
    }

    logDetails() {
        console.log(`Task: ${this.title}`);
        console.log(`Priority: ${this.priority}`);
        console.log(`Description: ${this.description}`);
    }
}

class StorageManager {
    static save(tasks){
        localStorage.setItem("task_list", JSON.stringify(tasks));
    }
    static load(){
        return JSON.parse(localStorage.getItem("task_list")) || [];
    }
}


let tasks = StorageManager.load();

class UIManager {
    // This function clears the screen and redraws the list
    static renderTasks(tasks) {
        taskListContainer.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            // 'list-group-item' makes it a box
            // 'd-flex' and 'justify-content-between' align text and buttons
            li.className = "list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded";
            
            // Inject the HTML for the task info
            li.innerHTML = `
                <div>
                    <h5 class="mb-0 fw-bold">${task.title}</h5>
                    <small class="text-muted">${task.description} - <span class="badge bg-info text-dark">${task.priority}</span></small>
                </div>
                <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
            `;

            // Add to the container
            taskListContainer.appendChild(li);
        });
    }
}



function createTask(e) {
    e.preventDefault();

    if(title.value === "" || desc.value === "") return alert("Please enter text!");

    let newItem = new Task(title.value, desc.value, prio.value);

    newItem.logDetails();
    tasks.push(newItem);

    StorageManager.save(tasks);

    UIManager.renderTasks(tasks);


    title.value = "";
    desc.value = "";
    prio.value = "";
}   


function deleteTask(e) {
    if(e.target.classList.contains("delete-btn")){
        const deleteIndex = e.target.getAttribute("data-index");

        tasks.splice(deleteIndex, 1);
    }

    StorageManager.save(tasks);
    UIManager.renderTasks(tasks);
}

document.addEventListener("DOMContentLoaded", () => {
    UIManager.renderTasks(tasks);
});

btn.addEventListener("click", createTask);
taskListContainer.addEventListener("click", deleteTask);