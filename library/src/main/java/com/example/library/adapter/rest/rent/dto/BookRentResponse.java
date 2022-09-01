package com.example.library.adapter.rest.rent.dto;

import com.example.library.adapter.postgresql.rent.Rent;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class BookRentResponse {
    Long id;
    Long bookId;
    String bookTitle;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    Date rentedAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    Date expectedReturnAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    Date returnedAt;

    public static BookRentResponse fromBook(Rent rent){
        return new BookRentResponse(
            rent.getId(),
            rent.getBook().getId(),
            rent.getBook().getTitle(),
            rent.getRentedAt(),
            rent.getExpectedReturnAt(),
            rent.getReturnedAt()
        );
    }
}
