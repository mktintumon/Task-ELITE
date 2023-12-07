package com.todo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.todo.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User,Long>{
    Boolean existsByEmail(String email);
    public User findByUserId(Long userId);
    public User findByEmail(String email);
    public User findByUserName(String userName);
    public User findByEmailAndPassword(String email , String password);
}
