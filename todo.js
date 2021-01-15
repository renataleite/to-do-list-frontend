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
        }
    }
});