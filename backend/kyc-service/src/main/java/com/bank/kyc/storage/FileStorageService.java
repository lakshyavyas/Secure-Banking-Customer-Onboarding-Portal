package com.bank.kyc.storage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    private static final String PAN_FOLDER = "uploads/pan/";

    private static final String AADHAAR_FOLDER = "uploads/aadhaar/";

    public String savePanFile(
            MultipartFile file,
            Long userId) throws IOException {

        return saveFile(file, userId, "PAN", PAN_FOLDER);
    }

    public String saveAadhaarFile(
            MultipartFile file,
            Long userId) throws IOException {

        return saveFile(file, userId, "AADHAAR", AADHAAR_FOLDER);
    }

    private String saveFile(
            MultipartFile file,
            Long userId,
            String prefix,
            String folder)
            throws IOException {

        String originalName =
                file.getOriginalFilename();

        String extension =
                originalName.substring(
                        originalName.lastIndexOf('.'));

        String fileName =
                prefix + "_"
                + userId + "_"
                + System.currentTimeMillis()
                + extension;

        Path path =
                Paths.get(folder);

        Files.createDirectories(path);

        Files.copy(
                file.getInputStream(),
                path.resolve(fileName));

        return fileName;
    }
}
