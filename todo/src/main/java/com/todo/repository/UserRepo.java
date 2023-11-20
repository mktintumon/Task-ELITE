package com.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.todo.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User,Integer>{
    public User findById(int userId);
    public User findByEmail(String email);
    public User findByEmailAndPassword(String email , String password);
    Boolean existsByEmail(String email);
}
