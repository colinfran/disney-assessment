import express from 'express';
import { root } from '../utils/index.js';

const router = express.Router();

/**
 * @route GET /
 * @description Serve the index.html file.
 * @access Public
 */
router.get('/', (req, res) => {
  res.sendFile('public/index.html' , { root });
});

export {router as indexRouter};