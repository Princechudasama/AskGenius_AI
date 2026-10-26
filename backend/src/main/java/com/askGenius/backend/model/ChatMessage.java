package com.askGenius.backend.model;

import com.askGenius.backend.enums.MessageRole;
import jakarta.persistence.*;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "chat_messages", indexes = {
        @Index(name = "idx_chat_messages_conversation_id_created_at", columnList = "conversation_id, created_at, id")})
public class ChatMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "conversation_id", nullable = false)
    private UUID conversationId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MessageRole role;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    public ChatMessage() {
    }

    public ChatMessage(UUID conversationId, MessageRole role, String message) {
        this.conversationId = conversationId;
        this.role = role;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public UUID getConversationId() {
        return conversationId;
    }

    public void setConversationId(UUID conversationId) {
        this.conversationId = conversationId;
    }

    public MessageRole getRole() {
        return role;
    }

    public void setRole(MessageRole role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

}
