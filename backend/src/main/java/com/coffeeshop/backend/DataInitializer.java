package com.coffeeshop.backend;

import com.coffeeshop.backend.model.User;
import com.coffeeshop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("root").isEmpty()) {
            User rootAdmin = new User();
            rootAdmin.setUsername("root");
            rootAdmin.setPassword(passwordEncoder.encode("rootpassword"));
            rootAdmin.setRole("ROOT_ADMIN");
            userRepository.save(rootAdmin);
        }
    }
}