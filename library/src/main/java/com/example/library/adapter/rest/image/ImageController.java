package com.example.library.adapter.rest.image;

import com.example.library.adapter.postgresql.images.ImageRepository;
import com.example.library.adapter.rest.image.dto.UploadImageRequest;
import com.example.library.domain.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    ImageService imageService;

    @PostMapping("/upload")
    ResponseEntity<Long> uploadImage(@RequestBody UploadImageRequest request){
        return ResponseEntity.ok(imageService.addImage(request.getContent()));
    }

    @GetMapping(value = "/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
    Resource downloadImage(@PathVariable Long imageId){
        try{
            byte[] image = imageService.fetchImage(imageId);
            return new ByteArrayResource(image);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
