package com.todo.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/create/{userId}")
    public ResponseEntity<Todo> createTodo(@PathVariable Long userId, @RequestBody Todo todo) {
        Todo createdTodo = todoService.createTodo(userId, todo);
        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    @GetMapping("/todos/user/{userId}")
    public ResponseEntity<List<Todo>> getAllTodosForUser(@PathVariable Long userId) {
        List<Todo> todos = todoService.getAllTodosByUser(userId);
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @DeleteMapping("/todos/{userId}/{todoId}")
    public void deleteTodo( @PathVariable("userId") Long userId,@PathVariable("todoId") Integer todoId ) {
        this.todoService.deleteTodo(userId , todoId);
    }

    @PutMapping("/todos/{userId}/{todoId}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long userId,@PathVariable Integer todoId,@RequestBody Todo todo) {
        Todo updatedTodo = todoService.updateTodo(userId, todoId, todo);
        return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
    }

}
