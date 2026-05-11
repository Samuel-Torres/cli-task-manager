import fs from "fs";
import path from "path";

export const TASKS_FILE = path.join(process.cwd(), "tasks.json");

export interface Task {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
}

function loadTasks(): Task[] {
  if (!fs.existsSync(TASKS_FILE)) return [];
  return JSON.parse(fs.readFileSync(TASKS_FILE, "utf-8")) as Task[];
}

function saveTasks(tasks: Task[]): void {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

export function list(): void {
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

export function add(title: string): void {
  const tasks = loadTasks();
  const id = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  tasks.push({ id, title, done: false, createdAt: new Date().toISOString() });
  saveTasks(tasks);
  console.log(`Added task #${id}: ${title}`);
}
