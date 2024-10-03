import http from "http";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { statusCode } from "../data/status_code.js";
import path from "path";


const PORT = 3001;
const server = http.createServer((req, res) => {
    const url = req.url.split('/')[1];

    switch (url) {
        case "": {

            res.statusCode = 200;
            res.end("<h1>Welcome to Homepage</h1>");
            break;
        }

        case "html": {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            fs.readFile(path.join(__dirname, "../public/index.html"), "utf-8", (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.write(`${err}: file is not available.`)
                } else {
                    res.statusCode = 200;
                    res.end(data);
                }

            });
            break;
        }

        

        default: {

            res.statusCode = 404;
            res.end("<h1>Wrong end-point</h1>");
            break;
        }
    }
})


server.listen(PORT, (err) => {
    if (err) {
        console.log(`${err}: Something went wrong!`);

    } else {
        console.log(`Server is listening on port: http://localhost:${PORT}`);

    }
})
