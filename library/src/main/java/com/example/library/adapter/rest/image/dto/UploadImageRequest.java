package com.example.library.adapter.rest.image.dto;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UploadImageRequest {
    @NotNull
    byte[] content;
}
