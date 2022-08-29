package com.example.library.adapter.rest.book;

import com.example.library.adapter.postgresql.book.Book;
import com.example.library.adapter.rest.book.dto.AddBookRequest;
import com.example.library.adapter.rest.book.dto.BookResponse;
import com.example.library.adapter.rest.book.dto.FetchBooksResponse;
import com.example.library.domain.BookService;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/book")
public class BookController {
    @Autowired
    BookService bookService;

    @GetMapping("/books")
    ResponseEntity<FetchBooksResponse> fetchBooks(
        @RequestParam(name = "page") Integer page,
        @RequestParam(name = "limit") Integer limit
    ) {
        Page<Book> books = bookService.fetchBooks(page, limit);
        FetchBooksResponse response = new FetchBooksResponse(
            page,
            books.getTotalPages(),
            books.getContent().stream().map( book ->
                new BookResponse(
                    book.getTitle(),
                    book.getDescription(),
                    new ArrayList<>(book.getImages())
                )
            ).collect(Collectors.toList())
        );

      return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    ResponseEntity<Void> addBook(@RequestBody AddBookRequest request){
        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setDescription(request.getDescription());
        book.setImages(new HashSet<>( request.getImages()));
        bookService.addBook(book);
        return ResponseEntity.ok().build();
    }

}
