"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASKS_FILE = void 0;
exports.list = list;
exports.complete = complete;
exports.deleteTask = deleteTask;
exports.add = add;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.TASKS_FILE = path_1.default.join(process.cwd(), "tasks.json");
function loadTasks() {
    if (!fs_1.default.existsSync(exports.TASKS_FILE))
        return [];
    return JSON.parse(fs_1.default.readFileSync(exports.TASKS_FILE, "utf-8"));
}
function saveTasks(tasks) {
    fs_1.default.writeFileSync(exports.TASKS_FILE, JSON.stringify(tasks, null, 2));
}
function list() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks yet. Use add to create one.");
        return;
    }
    const titleWidth = Math.max("Title".length, ...tasks.map((t) => t.title.length));
    const header = `${"ID".padEnd(2)}  ${"Title".padEnd(titleWidth)}  Status`;
    const separator = `${"--"}  ${"".padEnd(titleWidth, "-")}  -------`;
    console.log(header);
    console.log(separator);
    for (const task of tasks) {
        const status = task.done ? "done" : "pending";
        console.log(`${String(task.id).padEnd(2)}  ${task.title.padEnd(titleWidth)}  ${status}`);
    }
}
function complete(id) {
    const tasks = loadTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        console.error(`No task found with ID ${id}.`);
        process.exit(1);
    }
    task.done = true;
    saveTasks(tasks);
    console.log(`Task #${id} marked as done: ${task.title}`);
}
function deleteTask(id) {
    const tasks = loadTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
        console.error(`No task found with ID ${id}.`);
        process.exit(1);
    }
    const [removed] = tasks.splice(index, 1);
    saveTasks(tasks);
    console.log(`Deleted task #${id}: ${removed.title}`);
}
function add(title) {
    const tasks = loadTasks();
    const id = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    tasks.push({ id, title, done: false, createdAt: new Date().toISOString() });
    saveTasks(tasks);
    console.log(`Added task #${id}: ${title}`);
}
