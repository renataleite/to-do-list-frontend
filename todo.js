var app = new Vue({
    el: "#app",
    data: {
        baseUrl: "https://morning-beach-24953.herokuapp.com",
        currentTask: "",
        todos: []
    },
    created: function () {
        this.getTasks();
    },
    methods: {
        async getTasks() {
            const resource = this.baseUrl + "/api/v1/todolist"
            const response = await fetch(resource);
            var json = await response.json();
            
            this.todos = json.toDoList.data;
            this.sortTasks();
        },        
        async addTask() {
            const resource = this.baseUrl + "/api/v1/todolist";
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "task": this.currentTask,
                    "done": false
                })
            };
            await fetch(resource, settings);
        
            this.currentTask = "";
            this.getTasks();
            
        },
        /* muda o estado “done” da tarefa passada como parâmetro*/
        toggleTask(todo) {
            todo.done = !todo.done;
            this.sortTasks();
        },
        delTask(todo) {
            const resource = this.baseUrl + "/api/v1/todolist"+todo.id;
            const settings = {
                method: 'DELETE',
            };
            await fetch(resource, settings);
            this.getTasks()
        },
        //responsável por ordenar a lista de tarefas
        sortTasks() {
            this.todos.sort((a, b) => a.done - b.done);
        },
        isValidInput() {
            return !(!this.currentTask.trim() || this.checkIfTodoExists());
        },
        checkIfTaskExists() {
            return this.todos.some((todo) => todo.task === this.currentTask.trim());
        }
    },
    /*cachear e executar métodos somente quando algum dado reativo for alterado e/ou em métodos complexos com elevado tempo de execução, em prol da otimização. */
    computed: {
        filteredTasks() {
            return this.todos.filter(
                todo => todo.task.toLowerCase().match(this.currentTask.toLowerCase())
            );
        }
    }
});