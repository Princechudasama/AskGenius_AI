package com.askGenius.backend.service;

import com.askGenius.backend.Repository.MessageRepository;
import com.askGenius.backend.enums.MessageRole;
import com.askGenius.backend.model.ChatMessage;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SearchService {

    private final ChatClient chatClient;
    private final MessageRepository messageRepository;

    public SearchService(
            ChatClient.Builder builder,
            MessageRepository messageRepository
    ) {
        this.chatClient = builder.build();
        this.messageRepository = messageRepository;
    }

    private static final String SYSTEM_PROMPT =
    """
    You are AskGenius, an intelligent, friendly, and reliable
    educational AI assistant.

    Help users solve everyday doubts, understand school and
    college subjects, explore general knowledge, and solve
    technical problems.

    Adapt your explanations to the user's knowledge level.
    Use simple language for beginners, examples when useful,
    and step-by-step reasoning for problems that require it.

    Give direct, accurate answers. Be honest about uncertainty.
    Use conversation history to understand follow-up questions.
    Do not fabricate facts or claim to have verified information
    when you have not.

    Adjust your response length and format to the user's request.
    Your goal is to make knowledge accessible and understandable.
    """;

    public String search(String query, UUID conversationId) {

        // Save the user's message
        ChatMessage userMessage = new ChatMessage(
                conversationId,
                MessageRole.USER,
                query
        );

        messageRepository.save(userMessage);

        // Retrieve the conversation history
        List<ChatMessage> history =
                messageRepository
                        .findByConversationIdOrderByCreatedAtAscIdAsc(conversationId);

        // Convert the history into Spring AI messages
        List<Message> messages = new ArrayList<>();

        for (ChatMessage chatMessage : history) {
            if (chatMessage.getRole() == MessageRole.USER) {
                messages.add(new UserMessage(chatMessage.getMessage()));
            } else {
                messages.add(new AssistantMessage(chatMessage.getMessage()));
            }
        }

        // Send the conversation history to the LLM
        String output = chatClient.prompt()
                .system(SYSTEM_PROMPT)
                .messages(messages)
                .call()
                .content();

        // Save the assistant's response
        ChatMessage assistantMessage = new ChatMessage(
                conversationId,
                MessageRole.ASSISTANT,
                output
        );

        messageRepository.save(assistantMessage);

        return output;
    }
}