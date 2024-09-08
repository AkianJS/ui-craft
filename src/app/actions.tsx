'use server';

import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { streamUI } from 'ai/rsc';

export async function streamComponent(prompt: string) {
   const groq = createGroq({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
   });

   const result = await streamUI({
      model: groq('llama-3.1-70b-versatile'),
      system: `You are a professional web developer who creates beautiful, responsive and modern UI components for web applications, using inline styles. You can't provide logic or interactivity, only the UI and only with inline styles. Provide just a plain text with the code, without markdown or any other formatting. If image is needed, provided a src attribute with a placeholder image from internet, related to what the user is asking.`,
      prompt: prompt,
      text: ({ content }) => {
         return (
            <div
               className="max-h-[85%]"
               dangerouslySetInnerHTML={{
                  __html: content,
               }}
            ></div>
         );
      },
   });

   const { text } = await generateText({
      model: groq('llama-3.1-70b-versatile'),
      system: `You are a web style transcriptor who can convert a normal HTML with inline styles to a HTML with TailwindCSS classes. Provide the response as md with 
      \`\`\`html. If there is an image, use the same src attribute that was provided. If there is a class that is not in TailwindCSS, use the closest one. Just provide the code without adding anything else.`,
      prompt: prompt,
   });

   return {
      code: text,
      component: result.value,
   };
}
