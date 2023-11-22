package com.todo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.todo.entities.CaptchaResponse;
import com.todo.entities.User;
import com.todo.services.CaptchaService;
import com.todo.services.UserService;


@RestController   
@CrossOrigin("http://localhost:3000/")
public class UserController {

    @Autowired
    UserService userService; 

    @Autowired
    CaptchaService captchaService;

    @GetMapping("/captcha")
    public CaptchaResponse generateCaptcha() {
        return new CaptchaResponse(captchaService.generateCaptchaImage());
    }


    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user){
        return userService.saveUser(user);
    }
    

    @GetMapping("/users")
    public List<User> getUsers() {
        return this.userService.getAllUsers();
    }

    @GetMapping("/users/{userId}")
    public Optional<User> getUserById(@PathVariable("userId") Integer userId) {
        return this.userService.getUserById(userId);
    }

    @GetMapping("/users/email/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return this.userService.getUserByEmail(email);
    }

    @GetMapping("/login/{email}/{password}")
    public User getUserByEmailAndPassword(@PathVariable("email") String email,
            @PathVariable("password") String password) {
        return this.userService.getUserByEmailAndPassword(email, password);
    }

    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable("userId") Integer userId) {
        this.userService.deleteUser(userId);
    }

}
