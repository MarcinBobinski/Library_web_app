package com.example.library.adapter.rest.book.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AddBookRequest {
    private String title;
    private String description;
    private List<Long> images;
}
