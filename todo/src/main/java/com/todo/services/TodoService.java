package com.todo.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.todo.entities.Todo;
import com.todo.entities.User;
import com.todo.repository.TodoRepo;
import com.todo.repository.UserRepo;

@Service
public class TodoService {

    @Autowired
    TodoRepo todoRepo;

    @Autowired
    UserRepo userRepo;

    public Todo createTodo(int userId, Todo todo) {
        // Check if the user exists
        User user = userRepo.findById(userId);

        Todo newTodo = new Todo();
        newTodo.setBody(todo.getBody());
        newTodo.setCreatedDate(new Date());
        newTodo.setUser(user);

        return todoRepo.save(newTodo);
    }

    public List<Todo> getAllTodosByUser(int userId) {
         User user = userRepo.findById(userId);
        return todoRepo.findAllTodoByUser(user);
    }

    
    public Optional<Todo> getTodoById(Integer todoId) {
        Optional<Todo> todo = null;
        try {
            todo = this.todoRepo.findById(todoId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return todo;
    }

    public void deleteTodo(int userId , int todoId) {
        User user = userRepo.findById(userId);
        Todo todo = todoRepo.findByUserAndTodoId(user,todoId);
        todoRepo.delete(todo);
    }

    public Todo updateTodo(int userId , int todoId , Todo todo) {
        User user = userRepo.findById(userId);
        Todo newTodo = todoRepo.findByUserAndTodoId(user, todoId);
       
        newTodo.setBody(todo.getBody());
        return todoRepo.save(newTodo);
    }

}
