new Vue({
    el: "#app",
    data: {
        currentTask: "",
        todos: [
            { task: "Estudar", done: false },
            { task: "Trabalhar", done: false },
            { task: "Limpar a casa", done: true }
        ]
    },
    methods: {
        addTask() {
            this.todos.push({
                task: this.currentTask,
                done: false
            });
            this.currentTask = "";
            this.sortTasks();
        },
        toggleTask(todo) {
            todo.done = !todo.done;
            this.sortTasks();
        },
        delTask(todo) {
            this.todos = this.todos.filter(el => el.task !== todo.task);
        },
        sortTasks() {
            this.todos.sort((a,b) => a.done - b.done);
        },
        isValidInput() {
            return !(!this.currentTask.trim() || this.checkIfTodoExists());
        },
        checkIfTaskExists() {
            return this.todos.some((todo) => todo.task === this.currentTask.trim());
        }
    },
    computed: {
        filteredTasks() {
            return this.todos.filter(
                todo => todo.task.toLowerCase().match(this.currentTask.toLowerCase())
            );
        }
    }
});