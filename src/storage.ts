class LocalTaskStorage {
    private storageKey: string;

    constructor() {
        this.storageKey = "tasks";
    }

    getTasks(): Task[] {
        const tasksJson = localStorage.getItem(this.storageKey);
        return tasksJson ? JSON.parse(tasksJson) : [];
    }

    addTask(task: Omit<Task, 'id'>): Task {
        const tasks = this.getTasks();
        const newTask: Task = { ...task, id: Date.now().toString() };
        tasks.push(newTask);
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        return newTask;
    }

    deleteTask(taskId: string): string {
        const tasks = this.getTasks();
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
        return taskId;
    }

    updateTask(taskId: string, updatedTask: Partial<Omit<Task, 'id'>>): void {
        const tasks = this.getTasks();
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex !== -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        }
    }
}

interface Task {
    id: string;
    title: string;
    about: string;
}

const storage = new LocalTaskStorage();
export default storage;
