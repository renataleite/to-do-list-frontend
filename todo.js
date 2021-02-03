var local = false
var app = new Vue({
    el: "#app",
    //data disponibiliza dados para o Vue gerenciar e reagir a mudanças
    data: {
        baseUrl: local ? "http://localhost:8080": "https://morning-beach-24953.herokuapp.com",
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

            this.todos = json.data;
            this.sortTasks();
        },
        async addTask() {
            if(!this.isValidInput()) return alert("Invalid input.");
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
            const resource = this.baseUrl + "/api/v1/todolist/" + todo._id;
            const settings = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "task": this.currentTask,
                    "done": todo.done
                })
            };
            await fetch(resource, settings);

            this.sortTasks();
        },
        async delTask(todo) {
            const resource = this.baseUrl + "/api/v1/todolist/" + todo._id;
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
        // é valido se existir algum valor no currentTask através do !this.currentTask.trim()
        isValidInput() {
            return !(!this.currentTask.trim() || this.checkIfTaskExists());
        },
        //informa se existe, na lista de tarefas, algum task com o texto igual ao contido no currentTask
        checkIfTaskExists() {
            return this.todos.some((todo) => todo.task === this.currentTask.trim());
        }
    },
    /*cachear e executar métodos somente quando algum dado reativo for alterado e/ou em métodos complexos com elevado tempo de execução, em prol da otimização. */
    computed: {
        filteredTasks() {
            return this.todos.filter(
                //transforma ambos os textos para letras minúsculas
                todo => todo.task.toLowerCase().match(this.currentTask.toLowerCase())
            );
        },
        progress() {
			const total = this.todos.length
			const done = this.todos.filter(t => t.done).length
			return Math.round(done / total * 100) || 0
		}
    }
});