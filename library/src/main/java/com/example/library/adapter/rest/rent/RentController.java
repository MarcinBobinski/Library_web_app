package com.example.library.adapter.rest.rent;

import com.example.library.adapter.postgresql.rent.Rent;
import com.example.library.adapter.rest.rent.dto.BookRentResponse;
import com.example.library.domain.RentService;
import com.example.library.security.service.UserDetailsImpl;
import java.util.List;
import java.util.stream.Collectors;
import javax.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rent")
public class RentController {
    @Autowired
    RentService rentService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{id}")
    ResponseEntity<?> rentBook(
        @PathVariable(name = "id") Long bookId
    ){
        try {
            rentService.rentBook(bookId, getUserId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/return/{id}")
    ResponseEntity<?> returnBook(
        @PathVariable(name = "id") Long rentId
    ){
        try {
            rentService.returnBook(getUserId(), rentId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user-rents")
    ResponseEntity<?> userRentedBooks(){
        try {
            List<Rent> rentList = rentService.getRentedBooks(getUserId());
            return ResponseEntity.ok(rentList.stream().map(BookRentResponse::fromBook).collect(Collectors.toList()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private Long getUserId(){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getId();
    }
}
