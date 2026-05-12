# cli-task-manager

## What this project does
A CLI task manager built in Node.js/TypeScript.
Supports four commands: add, list, complete, delete.
Tasks are persisted in tasks.json.
## Tech stack
- Runtime: Node.js v18+
- Language: TypeScript
- Storage: Local JSON file (tasks.json)
## Run commands
- Install: npm install
- Run: npx ts-node index.ts 
- Build: npx tsc


## Usage

```bash
npm run dev add "Buy milk"     # add a new task
npm run dev list               # list all tasks
npm run dev complete <id>      # mark a task as done
npm run dev delete <id>        # delete a task
```

## Conventions
- Use TypeScript strict mode
- Handle all errors gracefully with user-friendly messages
- Never delete tasks.json on startup