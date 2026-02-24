package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.LandlordDto;
import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.UserRepository;
import com.campuskey.backend.services.LandlordService;
import com.campuskey.backend.services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("api/v1/campuskey")
public class LandlordController {

    private final LandlordService landlordService;
    private final PropertyService propertyService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LandlordRepository landlordRepository;

    @Autowired
    public LandlordController(LandlordService landlordService ,
                              PropertyService propertyService
                              ){
        this.landlordService = landlordService;
        this.propertyService=propertyService;

    }

    @GetMapping("admin/landlords")
    public List<LandlordDto> getLandlord(){
        return landlordService.getLandlords();
    }

    @DeleteMapping("/landlord/delete/{slug}")
    public void deleteLandlord(@PathVariable Long landlordId) throws IllegalAccessException{
        landlordService.deleteLandlord(landlordId);
    }
    @PostMapping("landlord/create")
    public void addLandlord(@RequestBody Landlord landlord ,
                            @AuthenticationPrincipal UserDetails userDetails) throws IllegalAccessException{

        String username = userDetails.getUsername();

        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        landlord.setOwnerUsername(username);
        landlord.setUser(user);

        landlordRepository.save(landlord);
    }

    @PutMapping("/landlord/update/{slug}")
    public void updateLandlord(
            @PathVariable String slug,
            @RequestParam(required = false) String name,
            @RequestParam (required = false) BigInteger contact,
            @RequestParam (required = false) String idNumber ,
            @RequestParam (required = false) String address){

        landlordService.updatingLandlord(slug, name,address,idNumber, contact);
    }



}
