package com.campuskey.backend.services;

import com.campuskey.backend.dto.LandlordDto;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.repositories.LandlordRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LandlordService {
    private final LandlordRepository landlordRepository;

    @Autowired
    public LandlordService(LandlordRepository landlordRepository){
        this.landlordRepository = landlordRepository;
    }

    public List<LandlordDto> getLandlords(){
        return landlordRepository.findAll().stream()
                .map(LandlordDto::new)
                .collect(Collectors.toList());
    }

    public void addLandlord (Landlord landlord) throws IllegalAccessException{
        Optional<Landlord> landlordOptional = landlordRepository.findByContact(
                landlord.getContact());
        if(landlordOptional.isPresent()){
            throw new IllegalAccessException("Landlord Already exists");
        }
        else{
            landlordRepository.save(landlord);
        }
    }

    @Transactional
    public void updatingLandlord(String slug, String name , Integer contact){
        Landlord landlord = landlordRepository.findBySlug(slug).orElseThrow(() -> new IllegalStateException(
                "Landlord does not exist"
        ));
        if(name != null && !name.isEmpty() && !Objects.equals(landlord.getName(),name ) ){
            landlord.setName(name);
        }
        if( contact != null && contact.longValue() > 0  &&  !Objects.equals(landlord.getContact(),contact)){
            landlord.setContact(contact);
        }
    }
    public void deleteLandlord(Long landlordId) throws IllegalAccessException {
        boolean exists = landlordRepository.existsById(landlordId);
        if (!exists) {
            throw new IllegalAccessException("Property does not exist");
        }
        else{
            landlordRepository.deleteById(landlordId);
        }
    }


}
