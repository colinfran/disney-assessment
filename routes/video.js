import { Router } from "express";
import fs from "fs";
import { root } from "../utils/index.js";
const router = Router();

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
  const videoPath = `${root}/videos/${id}.mp4`;
  const videoSize = fs.statSync(videoPath).size;
  // Safari range header has both start and end
  let parts = range.split("=")[1];
  let start = Number(parts.split("-")[0]);
  let end = Number(parts.split("-")[1]);
  // Chrome range header only has just start; set end to be start + 1mb
  if (!end) {
    const CHUNK_SIZE = 10 ** 6;
    end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  } 
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
