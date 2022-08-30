package com.example.library.adapter.rest.book.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class FindBookByTitleResponse {
    Long id;
    String title;
}
