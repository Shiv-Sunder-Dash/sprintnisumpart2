package com.nisum.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/todo")
public class TodoController {
    List<String> todos = new ArrayList<>();

    @GetMapping
    public List<String> getTodos() {
        return todos;
    }

    @PostMapping
    public String addTodo(@RequestBody String task) {
        todos.add(task);
        return "Added";
    }

    @DeleteMapping("/{index}")
    public String deleteTodo(@PathVariable int index) {
        if (index >= 0 && index < todos.size()) {
            todos.remove(index);
            return "Deleted";
        }
        return "Invalid index";
    }
}
