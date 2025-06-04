export function log(x) {
    console.log(x);
}
export function fail() {
    throw new Error("fail");
}
export function useResult(x) {
    return typeof x === "boolean" ? "ok" : 0;
}
export function isString(x) {
    return typeof x === "string";
}
// Type guard for Tag
export function isTextTag(tag) {
    return tag.type === "text";
}
// Type guard for Task
export function isTask(obj) {
    return obj && typeof obj.id === "number" && typeof obj.title === "string";
}
// Example generic function
export function identity(x) {
    return x;
}
