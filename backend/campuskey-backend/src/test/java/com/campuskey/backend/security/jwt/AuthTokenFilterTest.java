package com.campuskey.backend.security.jwt;

import com.campuskey.backend.security.services.UserDetailsServiceImpl;
import com.campuskey.backend.security.services.UserDetailsImpl;
import com.campuskey.backend.entities.enumerations.AccountState;
import jakarta.servlet.FilterChain;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verifyNoInteractions;

import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@ExtendWith(MockitoExtension.class)
class AuthTokenFilterTest {

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserDetailsServiceImpl userDetailsService;

    @InjectMocks
    private AuthTokenFilter filter;

    @Test
    void skipsJwtParsingOnPublicAuthenticationEndpoints() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setServletPath("/api/v1/campuskey/auth/public/signin");
        request.addHeader("Authorization", "Bearer stale-or-malformed-token");
        MockHttpServletResponse response = new MockHttpServletResponse();
        FilterChain chain = mock(FilterChain.class);

        filter.doFilter(request, response, chain);

        verify(jwtUtils, never()).getJwtFromHeader(request);
        verify(jwtUtils, never()).validateJwtToken(org.mockito.ArgumentMatchers.anyString());
        verify(chain).doFilter(request, response);
    }

    @Test
    void suspendedAccountsCannotUseBusinessEndpointsButCanManageTheirAccount() throws Exception {
        UserDetailsImpl suspendedUser = new UserDetailsImpl(1L, "student", "student@example.test", "password",
                false, List.of(new SimpleGrantedAuthority("ROLE_STUDENT")), AccountState.SUSPENDED);
        when(jwtUtils.getJwtFromHeader(org.mockito.ArgumentMatchers.any())).thenReturn("token");
        when(jwtUtils.validateJwtToken("token")).thenReturn(true);
        when(jwtUtils.getUserNameFromJwtToken("token")).thenReturn("student");
        when(userDetailsService.loadUserByUsername("student")).thenReturn(suspendedUser);

        MockHttpServletRequest businessRequest = new MockHttpServletRequest();
        businessRequest.setServletPath("/api/v1/campuskey/student/inquiries");
        MockHttpServletResponse businessResponse = new MockHttpServletResponse();
        FilterChain businessChain = mock(FilterChain.class);
        filter.doFilter(businessRequest, businessResponse, businessChain);

        org.junit.jupiter.api.Assertions.assertEquals(423, businessResponse.getStatus());
        verify(businessChain, never()).doFilter(businessRequest, businessResponse);

        MockHttpServletRequest accountRequest = new MockHttpServletRequest();
        accountRequest.setServletPath("/api/v1/campuskey/account/reactivate");
        MockHttpServletResponse accountResponse = new MockHttpServletResponse();
        FilterChain accountChain = mock(FilterChain.class);
        filter.doFilter(accountRequest, accountResponse, accountChain);

        verify(accountChain).doFilter(accountRequest, accountResponse);
    }
}
