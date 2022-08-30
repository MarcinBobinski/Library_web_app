package com.example.library.domain;

import com.example.library.adapter.postgresql.book.Book;
import com.example.library.adapter.postgresql.book.BookRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;

    public Page<Book> fetchBooks(int page, int limit){
        Pageable pageable =  PageRequest.of(page, limit);
        return bookRepository.findAll(pageable);
    }

    public List<Book> findBooksByTitleText(String text){
       return bookRepository.findBookByTitleText(text);
    }

    public Optional<Book> fetchBookById(Long id){
        return bookRepository.findById(id);
    }

    public void addBook(Book book){
       bookRepository.save(book);
    }
}
