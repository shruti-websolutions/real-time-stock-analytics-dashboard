'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
    Sparkles,
    Copy,
    Check,
    ThumbsUp,
    ThumbsDown,
    ExternalLink,
    RotateCcw,
    TrendingUp,
} from 'lucide-react';
import { ChatMessage } from './types';

interface ResearchChatViewProps {
    messages: ChatMessage[];
    isStreaming?: boolean;
    onSelectFollowUp: (query: string) => void;
    onRegenerate?: () => void;
}

export const ResearchChatView: React.FC<ResearchChatViewProps> = ({
    messages,
    isStreaming = false,
    onSelectFollowUp,
    onRegenerate,
}) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<Record<string, 'up' | 'down' | undefined>>({});

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isStreaming]);

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleFeedback = (id: string, type: 'up' | 'down') => {
        setFeedback((prev) => ({
            ...prev,
            [id]: prev[id] === type ? undefined : type,
        }));
    };

    // Format markdown-like text nicely
    const renderFormattedContent = (content: string) => {
        const lines = content.split('\n');
        return (
            <div className="space-y-2 text-[13.5px] leading-relaxed text-zinc-200">
                {lines.map((line, idx) => {
                    // Headings
                    if (line.startsWith('### ')) {
                        return (
                            <h4
                                key={idx}
                                className="font-semibold text-white text-[14.5px] pt-2 pb-1 border-b border-white/5"
                            >
                                {line.replace('### ', '')}
                            </h4>
                        );
                    }
                    if (line.startsWith('## ')) {
                        return (
                            <h3 key={idx} className="font-semibold text-white text-[15px] pt-2 pb-1">
                                {line.replace('## ', '')}
                            </h3>
                        );
                    }
                    // Bullet points
                    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                        const text = line.trim().replace(/^[-*]\s+/, '');
                        return (
                            <div key={idx} className="flex items-start gap-2 pl-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                                <span>{renderInlineStyles(text)}</span>
                            </div>
                        );
                    }
                    // Numbered lists
                    if (/^\d+\.\s/.test(line.trim())) {
                        const num = line.trim().match(/^\d+/)?.[0];
                        const text = line.trim().replace(/^\d+\.\s+/, '');
                        return (
                            <div key={idx} className="flex items-start gap-2 pl-1">
                                <span className="text-zinc-400 font-mono text-[12px] min-w-[16px] mt-0.5">
                                    {num}.
                                </span>
                                <span>{renderInlineStyles(text)}</span>
                            </div>
                        );
                    }
                    // Table rows or separators
                    if (line.trim().startsWith('|')) {
                        if (line.includes(':---')) return null;
                        const cells = line.split('|').filter((c) => c.trim().length > 0);
                        return (
                            <div
                                key={idx}
                                className="grid grid-cols-3 gap-2 py-1 px-2 rounded-md bg-white/[0.03] text-[12px] font-mono"
                            >
                                {cells.map((c, cIdx) => (
                                    <span
                                        key={cIdx}
                                        className={cIdx === 0 ? 'font-semibold text-white' : 'text-zinc-300'}
                                    >
                                        {c.trim()}
                                    </span>
                                ))}
                            </div>
                        );
                    }
                    // Empty lines
                    if (!line.trim()) {
                        return <div key={idx} className="h-1.5" />;
                    }

                    return <p key={idx}>{renderInlineStyles(line)}</p>;
                })}
            </div>
        );
    };

    // Parse bold text **bold** and tickers like $QQQ or NIFTY 50
    const renderInlineStyles = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={i} className="font-semibold text-white">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return part;
        });
    };

    return (
        <div className="flex flex-col px-4 space-y-5 pb-6">
            {messages.map((message) => {
                const isUser = message.role === 'user';

                return (
                    <div
                        key={message.id}
                        className={`flex flex-col animate-in fade-in slide-in-from-bottom-1 duration-200 ${
                            isUser ? 'items-end' : 'items-start'
                        }`}
                    >
                        {/* User Bubble */}
                        {isUser ? (
                            <div className="max-w-[88%] bg-[#21242e] border border-white/[0.08] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-[13.5px] leading-relaxed shadow-xs">
                                {message.content}
                            </div>
                        ) : (
                            /* Assistant Message */
                            <div className="w-full bg-[#161820]/80 border border-white/[0.06] rounded-2xl p-4 shadow-sm space-y-3">
                                {/* Assistant Header */}
                                <div className="flex items-center justify-between pb-1 border-b border-white/[0.06]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
                                            <Sparkles className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-[12.5px] font-medium text-zinc-300">
                                            Financial Research
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-zinc-500 font-mono">
                                        {new Date(message.timestamp).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>

                                {/* Content */}
                                <div>{renderFormattedContent(message.content)}</div>

                                {/* Related Tickers Pills */}
                                {message.relatedTickers && message.relatedTickers.length > 0 && (
                                    <div className="flex items-center flex-wrap gap-1.5 pt-1">
                                        <span className="text-[11.5px] text-zinc-500 flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> Related:
                                        </span>
                                        {message.relatedTickers.map((ticker) => (
                                            <span
                                                key={ticker}
                                                className="px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono font-medium text-emerald-400"
                                            >
                                                {ticker}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Citations */}
                                {message.citations && message.citations.length > 0 && (
                                    <div className="pt-2 border-t border-white/[0.06]">
                                        <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                                            Sources & Evidence
                                        </div>
                                        <div className="space-y-1">
                                            {message.citations.map((cite, cIdx) => (
                                                <a
                                                    key={cIdx}
                                                    href={cite.url || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.04] text-[12px] text-zinc-300 hover:text-white transition-all group"
                                                >
                                                    <span className="truncate pr-2">{cite.title}</span>
                                                    <div className="flex items-center gap-1 text-zinc-500 group-hover:text-zinc-300 shrink-0 text-[11px]">
                                                        <span>{cite.source}</span>
                                                        <ExternalLink className="w-3 h-3" />
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Message Footer Actions */}
                                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-zinc-400 text-xs">
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(message.id, message.content)}
                                            title="Copy response"
                                            className="p-1 rounded-md hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                        >
                                            {copiedId === message.id ? (
                                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5" />
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleFeedback(message.id, 'up')}
                                            title="Helpful"
                                            className={`p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer ${
                                                feedback[message.id] === 'up'
                                                    ? 'text-emerald-400 bg-emerald-500/10'
                                                    : 'hover:text-white'
                                            }`}
                                        >
                                            <ThumbsUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleFeedback(message.id, 'down')}
                                            title="Not helpful"
                                            className={`p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer ${
                                                feedback[message.id] === 'down'
                                                    ? 'text-rose-400 bg-rose-500/10'
                                                    : 'hover:text-white'
                                            }`}
                                        >
                                            <ThumbsDown className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {onRegenerate && (
                                        <button
                                            type="button"
                                            onClick={onRegenerate}
                                            title="Regenerate analysis"
                                            className="flex items-center gap-1 text-[11.5px] hover:text-white transition-colors cursor-pointer"
                                        >
                                            <RotateCcw className="w-3 h-3" />
                                            <span>Retry</span>
                                        </button>
                                    )}
                                </div>

                                {/* Suggested Follow-up Questions */}
                                {message.suggestedFollowUps &&
                                    message.suggestedFollowUps.length > 0 && (
                                        <div className="pt-2 space-y-1.5">
                                            <div className="text-[11.5px] text-zinc-500 font-medium">
                                                Suggested follow-ups:
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                {message.suggestedFollowUps.map((q, qIdx) => (
                                                    <button
                                                        key={qIdx}
                                                        type="button"
                                                        onClick={() => onSelectFollowUp(q)}
                                                        className="text-left px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.06] hover:border-white/15 text-[12px] text-zinc-300 hover:text-white transition-all cursor-pointer"
                                                    >
                                                        {q}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Streaming Typing Indicator */}
            {isStreaming && (
                <div className="flex items-center gap-2 p-3 bg-[#161820]/80 border border-white/[0.06] rounded-2xl w-fit">
                    <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="text-[12.5px] text-zinc-400 font-medium">
                        Synthesizing financial market data...
                    </span>
                    <span className="flex gap-1 ml-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                        <span
                            className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
                            style={{ animationDelay: '0.15s' }}
                        />
                        <span
                            className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
                            style={{ animationDelay: '0.3s' }}
                        />
                    </span>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    );
};
