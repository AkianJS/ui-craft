import React, { ReactNode, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { streamComponent } from '@/app/actions';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface ChatProps {
   // eslint-disable-next-line no-unused-vars
   setComponent: (component: ReactNode) => void;
}

export function Chat({ setComponent }: ChatProps) {
   const [input, setInput] = useState('');
   const [messages, setMessages] = useState<
      {
         role: 'user' | 'assistant';
         content: string;
      }[]
   >([]);
   const [isLoading, setIsLoading] = useState(false);

   const retrieveComponent = async (prompt: string) => {
      if (isLoading) return;
      setIsLoading(true);
      setInput('');
      setMessages((prev) => [
         ...prev,
         {
            role: 'user',
            content: prompt,
         },
      ]);
      const data = await streamComponent(prompt);
      setMessages((prev) => [
         ...prev,
         {
            role: 'assistant',
            content: data.code,
         },
      ]);
      setComponent(data.component);
      setIsLoading(false);
   };
   return (
      <div className="flex flex-col">
         <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
               <div
                  key={index}
                  className={`mb-4 p-2 rounded-lg ${
                     message.role === 'user'
                        ? 'bg-blue-100 ml-auto'
                        : 'bg-gray-100'
                  } max-w-[90%]`}
               >
                  {message.role === 'assistant' ? (
                     <>
                        <div>Assistant</div>
                        <br />
                        <MarkdownPreview source={message.content} />
                     </>
                  ) : (
                     message.content
                  )}
               </div>
            ))}
         </div>
         <div className="p-4 border-t">
            <div className="flex space-x-2">
               <Input
                  placeholder="Ask for a component..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                     e.key === 'Enter' && retrieveComponent(input)
                  }
               />
               <Button onClick={() => retrieveComponent(input)}>Send</Button>
            </div>
         </div>
      </div>
   );
}

export default Chat;
