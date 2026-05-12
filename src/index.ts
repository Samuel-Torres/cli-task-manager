import { add, list, complete, deleteTask } from "./task";

const [command, ...args] = process.argv.slice(2);

function parseId(raw: string | undefined, cmd: string): number {
  const id = parseInt(raw ?? "", 10);
  if (isNaN(id)) {
    console.error(`Usage: tasks ${cmd} <id>`);
    process.exit(1);
  }
  return id;
}

function usage(): void {
  console.log(`Usage:
  npm run dev add <title>     # add a new task
  npm run dev list            # list all tasks
  npm run dev complete <id>   # mark a task as done
  npm run dev delete <id>     # delete a task`);
}

switch (command) {
  case "add": {
    const title = args.join(" ").trim();
    if (!title) {
      console.error("Usage: tasks add <title>");
      process.exit(1);
    }
    add(title);
    break;
  }
  case "list":
    list();
    break;
  case "complete":
    complete(parseId(args[0], "complete"));
    break;
  case "delete":
    deleteTask(parseId(args[0], "delete"));
    break;
  default:
    usage();
    process.exit(1);
}
