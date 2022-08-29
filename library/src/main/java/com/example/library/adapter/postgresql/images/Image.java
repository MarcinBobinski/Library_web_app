package com.example.library.adapter.postgresql.images;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

//    @Type(type = "org.hibernate.type.ImageType")
//    @Type(type = "org.hibernate.type.PrimitiveByteArrayBlobType")
    @Lob
    @Column(name = "content")
    byte[] content;
}
