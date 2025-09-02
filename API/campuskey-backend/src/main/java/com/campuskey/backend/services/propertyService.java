package com.campuskey.backend.services;

import com.campuskey.backend.entities.Property;
import com.campuskey.backend.repositories.propertyRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class propertyService {
    private final propertyRepositories propertyRepository;
    @Autowired
    public propertyService(propertyRepositories propertyRepository){
        this.propertyRepository = propertyRepository;
    }

    public List<Property> getProperties(){
        return propertyRepository.findAll();
    }

    public void addProperty(Property property) throws IllegalAccessException{
        Optional<Property> propertyOptional = propertyRepository.findByName(
                property.getName()
        );
        if ( propertyOptional.isPresent()){
            throw new IllegalAccessException("Already exists");
        }
        else{
            propertyRepository.save(property);
        }

    }

    public void deleteProperty(Long propertyId ) throws IllegalAccessException{
        boolean exists = propertyRepository.existsById(propertyId);
        if(!exists){
            throw new IllegalAccessException("Property Already exists");
        }
        else{
            propertyRepository.deleteById(propertyId);
        }

    }
    /*@Transactional
    public void updateProperty(Long propertyId,String name, Integer price){

    }*/
}
