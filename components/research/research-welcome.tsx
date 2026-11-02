'use client';

import React from 'react';
import { Sparkles, Plus, CheckCircle2, Globe, TrendingUp } from 'lucide-react';
import { INITIAL_PROMPT_SUGGESTIONS, EXPLORE_ACTIONS } from './mock-data';
import { QuickAction } from './types';
import { useAuthStore } from '@/stores/useAuthStore';

interface ResearchWelcomeProps {
    onSelectPrompt: (promptText: string) => void;
}

export const ResearchWelcome: React.FC<ResearchWelcomeProps> = ({ onSelectPrompt }) => {
    const user = useAuthStore((state) => state.user);

    // Get first name or default to 'Shruti' as depicted in reference design
    const firstName = user?.name ? user.name.split(' ')[0] : 'Shruti';

    const renderActionIcon = (iconType: QuickAction['iconType']) => {
        switch (iconType) {
            case 'plus':
                return <Plus className="w-4 h-4 text-zinc-300 shrink-0" strokeWidth={2.2} />;
            case 'task':
                return <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0" strokeWidth={2} />;
            case 'search':
                return <Globe className="w-4 h-4 text-zinc-300 shrink-0" strokeWidth={2} />;
            case 'chart':
                return <TrendingUp className="w-4 h-4 text-zinc-300 shrink-0" strokeWidth={2} />;
        }
    };

    return (
        <div className="flex flex-col px-4 pt-2 pb-6 space-y-6 animate-in fade-in duration-300">
            {/* Greeting */}
            <div>
                <h1 className="text-[19px] font-medium text-white tracking-tight leading-snug">
                    Hi {firstName}, ask any financial question
                </h1>
            </div>

            {/* Prompt Suggestion Cards */}
            <div className="flex flex-col space-y-2.5">
                {INITIAL_PROMPT_SUGGESTIONS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelectPrompt(item.text)}
                        className="group flex items-center justify-between w-full px-4 py-3.5 bg-[#171920] hover:bg-[#20232d] border border-white/[0.06] hover:border-white/[0.14] rounded-2xl text-left transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.99]"
                    >
                        <span className="text-[13.5px] leading-snug text-zinc-200 group-hover:text-white font-normal pr-3">
                            {item.text}
                        </span>
                        <Sparkles className="w-4 h-4 text-zinc-400 group-hover:text-zinc-100 transition-colors shrink-0" />
                    </button>
                ))}
            </div>

            {/* Explore what's possible section */}
            <div className="pt-2">
                <h3 className="text-[13.5px] text-zinc-400 font-medium mb-3">
                    Explore what&apos;s possible
                </h3>

                <div className="flex flex-col items-start gap-2.5">
                    {EXPLORE_ACTIONS.map((action) => (
                        <button
                            key={action.id}
                            type="button"
                            onClick={() => onSelectPrompt(action.promptText)}
                            className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#171920] hover:bg-[#20232d] border border-white/[0.08] hover:border-white/[0.16] rounded-full text-[13px] text-zinc-200 hover:text-white transition-all duration-200 cursor-pointer shadow-2xs active:scale-98"
                        >
                            {renderActionIcon(action.iconType)}
                            <span className="font-normal">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
