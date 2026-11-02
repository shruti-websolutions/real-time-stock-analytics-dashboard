import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, ResearchSession } from '@/components/research/types';

interface ResearchStore {
    isOpen: boolean;
    isExpanded: boolean;
    currentInput: string;
    activeSessionId: string | null;
    sessions: ResearchSession[];
    messages: ChatMessage[];
    isStreaming: boolean;
    historyDrawerOpen: boolean;

    // Actions
    setIsOpen: (isOpen: boolean) => void;
    toggleOpen: () => void;
    setIsExpanded: (isExpanded: boolean) => void;
    toggleExpanded: () => void;
    setCurrentInput: (input: string) => void;
    setMessages: (messages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
    addMessage: (message: ChatMessage) => void;
    setIsStreaming: (isStreaming: boolean) => void;
    setHistoryDrawerOpen: (open: boolean) => void;
    toggleHistoryDrawer: () => void;
    resetChat: () => void;
    loadSession: (sessionId: string) => void;
    saveCurrentSession: () => void;
    deleteSession: (sessionId: string) => void;
}

export const useResearchStore = create<ResearchStore>()(
    persist(
        (set, get) => ({
            isOpen: true,
            isExpanded: false,
            currentInput: '',
            activeSessionId: null,
            sessions: [],
            messages: [],
            isStreaming: false,
            historyDrawerOpen: false,

            setIsOpen: (isOpen) => set({ isOpen }),
            toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),

            setIsExpanded: (isExpanded) => set({ isExpanded }),
            toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),

            setCurrentInput: (currentInput) => set({ currentInput }),

            setMessages: (updater) =>
                set((state) => ({
                    messages: typeof updater === 'function' ? updater(state.messages) : updater,
                })),

            addMessage: (message) =>
                set((state) => {
                    const newMessages = [...state.messages, message];
                    return { messages: newMessages };
                }),

            setIsStreaming: (isStreaming) => set({ isStreaming }),

            setHistoryDrawerOpen: (historyDrawerOpen) => set({ historyDrawerOpen }),
            toggleHistoryDrawer: () =>
                set((state) => ({ historyDrawerOpen: !state.historyDrawerOpen })),

            resetChat: () => {
                const { messages, activeSessionId, sessions } = get();
                // If there were messages in current session, ensure it's saved in sessions list
                if (messages.length > 0) {
                    const sessionTitle =
                        messages.find((m) => m.role === 'user')?.content.slice(0, 40) ||
                        'Research Session';
                    const existingIndex = sessions.findIndex((s) => s.id === activeSessionId);

                    const currentSession: ResearchSession = {
                        id: activeSessionId || `session-${Date.now()}`,
                        title: sessionTitle,
                        createdAt: new Date(),
                        messages: [...messages],
                    };

                    const updatedSessions =
                        existingIndex >= 0
                            ? sessions.map((s, idx) => (idx === existingIndex ? currentSession : s))
                            : [currentSession, ...sessions];

                    set({
                        sessions: updatedSessions,
                        messages: [],
                        activeSessionId: null,
                        currentInput: '',
                        isStreaming: false,
                    });
                } else {
                    set({
                        messages: [],
                        activeSessionId: null,
                        currentInput: '',
                        isStreaming: false,
                    });
                }
            },

            loadSession: (sessionId) => {
                const { sessions } = get();
                const session = sessions.find((s) => s.id === sessionId);
                if (session) {
                    set({
                        activeSessionId: session.id,
                        messages: session.messages,
                        historyDrawerOpen: false,
                    });
                }
            },

            saveCurrentSession: () => {
                const { messages, activeSessionId, sessions } = get();
                if (messages.length === 0) return;

                const firstUserMsg = messages.find((m) => m.role === 'user');
                const title = firstUserMsg
                    ? firstUserMsg.content.slice(0, 36) + (firstUserMsg.content.length > 36 ? '...' : '')
                    : 'Financial Analysis';

                const newSessionId = activeSessionId || `session-${Date.now()}`;
                const existingIndex = sessions.findIndex((s) => s.id === newSessionId);

                const newSession: ResearchSession = {
                    id: newSessionId,
                    title,
                    createdAt: new Date(),
                    messages: [...messages],
                };

                const updatedSessions =
                    existingIndex >= 0
                        ? sessions.map((s, idx) => (idx === existingIndex ? newSession : s))
                        : [newSession, ...sessions.slice(0, 15)]; // keep up to 15 recent sessions

                set({
                    sessions: updatedSessions,
                    activeSessionId: newSessionId,
                });
            },

            deleteSession: (sessionId) =>
                set((state) => ({
                    sessions: state.sessions.filter((s) => s.id !== sessionId),
                    ...(state.activeSessionId === sessionId
                        ? { activeSessionId: null, messages: [] }
                        : {}),
                })),
        }),
        {
            name: 'research-chat-storage',
            partialize: (state) => ({
                sessions: state.sessions,
                isExpanded: state.isExpanded,
            }),
        }
    )
);
