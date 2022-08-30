package com.example.library.adapter.rest.book.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
public class FetchBooksResponse {
    Integer currentPage;
    Integer pages;
    List<Book> books;

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Book {
        private Long id;
        private String title;
        private String description;
        private List<Long> images;
    }
}
