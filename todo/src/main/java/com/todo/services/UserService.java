package com.todo.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.todo.entities.User;
import com.todo.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    public User saveUser(User user) {

        if (userRepo.existsByEmail(user.getEmail())) {
            return null;
        }

        BCryptPasswordEncoder bcp = new BCryptPasswordEncoder();
        String bcPass = bcp.encode(user.getPassword());
        user.setPassword(bcPass);

        return userRepo.save(user);
    }

    public void processOAuthPostLogin(String email, String userName) {
        User existUser = userRepo.findByEmail(email);

        if (existUser == null) {
            User newUser = new User();
            newUser.setUserName(userName);
            newUser.setEmail(email);
            newUser.setSso(true);

            userRepo.save(newUser);
            System.out.println("Created new user: " + newUser);

        } else {
            System.out.println(existUser.getUserId());
        }

    }

    public List<User> getAllUsers() {
        List<User> list = (List<User>) this.userRepo.findAll();
        return list;
    }

    public User getUserById(Long userId) {
        User user = null;
        try {
            user = this.userRepo.findByUserId(userId);
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

    // MANUAL LOGIN
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

    public void deleteUser(Long userId) {
        userRepo.deleteById(userId);
    }
}