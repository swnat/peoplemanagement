package com.swnat.controller;

import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("/api/v1/uploads")
public class UploadController {

    //Save the uploaded file to this folder
    private static String UPLOADED_FOLDER = "/home/elena/Documents/ImagenesPeopleManagement/";

    @PostMapping("/upload") //new annotation since 4.3
    public String singleFileUpload(@RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            //redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "redirect:uploadStatus";
        }
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
        try {
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + sdf.format(timestamp) +file.getOriginalFilename());
            Files.write(path, bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return UPLOADED_FOLDER + sdf.format(timestamp) +file.getOriginalFilename();
    }

    @GetMapping(value = "/{getImages}", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getImageWithMediaType(@PathVariable("getImages") String image) throws IOException {
        String path = File.separator + "com" + File.separator + "swnat" + File.separator + "profile_images" 
        + File.separator + image;
        InputStream in = getClass().getResourceAsStream(path);
        return IOUtils.toByteArray(in);
    }
}