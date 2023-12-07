package com.todo.controllers;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.todo.entities.CaptchaResponse;
import com.todo.entities.User;
import com.todo.repository.UserRepo;
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

    @Autowired
    UserRepo userRepo;


    private HashMap<Integer, String> hm = new HashMap<>();

    @GetMapping("/captcha/{randomId}")
    public CaptchaResponse generateCaptcha(@PathVariable("randomId") int randomId) {
        Captcha captcha = CaptchaService.createCaptcha(200, 50);
        System.out.println(captcha.getAnswer());
        hm.put(randomId, captcha.getAnswer());
        return new CaptchaResponse(captchaService.encodeCaptcha(captcha));
    }

    @PostMapping("/register")
    public User createUser(@RequestBody User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            return userRepo.findByEmail(user.getEmail());
        }
        return userService.saveUser(user);
    }

    @PostMapping("/login/{randomId}")
    public User getUserByEmailAndPassword(@PathVariable("randomId") int randomId, @RequestBody User user) {
        String code = hm.get(randomId);

        if (user.getCaptcha().equals(code)) {
            return this.userService.getUserByEmailAndPassword(user.getEmail(), user.getPassword());
        }
        return null;
    }

    @GetMapping("/user")
    public ResponseEntity<?> userDetails(@AuthenticationPrincipal OAuth2User oAuth2User) {
        if (oAuth2User == null) {
            String errorMessage = "OAuth2User is null. Authentication may be missing or not configured correctly.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorMessage);
        }
    
        String email = oAuth2User.getAttribute("email");
    
        if (email == null) {
            String errorMessage = "Email not found in OAuth2User attributes.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorMessage);
        }
    
        User user = userRepo.findByEmail(email);
    
        if (user == null) {
            String errorMessage = "User not found for email: " + email;
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(errorMessage);
        }
    
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/logout")
    public String logout() {
        // Invalidate the current user's session
        SecurityContextHolder.getContext().setAuthentication(null);
        return "Successful  logout";
    }
}
