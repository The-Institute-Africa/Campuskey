package com.campuskey.backend.modules.users.entity;
import com.campuskey.backend.entities.enumerations.AppRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Version;
@Entity
@Table(name = "roles", uniqueConstraints = {
        @UniqueConstraint(columnNames = "role_name")
})
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;
    @Enumerated(EnumType.STRING)
    @Column(name = "role_name", nullable = false, length = 50)
    private AppRole roleName;
    @Version
    private Long version;
    public Role() {
    }
    public Role(AppRole roleName) {
        this.roleName = roleName;
    }
    public Long getRoleId() {
        return roleId;
    }
    public AppRole getRoleName() {
        return roleName;
    }
    public void setRoleName(AppRole roleName) {
        this.roleName = roleName;
    }
}
