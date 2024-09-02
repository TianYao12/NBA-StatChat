import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { fileName }: {fileName: string} = req.body;
  if (method !== "POST") {
    res.status(405).json("Method not allowed");
    return;
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
    const file = bucket.file(fileName);
    const options = {
      expires: Date.now() + 5 * 60 * 1000, //  5 minutes
      fields: { "x-goog-meta-source": "nextjs-project" },
    };

    const [response] = await file.generateSignedPostPolicyV4(options);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
}
