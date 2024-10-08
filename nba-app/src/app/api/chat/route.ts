import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const currentMessageContent = messages[messages.length - 1].content; // last message

  const vectorSearch = await fetch("http://localhost:3000/api/vectorSearch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: currentMessageContent,
  }).then((res) => res.json());

  const TEMPLATE = `You are a knowledgeable sports person who loves to teach others about basketball. 
  The following context are facts, so use it to supplement your responses."
  
  Context sections:
  ${JSON.stringify(vectorSearch)}

  Question: """
  ${currentMessageContent}
  """
  `;

  messages[messages.length - 1].content = TEMPLATE; // replace last message with template

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    streaming: true,
    apiKey: process.env.NEXT_OPENAI_API_KEY
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