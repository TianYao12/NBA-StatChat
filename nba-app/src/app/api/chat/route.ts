// import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// export const dynamic = 'force-dynamic';
 
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });
 
// export async function POST(req: Request) {
//   // Extract the `messages` from the body of the request
//   const { messages } = await req.json();
 
//   // Request the OpenAI API for the response based on the prompt
//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages: messages,
//   });
 
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
 
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }
import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const currentMessageContent = messages[messages.length - 1].content;

  const vectorSearch = await fetch("http://localhost:3000/api/vectorSearch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: currentMessageContent,
  }).then((res) => res.json());

  const TEMPLATE = `You are a knowledgeable sports person who loves to teach others about basketball. 
  Given the following sections, answer the questions using only that information. If you are unsure, say "Sorry, I want to provide the
  most accurate information, and I have not stored the necessary data to answer that question."
  
  Context sections:
  ${JSON.stringify(vectorSearch)}

  Question: """
  ${currentMessageContent}
  """
  `;

  messages[messages.length -1].content = TEMPLATE;

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    streaming: true,
  });

  llm
    .call(
      (messages as Message[]).map(m =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
      {},
      [handlers],
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}