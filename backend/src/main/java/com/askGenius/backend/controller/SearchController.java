package com.askGenius.backend.controller;

import com.askGenius.backend.service.SearchService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService){
        this.searchService = searchService;
    }

    @PostMapping("/new")
    public Map<String, Object> newConversation(@RequestBody Map<String, String> request) {
        UUID conversationId = UUID.randomUUID();

        String response = searchService.search(
                request.get("query"),
                conversationId
        );

        return Map.of(
                "conversationId", conversationId,
                "response", response
        );
    }

    @PostMapping("/{conversationId}/message")
    public Map<String, Object> sendMessage(
            @PathVariable UUID conversationId,
            @RequestBody Map<String, String> request) {

        String response = searchService.search(
                request.get("query"),
                conversationId
        );

        return Map.of(
                "conversationId", conversationId,
                "response", response
        );
    }

}
