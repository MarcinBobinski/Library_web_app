package com.example.library.adapter.rest.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessagePayload {
  private String message;

  public MessagePayload(String message) {
    this.message = message;
  }
}
