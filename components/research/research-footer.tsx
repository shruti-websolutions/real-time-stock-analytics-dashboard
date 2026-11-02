'use client';

import React from 'react';

export const ResearchFooter: React.FC = () => {
    return (
        <div className="pt-3 pb-2 px-4 flex flex-col items-center gap-1.5 border-t border-white/[0.04]">
            {/* Quick Links matching reference design */}
            <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500">
                <a
                    href="#help"
                    className="hover:text-zinc-300 transition-colors"
                    onClick={(e) => e.preventDefault()}
                >
                    Help
                </a>
                <a
                    href="#feedback"
                    className="hover:text-zinc-300 transition-colors"
                    onClick={(e) => e.preventDefault()}
                >
                    Send feedback
                </a>
                <a
                    href="#privacy"
                    className="hover:text-zinc-300 transition-colors"
                    onClick={(e) => e.preventDefault()}
                >
                    Privacy
                </a>
                <a
                    href="#terms"
                    className="hover:text-zinc-300 transition-colors"
                    onClick={(e) => e.preventDefault()}
                >
                    Terms
                </a>
                <a
                    href="#disclaimer"
                    className="hover:text-zinc-300 transition-colors"
                    onClick={(e) => e.preventDefault()}
                >
                    Disclaimer
                </a>
            </div>

            {/* AI Notice */}
            <p className="text-[10px] text-zinc-600 text-center">
                Financial research AI may make mistakes. Verify critical trade data.
            </p>
        </div>
    );
};
