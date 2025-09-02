package com.campuskey.backend.services;

import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.repositories.landlordRepositories;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class landlordService {
    private final landlordRepositories landlordRepositories ;

    @Autowired
    public landlordService(landlordRepositories landlordRepositories){
        this.landlordRepositories = landlordRepositories;
    }

    public List<Landlord> getLandlords(){
        return landlordRepositories.findAll();
    }

    public void addLandlord (Landlord landlord) throws IllegalAccessException{
        Optional<Landlord> landlordOptional = landlordRepositories.findByContact(
                landlord.getContact());
        if(landlordOptional.isPresent()){
            throw new IllegalAccessException("Landlord Already exists");
        }
        else{
            landlordRepositories.save(landlord);
        }
    }

    @Transactional
    public void updatingLandlord(Long landlordId, String name , Integer contact){
        Landlord landlord = landlordRepositories.findById(landlordId).orElseThrow(() -> new IllegalStateException(
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
        boolean exists = landlordRepositories.existsById(landlordId);
        if (!exists) {
            throw new IllegalAccessException("Property does not exist");
        }
        else{
            landlordRepositories.deleteById(landlordId);
        }
    }


}
