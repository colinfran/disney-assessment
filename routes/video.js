import { Router } from "express";
import fs from "fs";
import { root } from "../utils/index.js";
const router = Router();

/**
 * @route GET /video/:id
 * @description Stream a video by ID from S3 external source.
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
  const videoPath = `${root}/videos/${id}.mp4`;
  const videoSize = fs.statSync(videoPath).size;
  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

export {router as videoRouter};