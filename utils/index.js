import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import fs from "fs";
import download from "download";
dotenv.config();

const root = process.env.PWD;

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const videoRoot = `${root}/videos`;

const downloadFile = async (item) =>  {
  console.log(`Downloading ${item.title}`);
  const url = `https://disney-assessment.s3.us-west-1.amazonaws.com/mp4/${item.fileId}.mp4`;
  fs.writeFileSync(`${videoRoot}/${item.fileId}.mp4`, await download(url));
};

const downloadVideos = async () => {
  if (fs.existsSync(videoRoot)) {
    console.log("Video folder already exists.");
  } else {
    fs.mkdirSync(videoRoot);
    try {
      await client.connect();
      const db = client.db("disney-assessment");
      const streams = db.collection("streams");
      const result = await streams.find({}).toArray(); 

      for (let item of result) {
        await downloadFile(item);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export { root, client, downloadVideos };