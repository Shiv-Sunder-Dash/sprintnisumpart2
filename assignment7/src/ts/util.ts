export function log(x: any): void {
    console.log(x)
}

export function fail(): never {
    throw new Error("fail")
}

import type { Result, Tag, Task } from "./interfaces";

export function useResult<T>(x: T): Result<T> {
    return typeof x === "boolean" ? "ok" as Result<T> : 0 as Result<T>
}

export function isString(x: any): x is string {
    return typeof x === "string"
}

// Type guard for Tag
export function isTextTag(tag: Tag): tag is { type: "text"; content: string } {
    return tag.type === "text";
}

// Type guard for Task
export function isTask(obj: any): obj is Task {
    return obj && typeof obj.id === "number" && typeof obj.title === "string";
}

// Example generic function
export function identity<T>(x: T): T {
    return x;
}
