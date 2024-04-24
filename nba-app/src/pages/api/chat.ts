import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

// meant to run on browser or "edge"
export const runtime = 'edge'

export default async function POST(req: Request) {
  const { messages } = await req.json();
  const currentMessageContent = messages[messages.length - 1].content;

  const vectorSearch = await fetch("http://localhost:3000/api/vectorSearch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: currentMessageContent,
  })
  
  const data = await vectorSearch.json()

  const TEMPLATE = `You are a very enthusiastic and knowledgeable sports person
 who loves to teach others about basketball. Given the following sections, answer
 the questions using only that information. If you are unsure or the answer is not explicitly
  written in the documentation, say, "Sorry, I cannot help you with that question."
  
  Context sections:
  ${JSON.stringify(data)}

  Question: """
  ${currentMessageContent}
  """
  `;

  messages[messages.length -1].content = TEMPLATE;

  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    streaming: true,
  });

  const messageObjects = messages.map(m =>
    m.role == 'user'
      ? new HumanMessage(m.content)
      : new AIMessage(m.content),
  );

  const response = await llm.invoke(messageObjects, {});

  return response;
}
