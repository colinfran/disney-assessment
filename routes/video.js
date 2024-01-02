import { Router } from "express";
import AWS from "aws-sdk";
import { accessKeyId, secretAccessKey } from "../utils/index.js";
const router = Router();

const s3bucket = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region: "us-west-1",
});

/**
 * @route GET /video/:id
 * @description Stream a video by ID in 1mb chunks.
 * @param {string} id - The unique identifier of the video.
 * @header {string} range - The range header specifying the byte range for partial content.
 * @access Public
 */
router.get("/:id", async (req, res) => {
  const range = req.headers.range;
  const id = req.params.id;
  if (!range || id === undefined) {
    return res.status(400).send("Invalid request parameters");
  }
  s3bucket.getObject({
    Bucket: "disney-assessment",
    Key: `mp4/${id}.mp4`,
    Range: range
  }, (err, data) => {
    if(err){
      return console.log(err);
    }
    res.status(206);
    res.setHeader("Content-Range", data.ContentRange);
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Length", data.ContentLength);
    res.setHeader("Content-Type", "video/mp4");
    res.send(data.Body);
  });
});

export {router as videoRouter};
