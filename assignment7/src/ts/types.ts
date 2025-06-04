import type { Task } from "./interfaces";

// Add mapped type for all task properties as optional
export type OptionalTask = Partial<Task>;
// Add mapped type for all task properties as required
export type AllRequiredTask = Required<Task>;
// Add intersection type
export type TaskWithMeta = Task & { meta: [string, number] };
// Add union type for task or null
export type TaskOrNull = Task | null;
// Add generic type for response
export type ApiResponse<T> = { data: T; error?: string };
