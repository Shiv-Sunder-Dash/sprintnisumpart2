// TypeScript Concepts Demo Todo App
import { Task, TaskPriority, Tag, TaskID } from "./interfaces";
import { OptionalTask, TaskWithMeta, TaskOrNull, ApiResponse } from "./types";
import { isString, isTask, isTextTag, identity, log, useResult } from "./util";

// TaskManager class using generics and typecasting
class TaskManager<T extends Task> {
    private tasks: T[] = [];
    private nextId: number = 1;

    add(task: Omit<T, "id">): T {
        const newTask = { ...task, id: this.nextId++ } as T;
        this.tasks.push(newTask);
        return newTask;
    }

    getAll(): T[] {
        return this.tasks;
    }

    getById(id: TaskID): TaskOrNull {
        return this.tasks.find(t => t.id === id) ?? null;
    }

    toggle(id: TaskID): void {
        this.tasks = this.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) as T[];
    }

    remove(id: TaskID): void {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }
}

// Use the TaskManager with typecasting
const manager = new TaskManager<Task>();

// DOM elements
const input = document.getElementById("task-input") as HTMLInputElement;
const list = document.getElementById("task-list") as HTMLUListElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const prioritySel = document.getElementById("priority-sel") as HTMLSelectElement | null;

function render(): void {
    list.innerHTML = "";
    manager.getAll().forEach(t => {
        const li = document.createElement("li");
        // Tuple, enum, literal, nullable, and discriminated union usage
        const meta: [string, number] = t.meta ?? ["default", 0];
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

function addTaskFromInput(): void {
    if (isString(input.value) && input.value.trim()) {
        // Use enum, tuple, union, nullable, and discriminated union
        const priority = prioritySel ? Number(prioritySel.value) as TaskPriority : TaskPriority.Low;
        const tag: Tag = Math.random() > 0.5 ? { type: "text", content: "demo" } : { type: "image", src: "img.png" };
        const meta: [string, number] = ["created", Date.now()];
        const due: Date | null = Math.random() > 0.5 ? new Date(Date.now() + 86400000) : null;
        const task = manager.add({
            title: input.value.trim(),
            completed: false,
            priority,
            tag,
            meta,
            due,
            extra: undefined // undefined type
        } as OptionalTask as Task); // typecasting
        log(identity<ApiResponse<Task>>({ data: task }));
        input.value = "";
        render();
    }
}

addBtn.onclick = addTaskFromInput;

// Example never usage
function unreachable(x: never): never {
    throw new Error("Unreachable: " + x);
}

// Initial render
render();
