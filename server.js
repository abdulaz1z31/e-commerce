import express from "express"
import morgan from "morgan"
import {logger} from "./src/utils/index.utils.js"
import { application } from "./src/config/index.config.js"
import { router } from "./src/routes/index.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1", router)

app.listen(application.port, async () => { 
    logger.info(`server is running on ${application.port} port`)
})