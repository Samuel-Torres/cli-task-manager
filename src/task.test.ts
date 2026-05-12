import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { add, complete, deleteTask, TASKS_FILE, Task } from "./task";

function readTasks(): Task[] {
  return JSON.parse(fs.readFileSync(TASKS_FILE, "utf-8"));
}

afterEach(() => {
  if (fs.existsSync(TASKS_FILE)) {
    fs.unlinkSync(TASKS_FILE);
  }
});

test("add creates a task in tasks.json", () => {
  add("Buy milk");
  const tasks = readTasks();
  assert.equal(tasks.length, 1);
  assert.equal(tasks[0].title, "Buy milk");
  assert.equal(tasks[0].done, false);
  assert.ok(tasks[0].id);
  assert.ok(tasks[0].createdAt);
});

test("complete sets done to true", () => {
  add("Buy milk");
  const id = readTasks()[0].id;
  complete(id);
  assert.equal(readTasks()[0].done, true);
});

test("delete removes the task", () => {
  add("Buy milk");
  const id = readTasks()[0].id;
  deleteTask(id);
  assert.equal(readTasks().length, 0);
});
