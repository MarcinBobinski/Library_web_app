package com.example.library.domain;

import com.example.library.adapter.postgresql.auth.User;
import com.example.library.adapter.postgresql.auth.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }
}
