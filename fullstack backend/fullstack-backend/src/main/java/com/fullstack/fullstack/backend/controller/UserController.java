package com.fullstack.fullstack.backend.controller;

import com.fullstack.fullstack.backend.exception.UserNotFoundException;
import com.fullstack.fullstack.backend.model.User;
import com.fullstack.fullstack.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    public User newUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/users")
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable int id) {
       /*
        User foundUser = userRepository.findById(id).
                orElseThrow(() -> new UserNotFoundException(id));
        foundUser.setName(user.getName());
        foundUser.setUsername(user.getUsername());
        foundUser.setEmail(user.getEmail());
        return userRepository.save(foundUser);
        */
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(newUser.getName());
                    user.setUsername(newUser.getUsername());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    public String deleteUserById(@PathVariable int id) {
//        User foundUser = userRepository.findById(id)
//                .orElseThrow(() -> new UserNotFoundException(id));
//        userRepository.delete(foundUser);

        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id = " + id + "has been deleted success";
    }

}
