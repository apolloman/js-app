class ToDoClass {
	constructor() {
		debugger;
    /* Locale Storage */
    this.tasks = JSON.parse(localStorage.getItem("TASKS"));

/* List of tasks */
   if(!this.tasks) {
      this.tasks = [
          {task: 'Learn ReactJS', isComplete: false},
          {task: 'Clean My Home', isComplete: true},
          {task: 'Buy something to eat', isComplete: false},
	   ];
	}

    this.addKeytListener();
	this.loadTasks();

	} /* end constructor */


/* add Item with Enter Button */
	addKeyListener() { 
    	document.getElementById('addTask').addEventListener('keypress', event => {
            if(event.keyCode === 13) {
            	this.addTask(event.target.value);
            	event.target.value = '';
            }
    	});
    }

 
/* Iterate over tasks in array and add to list */
	loadTasks() {
		let tasksHtml = this.tasks.reduce((html,task,index) => html += this.generateTaskHtml(task, index), '');
		document.getElementById('taskList').innerHTML = tasksHtml;
		localStorage.setItem("TASKS", JSON.stringify(this.tasks));
	}


    generateTaskHtml(task, index) {
        return `
<li class="list-group-item checkbox">
	<div class="row">
		<div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
			<label><input id="toggleTaskStatus" type="checkbox"
				onchange="toDo.toggleTaskStatus(${index})" value="" class=""
			${task.isComplete?'checked':''}></label>
		</div>
		<div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete?'complete':''}">
			${task.task}
		</div>
		<div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
			<a class="" href="/" onClick="toDo.deleteTask(event, ${index})"><i
				id="deleteTask" data-id="${index}" class="delete-icon glyphicon
			glyphicon-trash">X</i></a>
		</div>
	</div>
</li>`;
}

    toggleTaskStatus(index) {
	    this.tasks[index].isComplete = !this.tasks[index].isComplete;
	    this.loadTasks();
    }

    deleteTask(event, taskIndex) {
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);
        this.loadTasks();
    }

    addTaskClick() {
  	   let target = document.getElementById('addTask');
  	   this.addTask(target.value);
  	   target.value = "";
    }

    addTask(task) {
       let newTask = {
         task,
         isComplete: false,
     };

     let parentDiv = document.getElementById('addTask');
     if (task === '') {
     	parentDiv.classList.add('is-invalid');
     } else {
     	parentDiv.classList.remove('is-invalid');
     	this.tasks.push(newTask);
     	this.loadTasks();
     }
  }

} /* End */

let toDo;
window.addEventListener("load", () => {
	toDo = new ToDoClass();
});

