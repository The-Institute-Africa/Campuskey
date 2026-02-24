package com.campuskey.backend.entities;

public class Admin {

    private String name;
    private String contact;
    private String address;

    public Admin(){}

    public Admin(String name,String contact , String address){
        this.name=name;
        this.contact=contact;
        this.address=address;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public void setContact(String contact){
        this.contact=contact;
    }

    public String getContact (){
        return contact;
    }

    public void setAddress(String address){
        this.address=address;
    }

    public String getAddress(){
        return address;
    }
}
