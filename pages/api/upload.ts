import { NextApiRequest, NextApiResponse } from "next";
import multer, { memoryStorage } from "multer";
import cloudinary from "cloudinary";

interface CustomRequest extends NextApiRequest {
  files?: Express.Multer.File[] | any;
}

const storage = memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.array("file");

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

function runMiddleware(req: CustomRequest, res: NextApiResponse, fn: Function) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: CustomRequest,
  res: NextApiResponse
) {
  try {
    await runMiddleware(req, res, myUploadMiddleware);
    let url;
    for (const file of req.files as Express.Multer.File[]) {
      try {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;

        const response = await cloudinary.v2.uploader.upload(dataURI, {
          folder: "dropzone-images",
        });
        // console.log(dataURI);
        // console.log(response.url);
        url = response.url;
        // You can use 'response' here if needed
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
        return;
      }
    }

    res.status(200).json({ url: url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
