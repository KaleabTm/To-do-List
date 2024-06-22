window.addEventListener('load',()=>{
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const task_list = document.querySelector(".list");

loadTasks();

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const task = input.value.trim();
    if(!task){
         alert("Please insert a task.");
         return;
    }
    addTask(task)
})
    // Add Task
    function addTask(task){

    const list=document.createElement("div");
    list.classList.add("task");

    const task_itm=document.createElement("div");
    task_itm.classList.add("items");

    const li_content=document.createElement("div");
    li_content.classList.add("content");

    const task_input = document.createElement("input");
    task_input.classList.add("text");
    task_input.type="text";
    task_input.value=task;
    task_input.setAttribute("readonly","readonly");

    li_content.appendChild(task_input);

    task_itm.appendChild(li_content)

    const task_act=document.createElement("div");
    task_act.classList.add("action");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerHTML="Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML="Delete";

    const checkBox = document.createElement("input");
    checkBox.type='checkbox';
    checkBox.classList.add("check");
    
    task_act.appendChild(editBtn);
    task_act.appendChild(deleteBtn);
    task_act.appendChild(checkBox)
    
    task_itm.appendChild(task_act);
    
    list.appendChild(task_itm);
    
    task_list.appendChild(list);
    input.value="";
    showNotification('Task was added successfully!')
    SaveTasks();


    // Edit Task
    editBtn.addEventListener('click',()=>{
        if(editBtn.innerHTML.toLowerCase()=="edit"){
            task_input.removeAttribute("readonly");
            task_input.focus();
            editBtn.innerHTML="Save";
            deleteBtn.style.display='none';
            checkBox.style.display='none';
            showNotification('Your task is now ready for editing.');
        }
        else{
            task_input.setAttribute("readonly","readonly");
            editBtn.innerHTML="Edit";
            deleteBtn.style.display='inline-block';
            checkBox.style.display='inline-block';
            showNotification('Your task was successfully saved.');

        }
        SaveTasks();
        })

        // Delete Task
        deleteBtn.addEventListener('click',()=>{
            if(confirm('Are you sure you want to delete this task?')){
                task_list.removeChild(list)
                SaveTasks();
            }
        })

        // CheckBox
        checkBox.addEventListener('change',()=>{
            if(checkBox.checked){
                task_input.classList.add('completed');
                editBtn.style.display='none';
                showNotification('Well-done! Task was successfully completed.')
                
            }
            else{
                task_input.classList.remove('completed');               
                editBtn.style.display='inline-block';
            }
            SaveTasks();
        })

    }

    // Save task to localStorage
    function SaveTasks(){
        const tasks =[];
        document.querySelectorAll('.task').forEach(taskElement =>{
            const taskInput = taskElement.querySelector('.text');
            const task = taskInput.value;
            const isChecked = taskElement.querySelector('.check').checked;
            tasks.push({task,isChecked});
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    };

    // Load tasks from localStorage
    function loadTasks(){
        const tasks=JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(({task,isChecked})=>{
            addTask(task);
            const taskElement = document.querySelectorAll('.task');
            const lastTask = taskElement[taskElement.length-1];
            const checkBox = lastTask.querySelector('.check');
            if (isChecked){
                checkBox.checked =true;
                checkBox.dispatchEvent(new Event('change'));

            };
        });
    };

    // For notifications
    function showNotification(message){
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML=message;
        document.body.appendChild(notification);
        setTimeout(()=>{
            document.body.removeChild(notification);
        },2000);

    };
});