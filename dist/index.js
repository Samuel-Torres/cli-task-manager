"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("./task");
const [command, ...args] = process.argv.slice(2);
function parseId(raw, cmd) {
    const id = parseInt(raw ?? "", 10);
    if (isNaN(id)) {
        console.error(`Usage: tasks ${cmd} <id>`);
        process.exit(1);
    }
    return id;
}
function usage() {
    console.log(`Usage:
  tasks add <title>
  tasks list
  tasks complete <id>
  tasks delete <id>`);
}
switch (command) {
    case "add": {
        const title = args.join(" ").trim();
        if (!title) {
            console.error("Usage: tasks add <title>");
            process.exit(1);
        }
        (0, task_1.add)(title);
        break;
    }
    case "list":
        (0, task_1.list)();
        break;
    case "complete":
        (0, task_1.complete)(parseId(args[0], "complete"));
        break;
    case "delete":
        (0, task_1.deleteTask)(parseId(args[0], "delete"));
        break;
    default:
        usage();
        process.exit(1);
}
