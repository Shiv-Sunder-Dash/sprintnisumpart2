// Task Priority Enum
export enum TaskPriority {
    Low = 1,
    Medium,
    High
}

// Discriminated Union for Tag
export type Tag = { type: "text"; content: string } | { type: "image"; src: string }

// Task interface with all basic types
export interface Task {
    id: number
    title: string
    completed?: boolean // optional
    priority?: TaskPriority // enum, optional
    tag?: Tag // discriminated union, optional
    meta?: [string, number] // tuple
    extra?: any // any type
    due?: Date | null // nullable type
}

// Type alias for TaskID
export type TaskID = number;

// Literal type for allowed statuses
export type TaskStatus = "pending" | "done";

// Conditional type for demo
export type Result<T> = T extends boolean ? string : number;

// Generic type for response
export type ApiResponse<T> = { data: T; error?: string };
