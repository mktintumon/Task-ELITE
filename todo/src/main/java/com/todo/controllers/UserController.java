package com.todo.controllers;

import java.util.HashMap;
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

import cn.apiclub.captcha.Captcha;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    CaptchaService captchaService;

    private HashMap<Integer, String> hm = new HashMap<>();

    @GetMapping("/captcha/{randomId}")
    public CaptchaResponse generateCaptcha(@PathVariable("randomId") int randomId) {
        Captcha captcha = CaptchaService.createCaptcha(200, 50);
        System.out.println(captcha.getAnswer());
        hm.put(randomId, captcha.getAnswer());
        return new CaptchaResponse(captchaService.encodeCaptcha(captcha));
    }

    @PostMapping("/register/{randomId}")
    public ResponseEntity<?> createUser(@PathVariable("randomId") int randomId, @RequestBody User user) {
        String code = hm.get(randomId);

        if (user.getCaptcha().equals(code)) {
            userService.saveUser(user);
            return ResponseEntity.ok("success");
        }
        return ResponseEntity.ok("failed");
    }

    @PostMapping("/login/{randomId}")
    public User getUserByEmailAndPassword(@PathVariable("randomId") int randomId, @RequestBody User user) {
        String code = hm.get(randomId);

        if (user.getCaptcha().equals(code)) {
            return this.userService.getUserByEmailAndPassword(user.getEmail(), user.getPassword());
        }
        return null;
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

    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable("userId") Integer userId) {
        this.userService.deleteUser(userId);
    }

}
