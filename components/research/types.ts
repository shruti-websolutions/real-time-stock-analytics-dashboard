export type MessageRole = 'user' | 'assistant' | 'system';

export interface Citation {
    title: string;
    source: string;
    url?: string;
    date?: string;
}

export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
    citations?: Citation[];
    relatedTickers?: string[];
    suggestedFollowUps?: string[];
    isStreaming?: boolean;
}

export interface PromptSuggestion {
    id: string;
    text: string;
    category?: 'market' | 'macro' | 'tech' | 'sector';
}

export interface QuickAction {
    id: string;
    label: string;
    iconType: 'plus' | 'task' | 'search' | 'chart';
    promptText: string;
}

export interface ResearchSession {
    id: string;
    title: string;
    createdAt: Date;
    messages: ChatMessage[];
}
