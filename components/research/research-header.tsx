'use client';

import React from 'react';
import { SquarePen, SlidersHorizontal, Maximize2, Minimize2 } from 'lucide-react';
import { useResearchStore } from '@/stores/useResearchStore';

interface ResearchHeaderProps {
    className?: string;
}

export const ResearchHeader: React.FC<ResearchHeaderProps> = ({ className = '' }) => {
    const {
        resetChat,
        toggleHistoryDrawer,
        historyDrawerOpen,
        isExpanded,
        toggleExpanded,
        messages,
    } = useResearchStore();

    return (
        <div className={`flex items-center justify-between py-3 px-4 select-none ${className}`}>
            {/* Left: Title */}
            <h2 className="text-[20px] font-semibold text-white tracking-tight">
                Research
            </h2>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
                {/* New Chat */}
                <button
                    type="button"
                    onClick={resetChat}
                    title="New research chat"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-150 relative cursor-pointer"
                    aria-label="New chat"
                >
                    <SquarePen className="w-[18px] h-[18px]" strokeWidth={2} />
                    {messages.length > 0 && (
                        <span className="sr-only">Start new chat</span>
                    )}
                </button>

                {/* History / Sessions Menu */}
                <button
                    type="button"
                    onClick={toggleHistoryDrawer}
                    title="Research history"
                    className={`p-1.5 rounded-lg transition-all duration-150 active:scale-95 cursor-pointer ${
                        historyDrawerOpen
                            ? 'text-white bg-white/15'
                            : 'text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                    aria-label="Research history"
                >
                    <SlidersHorizontal className="w-[18px] h-[18px]" strokeWidth={2} />
                </button>

                {/* Expand / Minimize */}
                <button
                    type="button"
                    onClick={toggleExpanded}
                    title={isExpanded ? 'Collapse research panel' : 'Expand research panel'}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-150 cursor-pointer"
                    aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
                >
                    {isExpanded ? (
                        <Minimize2 className="w-[18px] h-[18px]" strokeWidth={2} />
                    ) : (
                        <Maximize2 className="w-[18px] h-[18px]" strokeWidth={2} />
                    )}
                </button>
            </div>
        </div>
    );
};
