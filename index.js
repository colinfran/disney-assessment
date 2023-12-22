import express from "express";
import cors from "cors";
import { downloadVideos, root } from "./utils/index.js";
import { indexRouter } from "./routes/index.js";
import { videoRouter } from "./routes/video.js";
import { streamsRouter } from "./routes/streams.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${root}/public`));
app.use(cors({origin: "*"}));

/* Routes */
app.use("/", indexRouter);
app.use("/video", videoRouter);
app.use("/streams", streamsRouter);

/* Start */
const startup = async () => {
  // download all videos on startup
  // we want to be able to split up video in 1mb chunks for faster loading for user
  await downloadVideos();
  app.listen(3000, () =>
    console.log("Disney assessment app listening on port 3000!"),
  );
};
startup();
