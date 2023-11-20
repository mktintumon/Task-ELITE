package com.todo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.todo.entities.User;
import com.todo.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

     public ResponseEntity<?> saveUser(User user) {

        if (userRepo.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        BCryptPasswordEncoder bcp = new BCryptPasswordEncoder();
        String bcPass = bcp.encode(user.getPassword());
        user.setPassword(bcPass);
        userRepo.save(user);
        return ResponseEntity.ok("Registration Successful");
    }

    public List<User> getAllUsers() {
        List<User> list = (List<User>) this.userRepo.findAll();
        return list;
    }

    public Optional<User> getUserById(Integer userId) {
        Optional<User> user = null;
        try {
            user = this.userRepo.findById(userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    public User getUserByEmail(String email) {

        User user = null;
        try {
            user = this.userRepo.findByEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }


    public User getUserByEmailAndPassword(String email, String password) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
         
        User user = null;
        try {
            user = this.userRepo.findByEmail(email);
            String encodedPass = user.getPassword();

            if (user != null) {
                if (!passwordEncoder.matches(password,encodedPass)) {
                    System.out.println("Wrong password!!!");
                    return null;
                } else {
                     return user;
                }
            }
        } catch (Exception e) {
            System.out.println("User not found");
        }
        return null;
    }

    public void deleteUser(int userId) {
        userRepo.deleteById(userId);
    }
}