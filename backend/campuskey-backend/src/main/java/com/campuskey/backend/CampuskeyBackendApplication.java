package com.campuskey.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@SpringBootApplication
public class CampuskeyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampuskeyBackendApplication.class, args);
	}

    @Bean
    public WebMvcConfigurer webMvcConfigurer(
            @Value("${campuskey.uploads.directory:uploads}") String uploadDirectory) {
        Path uploadRoot = Path.of(uploadDirectory).toAbsolutePath().normalize();
        return new WebMvcConfigurer() {
            // Static resource handler for uploaded images
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                registry.addResourceHandler("/uploads/propertyImages/**")
                        .addResourceLocations(uploadRoot.resolve("propertyImages").toUri() + "/");
                registry.addResourceHandler("/uploads/propertyVideos/**")
                        .addResourceLocations(uploadRoot.resolve("propertyVideos").toUri() + "/");
            }
        };


    }
}
