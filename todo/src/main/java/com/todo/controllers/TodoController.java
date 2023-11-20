package com.todo.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.todo.entities.Todo;
import com.todo.services.TodoService;

@RestController
@CrossOrigin("http://localhost:3000/")
public class TodoController {

    @Autowired
    TodoService todoService;

    @GetMapping("/todos")
    public List<Todo> getTodos() {
        return this.todoService.getAllTodos();
    }

    @GetMapping("/todos/{todoId}")
    public Optional<Todo> getTodoById(@PathVariable("todoId") Integer todoId) {
        return this.todoService.getTodoById(todoId);
    }


    @DeleteMapping("/todos/{todoId}")
    public void deleteTodo(@PathVariable("todoId") Integer todoId) {
        this.todoService.deleteTodo(todoId);
    }

    @PutMapping("/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@RequestBody Todo todo, @PathVariable("todoId") int todoId) {
        this.todoService.updateTodo(todo, todoId);
        return ResponseEntity.ok().body(todo);
    }

}
