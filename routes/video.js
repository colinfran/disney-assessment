import { Router } from "express";
import got from "got";

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
  if (!range) {
    res.status(400).send("Requires range header");
  }
  if (id === undefined) {
    res.status(400).send("Requires video id");
  }
  const url = `https://disney-assessment.s3.us-west-1.amazonaws.com/mp4/${id}.mp4`;
  const stream = got.stream(url);
  stream.on("error", (error) => {
    console.error(error.message);
  });
  stream.pipe(res);
});

export {router as videoRouter};