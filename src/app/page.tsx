'use client';

import Chat from '@/components/chat/chat';
import { Navbar } from '@/components/navbar/navbar';
import { FormEvent, ReactNode, useState } from 'react';
import { useActions, useAIState } from 'ai/rsc';
import { ServerMessage } from './actions';
import { generateId } from 'ai';

export const maxDuration = 30;

export default function Home() {
   const [component, setComponent] = useState<ReactNode>();
   const [isLoading, setIsLoading] = useState(false);
   const [aiState, setAiState] = useAIState();
   const { streamComponent } = useActions();

   const retrieveComponent = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLoading) return;
      setIsLoading(true);

      const prompt = e.currentTarget?.['chat']?.value as string;

      if (prompt) {
         e.currentTarget['chat'].value = '';
      }

      setAiState((prev: ServerMessage[]) => [
         ...prev,
         {
            id: generateId(),
            role: 'user',
            content: prompt,
         },
      ]);

      const data = await streamComponent(prompt);
      setComponent(data.component);
      setIsLoading(false);
   };

   return (
      <main className="h-screen flex flex-col">
         <Navbar />
         <div className="flex-1 grid grid-cols-[49%,4px,1fr]">
            {/* Chat */}
            <form onSubmit={(e) => retrieveComponent(e)}>
               <Chat aiState={aiState} />
            </form>

            {/* Divider */}
            <div className="bg-gray-200 w-full h-full"></div>

            {/* Component Showcase Section */}
            {component}
         </div>
      </main>
   );
}
