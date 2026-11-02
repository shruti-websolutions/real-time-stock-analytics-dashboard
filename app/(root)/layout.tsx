import Header from "@/components/shared/Header";
import { WatchList } from "@/components/watchlist/Watchlist";
import { ResearchContainer } from "@/components/research";
import { auth } from "@/lib/better-auth/auth";

import { headers } from "next/headers";

const Layout = async ({ children }: { children: React.ReactNode }) => {

    const authInstance = await auth();// getting

    // getting the session info on the server side
    const session = await authInstance.api.getSession({
        headers: await headers()
    });

    return (
        <main className="h-screen flex flex-col overflow-hidden bg-[#101218]">
            <Header intialUser={session?.user} />
            <div className="flex-1 w-full max-w-[1920px] mx-auto flex flex-col md:flex-row overflow-hidden text-gray-400">
                {/* Left Column: Lists / Watchlist */}
                <div className="hidden md:block md:w-[280px] lg:w-[290px] shrink-0 border-r border-white/[0.08] h-full overflow-y-auto custom-scrollbar">
                    <WatchList />
                </div>

                {/* Center Column: Main Dashboard Content */}
                <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
                    {children}
                </div>

                {/* Right Column: Research Chatbot */}
                <ResearchContainer />
            </div>
        </main>
    )
}

export default Layout
