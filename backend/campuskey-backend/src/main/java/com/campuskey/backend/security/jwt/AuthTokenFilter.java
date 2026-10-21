package com.campuskey.backend.security.jwt;


import com.campuskey.backend.security.services.UserDetailsServiceImpl;
import com.campuskey.backend.security.services.UserDetailsImpl;
import com.campuskey.backend.entities.enumerations.AccountState;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.StringUtils;

import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return StringUtils.hasText(path) && path.startsWith("/api/v1/campuskey/auth/public/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        logger.debug("AuthTokenFilter called for URI: {}", request.getRequestURI());
        try {
            String jwt = parseJwt(request);
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails,
                                null,
                                userDetails.getAuthorities());
                logger.debug("Roles from JWT: {}", userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                if (userDetails instanceof UserDetailsImpl account
                        && account.getAccountState() != AccountState.ACTIVE
                        && !isAccountManagementRequest(request)) {
                    response.setStatus(423);
                    response.setContentType("application/json");
                    response.getWriter().write("{\"message\":\"This account is "
                            + account.getAccountState().name().toLowerCase()
                            + ". Manage your account profile to continue.\"}");
                    return;
                }
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private boolean isAccountManagementRequest(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.equals("/api/v1/campuskey/profile/me")
                || path.equals("/api/v1/campuskey/auth/me")
                || path.equals("/api/v1/campuskey/account/suspend")
                || path.equals("/api/v1/campuskey/account/reactivate")
                || path.equals("/api/v1/campuskey/account/delete");
    }

    private String parseJwt(HttpServletRequest request) {
        return jwtUtils.getJwtFromHeader(request);
    }
}
