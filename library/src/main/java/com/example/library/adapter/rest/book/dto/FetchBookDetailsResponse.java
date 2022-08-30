package com.example.library.adapter.rest.book.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class FetchBookDetailsResponse {
    private Long id;
    private String title;
    private String description;
    private List<Long> images;
}
