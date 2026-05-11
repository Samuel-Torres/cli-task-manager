import { add, list } from "./task";

const [command, ...args] = process.argv.slice(2);

function complete(args: string[]): void {
  console.log("[complete] not yet implemented", args);
}

function deleteTask(args: string[]): void {
  console.log("[delete] not yet implemented", args);
}

function usage(): void {
  console.log(`Usage:
  tasks add <title>
  tasks list
  tasks complete <id>
  tasks delete <id>`);
}

switch (command) {
  case "add":
    add(args.join(" "));
    break;
  case "list":
    list();
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
