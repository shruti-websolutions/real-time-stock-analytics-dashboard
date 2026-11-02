'use client';

import React from 'react';
import { useResearchStore } from '@/stores/useResearchStore';
import { Clock, Trash2, MessageSquare, Plus, X } from 'lucide-react';

export const ResearchHistoryDialog: React.FC = () => {
    const {
        historyDrawerOpen,
        setHistoryDrawerOpen,
        sessions,
        loadSession,
        deleteSession,
        resetChat,
        activeSessionId,
    } = useResearchStore();

    if (!historyDrawerOpen) return null;

    return (
        <div className="absolute inset-0 z-30 bg-[#101218]/95 backdrop-blur-md flex flex-col p-4 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-white font-medium text-[15px]">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <span>Research History</span>
                </div>
                <button
                    type="button"
                    onClick={() => setHistoryDrawerOpen(false)}
                    className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close history"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* New Session Button */}
            <div className="py-3">
                <button
                    type="button"
                    onClick={() => {
                        resetChat();
                        setHistoryDrawerOpen(false);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-[13px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>Start New Conversation</span>
                </button>
            </div>

            {/* List of Sessions */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {sessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-zinc-500 text-[13px]">
                        <MessageSquare className="w-8 h-8 mb-2 opacity-40" />
                        <p>No past research sessions yet</p>
                    </div>
                ) : (
                    sessions.map((session) => {
                        const isActive = session.id === activeSessionId;
                        return (
                            <div
                                key={session.id}
                                className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                                    isActive
                                        ? 'bg-white/10 border-white/20 text-white'
                                        : 'bg-[#171920] border-white/5 text-zinc-300 hover:text-white hover:bg-[#20232d]'
                                }`}
                                onClick={() => loadSession(session.id)}
                            >
                                <div className="flex-1 min-w-0 pr-2">
                                    <h4 className="text-[13px] font-medium truncate">
                                        {session.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500">
                                        <span>
                                            {new Date(session.createdAt).toLocaleDateString([], {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                        <span>•</span>
                                        <span>{session.messages.length} messages</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteSession(session.id);
                                    }}
                                    title="Delete session"
                                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-rose-500/20 hover:text-rose-400 text-zinc-500 transition-all cursor-pointer"
                                    aria-label="Delete session"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
