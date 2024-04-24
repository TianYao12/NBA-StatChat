import { promises as fsp } from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGO_LANG_URI || "");
const dbName = "docs";
const collectionName = "embeddings";
const collection = client.db(dbName).collection(collectionName);

const docs_dir = "../scraping/data";
const fileNames = await fsp.readdir(docs_dir);

for (const fileName of fileNames) {
  const document = await fsp.readFile(`${docs_dir}/${fileName}`, "utf8");
  console.log(`Vectorizing ${fileName}`);
  
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 500,
    chunkOverlap: 50,
  });
  const output = await splitter.createDocuments([document]);
  
  await MongoDBAtlasVectorSearch.fromDocuments(
    output,
    new OpenAIEmbeddings(),
    {
      collection,
      indexName: "default",
      textKey: "text",
      embeddingKey: "embedding",
    }
  );
}

console.log("Done: Closing Connection");
await client.close();