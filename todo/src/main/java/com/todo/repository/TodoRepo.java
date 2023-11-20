package com.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.todo.entities.Todo;
//import com.todo.entities.User;

@Repository
public interface TodoRepo extends JpaRepository<Todo,Integer>{
    public Todo findById(int todoId);
    //public Todo findByEmail(String email);
}
