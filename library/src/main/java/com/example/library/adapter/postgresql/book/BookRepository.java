package com.example.library.adapter.postgresql.book;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(
        value = "SELECT * FROM books WHERE LOWER(title) LIKE LOWER(CONCAT(?1,'%'))",
        nativeQuery = true
    )
    List<Book> findBookByTitleText(String text);
}
