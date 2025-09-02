package com.campuskey.backend.entities;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;



import jakarta.persistence.ManyToMany;

@Entity
@Table(name="Amenity")
public class Amenity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "amenities")
    private  List<Property> properties = new ArrayList<>();

    public Amenity() {}

    public Amenity(Long id, String name){
        this.id=id;
        this.name=name;
    }
    
    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}

    public String getName(){return name;}
    public void setName(String name){this.name=name;}

    public String toString(){
        return String.format(
            "Amenity[id=%id,name='%s']"
        );
    }

}
