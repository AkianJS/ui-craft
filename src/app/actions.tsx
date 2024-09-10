'use server';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { generateId } from 'ai';
import { ReactNode } from 'react';

export interface ServerMessage {
   id: string;
   role: 'user' | 'assistant';
   content: string;
}

export interface ClientMessage {
   id: string;
   role: 'user' | 'assistant';
   display: ReactNode;
}

export async function streamComponent(prompt: string) {
   'use server';
   const getAiHistory = getMutableAIState();

   const groq = createGroq({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
   });

   getAiHistory.update((history: ServerMessage[]) => [
      ...history,
      {
         id: generateId(),
         role: 'user',
         content: prompt,
      },
   ]);

   const result = await streamUI({
      model: groq('llama-3.1-70b-versatile'),
      system: `You are a professional web developer who creates beautiful, responsive and modern UI components for web applications, using TailwindCSS. You can't provide logic or interactivity, only the UI and only with TailwindCSS. Provide just a plain text with the code, without markdown or any other formatting. The safelist of classes that you can use came from the following pattern: /^bg-/, /^text-/, /^border-/, /^ring-/, /^from-/, /^via-/, /^to-/, /^p-/, /^m-/, /^w-/, /^h-/, /^grid-cols-/, /^gap-/, /^rounded-/, /^shadow-/, /^flex-/, /^justify-/, /^items-/, /^overflow-/, /^max-w-/, /^ml-/, /^mr-/, /^mb-/, /^mt-/. Be creative and provide aesthetic, modern design components. Keep iterating until the user is satisfied. Return only the HTML.`,
      temperature: 0.5,
      messages: [...getAiHistory.get(), { role: 'user', content: prompt }],
      text: ({ content, done }) => {
         if (done) {
            getAiHistory.done((history: ServerMessage[]) => [
               ...history,
               {
                  id: generateId(),
                  role: 'assistant',
                  content: content,
               },
            ]);
         }
         return (
            <div
               className="h-[calc(100vh-60px)] w-full flex flex-col items-center overflow-auto"
               dangerouslySetInnerHTML={{
                  __html: content,
               }}
            ></div>
         );
      },
   });

   return {
      component: result.value,
   };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
   initialAIState: [],
   initialUIState: [],
   actions: {
      streamComponent,
   },
});
