'use client';

import React, { useCallback } from 'react';
import { ResearchHeader } from './research-header';
import { ResearchWelcome } from './research-welcome';
import { ResearchChatView } from './research-chat-view';
import { ResearchInput } from './research-input';
import { ResearchFooter } from './research-footer';
import { ResearchHistoryDialog } from './research-history-dialog';
import { useResearchStore } from '@/stores/useResearchStore';
import { getSimulatedResponse } from './mock-data';
import { ChatMessage } from './types';

interface ResearchPanelProps {
    className?: string;
    onClose?: () => void;
}

export const ResearchPanel: React.FC<ResearchPanelProps> = ({ className = '' }) => {
    const {
        messages,
        setMessages,
        addMessage,
        currentInput,
        setCurrentInput,
        isStreaming,
        setIsStreaming,
        isExpanded,
        saveCurrentSession,
    } = useResearchStore();

    const handleSendMessage = useCallback(
        async (queryText: string) => {
            if (!queryText.trim() || isStreaming) return;

            const userMessage: ChatMessage = {
                id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                role: 'user',
                content: queryText,
                timestamp: new Date(),
            };

            addMessage(userMessage);
            setCurrentInput('');
            setIsStreaming(true);

            // Simulate realistic AI generation with rich financial analysis
            setTimeout(() => {
                const simulatedData = getSimulatedResponse(queryText);
                const assistantMessage: ChatMessage = {
                    id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                    role: 'assistant',
                    content: simulatedData.content,
                    timestamp: new Date(),
                    citations: simulatedData.citations,
                    relatedTickers: simulatedData.relatedTickers,
                    suggestedFollowUps: simulatedData.suggestedFollowUps,
                };

                addMessage(assistantMessage);
                setIsStreaming(false);

                // Auto-save session
                setTimeout(() => {
                    saveCurrentSession();
                }, 100);
            }, 850);
        },
        [isStreaming, addMessage, setCurrentInput, setIsStreaming, saveCurrentSession]
    );

    const handleRegenerate = useCallback(() => {
        if (messages.length === 0 || isStreaming) return;
        const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
        if (lastUserMessage) {
            handleSendMessage(lastUserMessage.content);
        }
    }, [messages, isStreaming, handleSendMessage]);

    const hasMessages = messages.length > 0;

    return (
        <aside
            className={`relative flex flex-col h-full bg-[#101218] border-l border-white/[0.08] select-text transition-all duration-300 ease-in-out overflow-hidden ${
                isExpanded ? 'w-full lg:w-[560px] xl:w-[620px]' : 'w-full lg:w-[380px] xl:w-[410px]'
            } ${className}`}
        >
            {/* Header */}
            <ResearchHeader className="shrink-0 border-b border-white/[0.04]" />

            {/* History Overlay Drawer */}
            <ResearchHistoryDialog />

            {/* Scrollable Main Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pt-3">
                {!hasMessages ? (
                    <ResearchWelcome onSelectPrompt={handleSendMessage} />
                ) : (
                    <ResearchChatView
                        messages={messages}
                        isStreaming={isStreaming}
                        onSelectFollowUp={handleSendMessage}
                        onRegenerate={handleRegenerate}
                    />
                )}
            </div>

            {/* Sticky Bottom Area: Input + Footer */}
            <div className="shrink-0 px-4 pt-2 pb-1 bg-gradient-to-t from-[#101218] via-[#101218] to-transparent">
                <ResearchInput
                    value={currentInput}
                    onChange={setCurrentInput}
                    onSubmit={handleSendMessage}
                    isLoading={isStreaming}
                    placeholder="Ask anything"
                />
                <ResearchFooter />
            </div>
        </aside>
    );
};

export default ResearchPanel;
