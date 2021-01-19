var app = new Vue({
    el: "#app",
    data: {
        baseUrl: "https://morning-beach-24953.herokuapp.com",
        currentTask: "",
        todos: [
            { task: "Estudar", done: false },
            { task: "Trabalhar", done: false },
            { task: "Limpar a casa", done: true }
        ]
    },
    created: function () {
        this.getTasks();
    },
    methods: {
        async getTasks() {
            var resource = this.baseUrl + "/api/v1/todolist"
            const response = await fetch(resource);
            var json = await response.json();
            console.log(json);
            this.todos = json.toDoList.data;
        },
        addTask() {

            this.todos.push({
                task: this.currentTask,
                done: false
            });
            this.currentTask = "";
            this.sortTasks();
        },
        /* muda o estado “done” da tarefa passada como parâmetro*/
        toggleTask(todo) {
            todo.done = !todo.done;
            this.sortTasks();
        },
        delTask(todo) {
            this.todos = this.todos.filter(el => el.task !== todo.task);
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