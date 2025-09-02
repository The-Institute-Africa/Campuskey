package com.campuskey.backend.controllers;

import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.services.landlordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/campuskey/landlord")
public class landlordController {

    private final landlordService landlordService;

    @Autowired
    public landlordController(landlordService landlordService){
        this.landlordService = landlordService;
    }

    @GetMapping
    public List<Landlord> getLandlord(){
        return landlordService.getLandlords();
    }
    @DeleteMapping("{landlordId}")
    public void deleteLandlord(@PathVariable Long landlordId) throws IllegalAccessException{
        landlordService.deleteLandlord(landlordId);
    }
    @PostMapping
    public void addLandlord(@RequestBody Landlord landlord) throws IllegalAccessException{
        landlordService.addLandlord(landlord);
    }

    @PutMapping
    public void updateLandlord(
            @PathVariable("landlordId") long landlordId,
            @RequestParam(required = false) String name,
            @RequestParam (required = false) Integer contact){

        landlordService.updatingLandlord(landlordId, name, contact);
    }

}
