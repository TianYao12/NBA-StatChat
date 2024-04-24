import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import clientPromise from "../../../lib/mongodb";

export async function POST(req: Request) {
  const client = await clientPromise;
  const dbName = "docs";
  const collectionName = "embeddings";
  const collection = client.db(dbName).collection(collectionName);
  
  const question = await req.text();

  const vectorStore = new MongoDBAtlasVectorSearch(
    new OpenAIEmbeddings({
      modelName: 'text-embedding-ada-002',
      stripNewLines: true,
    }), {
    collection,
    indexName: "default",
    textKey: "text", 
    embeddingKey: "embedding",
  });

  const retriever = vectorStore.asRetriever({
    searchType: "mmr",
    searchKwargs: {
      fetchK: 20,
      lambda: 0.1,
    },
  });
  
  const retrieverOutput = await retriever.getRelevantDocuments(question);
  
  return Response.json(retrieverOutput);
}