"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("./task");
const [command, ...args] = process.argv.slice(2);
function complete(args) {
    console.log("[complete] not yet implemented", args);
}
function deleteTask(args) {
    console.log("[delete] not yet implemented", args);
}
function usage() {
    console.log(`Usage:
  tasks add <title>
  tasks list
  tasks complete <id>
  tasks delete <id>`);
}
switch (command) {
    case "add":
        (0, task_1.add)(args.join(" "));
        break;
    case "list":
        (0, task_1.list)();
        break;
    case "complete":
        complete(args);
        break;
    case "delete":
        deleteTask(args);
        break;
    default:
        usage();
        process.exit(1);
}
