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
    messagesId: string[];
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
    messagesId: string[];
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
// По умолчанию все чаты отображаются во вкладке all, и если указан параметр groupName,
// то чат дублируется в указанной группе
export type Chat = {
  members: ChatMember[];
  createdAt: number;
  isMuted: boolean;
  customChatName?: string;
  groupName?: string; // Если groupName не указан он будет отображен во вкладке all, иначе он будет указан и там и там.
  updatedAt?: number;
};
export type DocChat = DocData<Chat>;
export type DocMessage = DocData<Message>;
