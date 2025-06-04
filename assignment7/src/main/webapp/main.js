// TypeScript Concepts Demo Todo App
import { TaskPriority } from "./interfaces";
import { isString, isTextTag, identity, log } from "./util";
// TaskManager class using generics and typecasting
class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }
    add(task) {
        const newTask = Object.assign(Object.assign({}, task), { id: this.nextId++ });
        this.tasks.push(newTask);
        return newTask;
    }
    getAll() {
        return this.tasks;
    }
    getById(id) {
        var _a;
        return (_a = this.tasks.find(t => t.id === id)) !== null && _a !== void 0 ? _a : null;
    }
    toggle(id) {
        this.tasks = this.tasks.map(t => t.id === id ? Object.assign(Object.assign({}, t), { completed: !t.completed }) : t);
    }
    remove(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }
}
// Use the TaskManager with typecasting
const manager = new TaskManager();
// DOM elements
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const addBtn = document.getElementById("add-btn");
const prioritySel = document.getElementById("priority-sel");
function render() {
    list.innerHTML = "";
    manager.getAll().forEach(t => {
        var _a;
        const li = document.createElement("li");
        // Tuple, enum, literal, nullable, and discriminated union usage
        const meta = (_a = t.meta) !== null && _a !== void 0 ? _a : ["default", 0];
        const priority = t.priority !== undefined ? TaskPriority[t.priority] : "None";
        let tagStr = "";
        if (t.tag) {
            tagStr = isTextTag(t.tag) ? `[Text: ${t.tag.content}]` : `[Image: ${t.tag.src}]`;
        }
        li.textContent = `${t.title} [${t.completed ? "done" : "pending"}] [Priority: ${priority}] [Meta: ${meta[0]},${meta[1]}] ${tagStr}`;
        li.onclick = () => {
            manager.toggle(t.id);
            render();
        };
        const del = document.createElement("button");
        del.textContent = "x";
        del.onclick = e => {
            e.stopPropagation();
            manager.remove(t.id);
            render();
        };
        li.appendChild(del);
        list.appendChild(li);
    });
}
function addTaskFromInput() {
    if (isString(input.value) && input.value.trim()) {
        // Use enum, tuple, union, nullable, and discriminated union
        const priority = prioritySel ? Number(prioritySel.value) : TaskPriority.Low;
        const tag = Math.random() > 0.5 ? { type: "text", content: "demo" } : { type: "image", src: "img.png" };
        const meta = ["created", Date.now()];
        const due = Math.random() > 0.5 ? new Date(Date.now() + 86400000) : null;
        const task = manager.add({
            title: input.value.trim(),
            completed: false,
            priority,
            tag,
            meta,
            due,
            extra: undefined // undefined type
        }); // typecasting
        log(identity({ data: task }));
        input.value = "";
        render();
    }
}
addBtn.onclick = addTaskFromInput;
// Example never usage
function unreachable(x) {
    throw new Error("Unreachable: " + x);
}
// Initial render
render();
