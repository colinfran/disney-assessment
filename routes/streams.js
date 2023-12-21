import { Router } from "express";
import { client } from "../utils/index.js";

const router = Router();

/**
 * @route GET /streams
 * @description Retrieve a list of streams from the database.
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("disney-assessment");
    const streams = db.collection("streams");
    const result = await streams.find({}).toArray(); 
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});

export {router as streamsRouter};