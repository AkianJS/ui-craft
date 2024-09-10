import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ServerMessage } from '@/app/actions';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface ChatProps {
   aiState: ServerMessage[];
}

export function Chat({ aiState }: ChatProps) {
   return (
      <div className="flex flex-col h-[calc(100vh-60px)]">
         <div className="flex-1 p-4 overflow-y-auto">
            {aiState.map((message: ServerMessage) => (
               <div
                  key={message.id}
                  className={`mb-4 p-2 rounded-lg ${
                     message.role === 'user'
                        ? 'bg-blue-100 ml-auto'
                        : 'bg-gray-100'
                  } max-w-[90%]`}
               >
                  {message.role === 'assistant' ? (
                     <>
                        <MarkdownPreview
                           source={`\`\`\`html
${message.content}`}
                        />
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
                  name="chat"
                  type="text"
                  placeholder="Ask for a component..."
               />
               <Button>Send</Button>
            </div>
         </div>
      </div>
   );
}

export default Chat;
