import express from "express";
import ReactDOM from "react-dom/server";
import { indexTemplate } from "./indexTemplate";
import { App } from "../App";
import compression from "compression"
import helmet from "helmet";

const PORT = process.env.PORT || 3000
const IS_DEV = process.env.NODE_ENV !== "production"
const app = express();

if (!IS_DEV) {
    app.use(compression())
    app.use(helmet({
        contentSecurityPolicy: false
    }))
}

app.use("/static", express.static("./build/client"));

app.get('*', (req, res) => {
    res.send(indexTemplate(ReactDOM.renderToString(App())));
});

app.listen(PORT, () => {
  console.log(`server started on port http://localhost:${PORT}`);
});
