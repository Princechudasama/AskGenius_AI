CREATE TABLE chat_messages (
                               id BIGSERIAL PRIMARY KEY,
                               conversation_id UUID NOT NULL,
                               role VARCHAR(20) NOT NULL,
                               message TEXT NOT NULL,
                               created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                               ```
                               CONSTRAINT chk_chat_messages_role
                                   CHECK (role IN ('USER', 'ASSISTANT'))
                               ```

);

CREATE INDEX idx_chat_messages_conversation_id_created_at
    ON chat_messages (conversation_id, created_at, id);
