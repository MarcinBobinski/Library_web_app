package com.example.library.domain;

import com.example.library.adapter.postgresql.auth.User;
import com.example.library.adapter.postgresql.book.Book;
import com.example.library.adapter.postgresql.rent.Rent;
import com.example.library.adapter.postgresql.rent.RentRepository;
import java.time.Clock;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RentService {
    @Autowired
    RentRepository rentRepository;
    @Autowired
    BookService bookService;
    @Autowired
    UserService userService;
    @Autowired
    Clock clock;

    public void rentBook(Long bookId, Long userId) throws Exception {
        Book book = bookService.fetchBookById(bookId).orElseThrow(Exception::new);
        User user = userService.getUserById(userId).orElseThrow(Exception::new);



        Rent rent = new Rent();
        rent.setBook(book);
        rent.setUser(user);
        rent.setRentedAt(Date.from(clock.instant()));
        rent.setExpectedReturnAt(Date.from(ZonedDateTime.now(clock).plus(1, ChronoUnit.MONTHS).toInstant()));
        rent.setReturnedAt(null);

        rentRepository.save(rent);
    }

    public void returnBook(Long userId, Long rentId) throws Exception {
        Rent rent = rentRepository.findById(rentId).orElseThrow(Exception::new);
        if(!Objects.equals(rent.getUser().getId(), userId)){
            throw new Exception();
        }
        rent.setReturnedAt(Date.from(clock.instant()));
        rentRepository.save(rent);
    }

    public List<Rent> getRentedBooks(Long userId) throws Exception {
        User user = userService.getUserById(userId).orElseThrow(Exception::new);
        return rentRepository.findAllByUser(user);
    }


}
