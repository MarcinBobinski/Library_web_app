package com.example.library.domain;

import com.example.library.adapter.postgresql.images.Image;
import com.example.library.adapter.postgresql.images.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    @Autowired ImageRepository imageRepository;

    public Long addImage(byte[] content){
        Image image = new Image();
        image.setContent(content);
        return imageRepository.save(image).getId();
    }

    public Image fetchImage(Long id) throws Exception {
        return imageRepository.findById(id).orElseThrow(Exception::new);
    }

    public byte[] fetchImageContent(Long id) throws Exception {
        return fetchImage(id).getContent();
    }

    public void deleteImage(Long id){
        imageRepository.deleteById(id);
    }
}
