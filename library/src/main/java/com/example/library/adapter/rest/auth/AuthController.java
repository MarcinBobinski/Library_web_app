package com.example.library.adapter.rest.auth;

import com.example.library.adapter.postgresql.auth.ERole;
import com.example.library.adapter.postgresql.auth.Role;
import com.example.library.adapter.postgresql.auth.RoleRepository;
import com.example.library.adapter.postgresql.auth.User;
import com.example.library.adapter.postgresql.auth.UserRepository;
import com.example.library.adapter.rest.auth.dto.JwtPayload;
import com.example.library.adapter.rest.auth.dto.LoginRequest;
import com.example.library.adapter.rest.auth.dto.MessagePayload;
import com.example.library.adapter.rest.auth.dto.SignupRequest;
import com.example.library.security.jwt.JwtUtils;
import com.example.library.security.service.UserDetailsImpl;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired AuthenticationManager authenticationManager;
  @Autowired UserRepository userRepository;
  @Autowired RoleRepository roleRepository;
  @Autowired PasswordEncoder encoder;
  @Autowired JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    List<String> roles =
        userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());

    return ResponseEntity.ok(
        new JwtPayload(
            jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    ResponseEntity<?> invalidRequest = validateSignupRequest(signUpRequest);
    if (invalidRequest != null) return invalidRequest;

    User user = createUser(signUpRequest, Collections.singletonList(ERole.ROLE_USER));

    userRepository.save(user);
    return ResponseEntity.ok(new MessagePayload("User registered successfully!"));
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping("/signup/Admin")
  public ResponseEntity<?> registerAdmin(@Valid @RequestBody SignupRequest signUpRequest) {
    ResponseEntity<?> invalidRequest = validateSignupRequest(signUpRequest);
    if (invalidRequest != null) return invalidRequest;

    User user = createUser(signUpRequest, Arrays.asList(ERole.ROLE_USER, ERole.ROLE_ADMIN));

    userRepository.save(user);
    return ResponseEntity.ok(new MessagePayload("User registered successfully!"));
  }

  private User createUser(SignupRequest signUpRequest, List<ERole> roles) {
    User user =
        new User(
            signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            encoder.encode(signUpRequest.getPassword()));

    Set<Role> userRoles =
        roles.stream()
            .map(
                (role) ->
                    roleRepository
                        .findByName(ERole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found.")))
            .collect(Collectors.toSet());

    user.setRoles(userRoles);

    return user;
  }

  private ResponseEntity<?> validateSignupRequest(SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest()
          .body(new MessagePayload("Error: Username is already taken!"));
    }
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest()
          .body(new MessagePayload("Error: Email is already in use!"));
    }
    return null;
  }

  @PostMapping("/test1")
  public ResponseEntity<?> all() {
      return ResponseEntity.ok("ok");
  }

  @PreAuthorize("hasRole('USER')")
  @PostMapping("/test2")
  public ResponseEntity<?> user() {
      return ResponseEntity.ok("ok");
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping("/test3")
  public ResponseEntity<?> admin() {
      return ResponseEntity.ok("ok");
  }
}
