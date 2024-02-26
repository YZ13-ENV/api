import { Attachment, DocData } from ".";
export type Message = {
    attachment: Attachment[];
    authorId: string;
    text: string;
    isReaded: boolean;
    createdAt: number;
    editedAt?: number;
    deliveredAt?: number;
    from?: {
        chatId: string;
        messagesId: [];
    };
    answer?: {
        chatId: string;
        messageId: string;
    };
};
export type MessageScratch = {
    attachment: Attachment[];
    authorId: string;
    text: string;
    isReaded: boolean;
    createdAt: number;
    from?: {
        chatId: string;
        messagesId: [];
    };
    answer?: {
        chatId: string;
        messageId: string;
    };
};
export type ChatMember = {
    memberId: string;
    isOnline: boolean;
    isTyping?: string;
    customName?: string;
    isSendAttachment?: boolean;
    lastTimeOnline?: number;
};
export type ChatScratch = {
    members: ChatMember[];
};
export type Chat = {
    members: ChatMember[];
    createdAt: number;
    isMuted: boolean;
    customChatName?: string;
    groupName?: string;
    updatedAt?: number;
};
export type DocChat = DocData<Chat>;
export type DocMessage = DocData<Message>;
