new Vue({
    el: "#app",
    data: {
        currentTodo: "",
        todos: [
            { task: "Estudar", done: false },
            { task: "Trabalhar", done: false },
            { task: "Limpar a casa", done: true }
        ]
    }
});