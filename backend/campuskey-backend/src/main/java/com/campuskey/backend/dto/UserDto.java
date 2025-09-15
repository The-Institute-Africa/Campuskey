package com.campuskey.backend.dto;

import com.campuskey.backend.entities.Role;
import jakarta.persistence.*;

public class UserDto {

        private Long id;
        private String email;
        private String password;
        private String status;
        private String username;
        private Role role;

        public UserDto(){}

        public UserDto(Long id , String email ,String username, String password , String status , Role role){
            this.id=id;
            this.email=email;
            this.username=username;
            this.password=password;
            this.status = status;
            this.role = role;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public Role getRole() {
            return role;
        }

        public void setRole(Role role) {
            this.role = role;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

}


