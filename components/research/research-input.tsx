'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Mic, Plus, ArrowUp, Loader2, Sparkles, Paperclip } from 'lucide-react';

interface ResearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (text: string) => void;
    isLoading?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

export const ResearchInput: React.FC<ResearchInputProps> = ({
    value,
    onChange,
    onSubmit,
    isLoading = false,
    disabled = false,
    placeholder = 'Ask anything',
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isListening, setIsListening] = useState(false);
    const [showContextAttach, setShowContextAttach] = useState(false);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(
                textareaRef.current.scrollHeight,
                120
            )}px`;
        }
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (!value.trim() || isLoading || disabled) return;
        onSubmit(value.trim());
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    // Simulated speech-to-text or webkitSpeechRecognition
    const handleToggleSpeech = () => {
        if (typeof window === 'undefined') return;

        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (SpeechRecognition) {
            try {
                if (isListening) {
                    setIsListening(false);
                    return;
                }
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onstart = () => setIsListening(true);
                recognition.onend = () => setIsListening(false);
                recognition.onerror = () => setIsListening(false);
                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    if (transcript) {
                        onChange(value ? `${value} ${transcript}` : transcript);
                    }
                    setIsListening(false);
                };
                recognition.start();
                return;
            } catch (err) {
                console.error(err);
            }
        }

        // Fallback simulated listening
        setIsListening(true);
        setTimeout(() => {
            const sampleVoiceQueries = [
                'How is Nifty Bank trending today compared to Nifty 50?',
                'Summarize the latest financial news for tech stocks',
                'What are the key resistance levels for crude oil?',
            ];
            const randomQuery =
                sampleVoiceQueries[Math.floor(Math.random() * sampleVoiceQueries.length)];
            onChange(value ? `${value} ${randomQuery}` : randomQuery);
            setIsListening(false);
        }, 1800);
    };

    const handleAddContext = (contextSnippet: string) => {
        onChange(value ? `${value}\n[Context: ${contextSnippet}] ` : `[Context: ${contextSnippet}] `);
        setShowContextAttach(false);
        textareaRef.current?.focus();
    };

    const hasInput = value.trim().length > 0;

    return (
        <div className="relative w-full">
            {/* Quick Context Attachment Popover */}
            {showContextAttach && (
                <div className="absolute bottom-[calc(100%+8px)] left-2 z-20 w-64 bg-[#1a1d26] border border-white/10 rounded-xl p-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-150">
                    <div className="text-[11px] font-medium text-zinc-400 px-2 py-1 uppercase tracking-wider">
                        Attach Market Context
                    </div>
                    <button
                        type="button"
                        onClick={() => handleAddContext('Current NIFTY 50 & SENSEX Benchmarks')}
                        className="w-full text-left px-2 py-1.5 text-[12.5px] text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Indian Market Indices</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleAddContext('Active Watchlist Tickers')}
                        className="w-full text-left px-2 py-1.5 text-[12.5px] text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Paperclip className="w-3.5 h-3.5 text-blue-400" />
                        <span>My Watchlist Symbols</span>
                    </button>
                </div>
            )}

            {/* Input Box Card */}
            <div className="flex flex-col bg-[#171920] border border-white/[0.08] focus-within:border-white/20 rounded-[24px] p-3 transition-all duration-200 shadow-md">
                {/* Top Row: Textarea + Mic */}
                <div className="flex items-start justify-between gap-2 px-1">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isListening ? 'Listening...' : placeholder}
                        disabled={disabled || isLoading}
                        className="w-full bg-transparent text-[14px] text-zinc-100 placeholder:text-zinc-500 placeholder:font-normal focus:outline-none resize-none leading-relaxed min-h-[24px] max-h-[120px] scrollbar-hide"
                    />

                    <button
                        type="button"
                        onClick={handleToggleSpeech}
                        title={isListening ? 'Stop listening' : 'Use voice'}
                        className={`p-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                            isListening
                                ? 'text-red-400 bg-red-500/20 animate-pulse'
                                : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/10'
                        }`}
                        aria-label="Speech input"
                    >
                        <Mic className="w-[18px] h-[18px]" />
                    </button>
                </div>

                {/* Bottom Row: + Context Button & Send Arrow */}
                <div className="flex items-center justify-between pt-2 px-1">
                    {/* Add / Attach Context */}
                    <button
                        type="button"
                        onClick={() => setShowContextAttach(!showContextAttach)}
                        title="Add context"
                        className="p-1 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Add context"
                    >
                        <Plus className="w-[19px] h-[19px]" strokeWidth={2.2} />
                    </button>

                    {/* Send Button */}
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={!hasInput || isLoading || disabled}
                        title="Submit prompt"
                        className={`w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                            hasInput && !isLoading
                                ? 'bg-zinc-200 text-zinc-900 hover:bg-white active:scale-95 shadow-sm'
                                : 'bg-[#232632] text-zinc-500 cursor-not-allowed opacity-60'
                        }`}
                        aria-label="Send message"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                        ) : (
                            <ArrowUp className="w-[17px] h-[17px]" strokeWidth={2.5} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
