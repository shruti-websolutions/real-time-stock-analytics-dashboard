'use client';

import React from 'react';
import { ResearchPanel } from './research-panel';
import { useResearchStore } from '@/stores/useResearchStore';
import { Sparkles, X } from 'lucide-react';

export const ResearchContainer: React.FC = () => {
    const { isOpen, setIsOpen } = useResearchStore();

    return (
        <>
            {/* Desktop Docked Sidebar (lg and above) */}
            <div className="hidden lg:flex shrink-0 h-full">
                <ResearchPanel />
            </div>

            {/* Mobile / Tablet Floating Trigger Button */}
            <div className="lg:hidden fixed bottom-6 right-5 z-40">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow-xl hover:shadow-blue-500/25 active:scale-95 transition-all cursor-pointer border border-white/20"
                    aria-label="Open financial research assistant"
                >
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>Research AI</span>
                </button>
            </div>

            {/* Mobile / Tablet Slide-over Drawer */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="relative ml-auto w-full max-w-md h-full bg-[#101218] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
                        {/* Close button for mobile */}
                        <div className="absolute top-3 right-14 z-20">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Close panel"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <ResearchPanel className="border-l-0" />
                    </div>
                </div>
            )}
        </>
    );
};

export default ResearchContainer;
