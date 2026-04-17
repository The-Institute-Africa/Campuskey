package com.campuskey.backend.modules.auth.controller;

import com.campuskey.backend.modules.auth.dto.AuthAuditEventAdminDto;
import com.campuskey.backend.modules.auth.dto.AuthAuditEventFilter;
import com.campuskey.backend.modules.auth.services.AuthAuditQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/campuskey/admin/auth-audit")
@RequiredArgsConstructor
public class AdminAuthAuditController {

    private final AuthAuditQueryService authAuditQueryService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Page<AuthAuditEventAdminDto> listAuditEvents(@ModelAttribute AuthAuditEventFilter filter,
                                                         Pageable pageable) {
        return authAuditQueryService.findAuditEvents(filter, pageable);
    }
}

