package com.webpilot.entity;

import com.webpilot.entity.enums.BrowserStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BrowserSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionId;

    @Enumerated(EnumType.STRING)
    private BrowserStatus status;

}