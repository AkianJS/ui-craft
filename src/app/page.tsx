'use client';

import Chat from '@/components/chat/chat';
import { Navbar } from '@/components/navbar/navbar';
import { ReactNode, useState } from 'react';

export default function Home() {
   const [component, setComponent] = useState<ReactNode>();

   return (
      <main className="h-screen flex flex-col">
         <Navbar />
         <div className="flex-1 grid grid-cols-[49%,4px,1fr]">
            {/* Chat */}
            <Chat setComponent={setComponent} />

            {/* Divider */}
            <div className="bg-gray-200 w-full h-full"></div>

            {/* Component Showcase Section */}
            <div className="flex justify-center pt-4">{component}</div>
         </div>
      </main>
   );
}
