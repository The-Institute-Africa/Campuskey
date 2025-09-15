package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.LandlordDto;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.services.LandlordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/campuskey")
public class LandlordController {

    private final LandlordService landlordService;

    @Autowired
    public LandlordController(LandlordService landlordService){
        this.landlordService = landlordService;
    }

    @GetMapping("/landlords")
    public List<LandlordDto> getLandlord(){
        return landlordService.getLandlords();
    }

    @DeleteMapping("/landlord/delete/{slug}")
    public void deleteLandlord(@PathVariable Long landlordId) throws IllegalAccessException{
        landlordService.deleteLandlord(landlordId);
    }
    @PostMapping("/landlord/create")
    public void addLandlord(@RequestBody Landlord landlord) throws IllegalAccessException{
        landlordService.addLandlord(landlord);
    }

    @PutMapping("/landlord/update/{slug}")
    public void updateLandlord(
            @PathVariable String slug,
            @RequestParam(required = false) String name,
            @RequestParam (required = false) Integer contact){

        landlordService.updatingLandlord(slug, name, contact);
    }

}
