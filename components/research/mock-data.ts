import { PromptSuggestion, QuickAction } from './types';

export const INITIAL_PROMPT_SUGGESTIONS: PromptSuggestion[] = [
    {
        id: 'market-today',
        text: "What's going on with the markets today?",
        category: 'market',
    },
    {
        id: 'tech-weakness',
        text: 'Why are global technology stocks experiencing weakness today?',
        category: 'tech',
    },
    {
        id: 'crude-oil-india',
        text: 'How are elevated crude oil prices impacting Indian market sectors?',
        category: 'sector',
    },
];

export const EXPLORE_ACTIONS: QuickAction[] = [
    {
        id: 'create-portfolio',
        label: 'Create a portfolio',
        iconType: 'plus',
        promptText: 'Help me build a balanced, resilient portfolio based on current market trends.',
    },
    {
        id: 'create-task',
        label: 'Create a task',
        iconType: 'task',
        promptText: 'Set up an earnings watch task and price alerts for my active holdings this week.',
    },
    {
        id: 'deep-search',
        label: 'Deep Search',
        iconType: 'search',
        promptText: 'Run a deep market scan on institutional inflows, FII activity, and sector rotation.',
    },
    {
        id: 'analyze-watchlist',
        label: 'Analyze my watchlist',
        iconType: 'chart',
        promptText: 'Analyze the risk/reward profile and technical momentum for the symbols on my watchlist.',
    },
];

export const MOCK_RESPONSES: Record<string, {
    content: string;
    relatedTickers: string[];
    citations: { title: string; source: string; url: string; date: string }[];
    suggestedFollowUps: string[];
}> = {
    'market-today': {
        content: `**Global markets are displaying mixed momentum** as investors digest macroeconomic tailwinds, corporate quarterly earnings reports, and shifting central bank interest rate projections.

### Key Highlights:
- **Indian Benchmark Indices:** The **NIFTY 50** (+0.51%) and **SENSEX** (+0.42%) continued their upward trajectory, driven by strong domestic institutional inflows and resilience across banking and consumer staples.
- **US Equities:** The tech-heavy **QQQ** remains volatile amid semiconductor adjustments, while **SPY** held steady near record boundaries.
- **Energy & Commodities:** Brent crude prices consolidated around $82/bbl, creating mild input cost pressures for transport and chemical manufacturers.

### Market Breadth:
Advancing sectors outnumbered declining ones 3:2, led by **IT Services (+2.32%)** and **Financials (+0.03%)**, offsetting minor pullbacks in Auto and Energy.`,
        relatedTickers: ['NIFTY 50', 'SENSEX', 'QQQ', 'SPY'],
        citations: [
            { title: 'Indian benchmark indices sustain positive momentum', source: 'NSE India', url: 'https://nseindia.com', date: 'Today' },
            { title: 'Global Market Wrap: Equities steady amid tech consolidation', source: 'Bloomberg', url: 'https://bloomberg.com', date: '2h ago' },
            { title: 'Macroeconomic tailwinds stabilize market sentiment', source: 'Reuters', url: 'https://reuters.com', date: '3h ago' },
        ],
        suggestedFollowUps: [
            'Which sectors in Nifty are outperforming today?',
            'What is the foreign institutional investor (FII) net flow today?',
            'Show top earnings releases scheduled this week',
        ],
    },

    'tech-weakness': {
        content: `Global technology equities have experienced intermittent pullbacks due to a combination of **valuation digestion**, **bond yield fluctuations**, and **supply chain margin normalization**.

### Primary Catalysts:
1. **Bond Yield Pressures:** Benchmark 10-year Treasury yields hovering above 4.2% increase discount rates on long-duration tech cash flows.
2. **Semiconductor Normalization:** After parabolic rallies in AI infrastructure hardware, institutional funds are executing strategic profit-taking and rotating into value/cyclicals.
3. **Enterprise IT Spend Scrutiny:** Cloud hyperscalers are noting stricter procurement cycles among enterprise software buyers, moderating near-term revenue expansion expectations.

### Outlook:
Core fundamentals across cloud computing and enterprise cybersecurity remain robust, with long-term secular growth intact.`,
        relatedTickers: ['QQQ', 'NVDA', 'MSFT', 'NIFTY_IT'],
        citations: [
            { title: 'Tech Stocks Stumble as Bond Yields Rise', source: 'Wall Street Journal', url: 'https://wsj.com', date: 'Today' },
            { title: 'Semiconductor sector margins face inventory realignment', source: 'Financial Times', url: 'https://ft.com', date: '4h ago' },
        ],
        suggestedFollowUps: [
            'Is this weakness an attractive accumulation entry for QQQ?',
            'How is Nifty IT performing compared to Nasdaq?',
            'What are analysts projecting for semiconductor earnings next quarter?',
        ],
    },

    'crude-oil-india': {
        content: `Elevated crude oil prices exert varying cross-sectoral impacts across the Indian economy, as India imports over **85% of its crude oil requirements**.

### Sectoral Breakdown:

| Sector | Impact | Mechanism |
| :--- | :--- | :--- |
| **Paints & Adhesives** | Negative | Raw material inputs (petrochemical derivatives) make up 40-50% of COGS, compressing gross margins. |
| **Aviation & Logistics** | Negative | Aviation Turbine Fuel (ATF) constitutes roughly 35-40% of airline operating expenditures. |
| **Upstream Oil & Gas (ONGC, Oil India)** | Positive | Realizations per barrel increase directly, boosting EBITDA and cash flows. |
| **Automobile & Tyre** | Moderately Negative | Elevated fuel costs dampen discretionary vehicle usage; synthetic rubber costs increase. |
| **Banking & Financials** | Neutral to Mild Negative | Higher imported inflation may keep interest rates higher for longer, restraining credit demand. |

### Macro Context:
A sustained $10/barrel rise in crude typically expands India's current account deficit by ~0.4% of GDP and adds ~30-40 bps to CPI inflation.`,
        relatedTickers: ['ONGC', 'RELIANCE', 'ASIANPAINT', 'INDIGO'],
        citations: [
            { title: 'Crude Oil Volatility: Impact on Indian Corporates', source: 'LiveMint', url: 'https://livemint.com', date: 'Today' },
            { title: 'RBI Macroeconomic Report on Energy Price Pass-through', source: 'Reserve Bank of India', url: 'https://rbi.org.in', date: 'Yesterday' },
        ],
        suggestedFollowUps: [
            'Which Indian stocks benefit most from rising crude oil?',
            'What is the current Brent crude spot price and forecast?',
            'How does INR/USD exchange rate correlate with oil price swings?',
        ],
    },
};

export function getSimulatedResponse(prompt: string) {
    const lower = prompt.toLowerCase();

    if (lower.includes('market') || lower.includes("going on") || lower.includes("today")) {
        return MOCK_RESPONSES['market-today'];
    }
    if (lower.includes('tech') || lower.includes('weakness') || lower.includes('nasdaq')) {
        return MOCK_RESPONSES['tech-weakness'];
    }
    if (lower.includes('crude') || lower.includes('oil') || lower.includes('petroleum')) {
        return MOCK_RESPONSES['crude-oil-india'];
    }
    if (lower.includes('portfolio')) {
        return {
            content: `### Portfolio Architecture Recommendation

To withstand ongoing macroeconomic crosscurrents while capturing growth:

1. **Core Equities (55%):**
   - 35% Broad Market Index (**NIFTY 50** / **SPY**)
   - 20% Quality Growth / Large-cap Tech (**QQQ** / Nifty IT)
2. **Defensive & Dividend Yield (25%):**
   - High cash-flow utilities, healthcare, and consumer staples.
3. **Fixed Income & Gold (15%):**
   - Sovereign Gold Bonds (SGB) or Gold ETFs as a hedge against currency fluctuation.
4. **Cash Reserve (5%):**
   - Kept in liquid funds to capitalize on market corrections.`,
            relatedTickers: ['SPY', 'QQQ', 'NIFTY 50', 'GLD'],
            citations: [
                { title: 'Modern Portfolio Theory and Asset Allocation', source: 'Investopedia', url: 'https://investopedia.com', date: 'Recent' },
            ],
            suggestedFollowUps: [
                'How often should this portfolio be rebalanced?',
                'What is the projected beta and volatility of this allocation?',
            ],
        };
    }
    if (lower.includes('watchlist')) {
        return {
            content: `### Watchlist Technical & Momentum Breakdown

Based on current real-time feeds:
- **QQQ ($692.44, -3.20%):** Pulling back toward its 50-day Exponential Moving Average (EMA). Support zone identified at $684.00; resistance at $705.50.
- **NIFTY_AUTO (-0.87%):** Consolidating after recent record rallies. Volume indicates mild profit-taking without structural breakdown.
- **NIFTY_IT (+2.32%):** Strong bullish engulfing candle on above-average trading volume, signaling institutional accumulation.

**Summary Takeaway:** Watchlist overall beta is **1.14**, indicating slight outperformance potential with elevated volatility.`,
            relatedTickers: ['QQQ', 'NIFTY_AUTO', 'NIFTY_IT'],
            citations: [
                { title: 'Watchlist Real-time Volume & Momentum Matrix', source: 'Market Data Services', url: '#', date: 'Real-time' },
            ],
            suggestedFollowUps: [
                'Set price alert for QQQ near $685',
                'Compare Nifty IT RSI levels with historical oversold zones',
            ],
        };
    }

    // Default intelligent response for any financial query
    return {
        content: `### Financial Research Analysis

Regarding your query: *"**${prompt}**"*

**Key Insights & Analysis:**
- **Current Market Context:** Institutional market participants are balancing economic indicators (CPI inflation prints, employment rates) against ongoing corporate earnings reports.
- **Liquidity & Flow Drivers:** Domestic institutional investors (DIIs) continue providing consistent floor liquidity across blue-chip counters, mitigating external foreign outflows.
- **Risk Assessment:** Key monitorables include central bank interest rate decisions, geopolitical supply chain stability, and currency movements.

*Tip: You can ask specific questions about any stock ticker, index, or sector to get granular metrics and valuation multiples.*`,
        relatedTickers: ['NIFTY 50', 'SENSEX', 'SPY'],
        citations: [
            { title: 'Financial Market Intelligence Digest', source: 'Financial Analytics', url: '#', date: 'Just now' },
            { title: 'Macroeconomic Overview & Indices', source: 'Global Markets Feed', url: '#', date: 'Today' },
        ],
        suggestedFollowUps: [
            'Break down valuation multiples for key leaders in this sector',
            'How does this impact retail investor strategy over 3-6 months?',
            'What are the key technical support and resistance levels?',
        ],
    };
}
