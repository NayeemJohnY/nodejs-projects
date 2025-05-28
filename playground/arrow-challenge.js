const tasks = {
    tasks: [{
            text: 'Grocery shopping',
            completed: true
        },
        {
            text: 'Clean yard',
            completed: false
        },
        {
            text: 'File course',
            completed: false
        },
        {
            text: 'Read course',
            completed: true
        }
    ],

    getTasksToDo() {
        incompleteTasks = this.tasks.filter(task => task.completed == false);
        console.log(incompleteTasks);
    }
}

tasks.getTasksToDo()