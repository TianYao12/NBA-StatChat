import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  
  if (method !== "GET") {
    return res.status(405).json("Method not allowed");
  }

  try {
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
    });

    const bucket = storage.bucket(process.env.BUCKET_NAME!);
    
    const [files] = await bucket.getFiles();
    const fileList = files.map(file => ({
      name: file.name,
      url: `https://storage.cloud.google.com/${process.env.BUCKET_NAME}/${file.name}`,
      contentType: file.metadata.contentType,
      size: file.metadata.size,
      updated: file.metadata.updated,
    }));
    return res.status(200).json(fileList);
  } catch (error) {
    console.error("Error listing files in bucket:", error);
    return res.status(500).json({ error: 'Failed to list files in the bucket' });
  }
}
