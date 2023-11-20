package com.todo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.todo.entities.Todo;
import com.todo.repository.TodoRepo;
import com.todo.repository.UserRepo;

@Service
public class TodoService {

    @Autowired
    TodoRepo todoRepo;

    @Autowired
    UserRepo userRepo;

    public List<Todo> getAllTodos() {
        List<Todo> list = (List<Todo>) this.todoRepo.findAll();
        return list;
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



    public void deleteTodo(int todoId) {
        todoRepo.deleteById(todoId);
    }

    public void updateTodo(Todo todo, int id) {
        todo.setTodoId(id);
        this.todoRepo.save(todo);
    }

}
