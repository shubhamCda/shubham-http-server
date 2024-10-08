import http from "http";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { v4 as uuidv4 } from 'uuid';
import { statusCode } from "../data/status_code.js";



const PORT = 3001;
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
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

            case "json": {
                res.statusCode = 200;
                res.setHeader("content-type", "text/json");

                fs.readFile(path.join(__dirname, "../public/sample.json"), "utf-8", (err, data) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end("<h1>500 Internal Server Error</h1>");
                    } else {
                        res.statusCode = 200;
                        res.end(data);
                    }
                })
                break;
            }

            case "uuid": {
                res.statusCode = 200;
                const uuid = uuidv4();
                res.end(JSON.stringify(uuid));
                break;

            }

            case "status": {
                const status = req.url.split("/")[2];

                try {
                    res.statusCode = parseInt(status);
                    res.end(JSON.stringify({ [status]: statusCode[status] }))
                } catch (error) {
                    res.statusCode = 404;
                    res.end(`${status}, Invalid status code.`)
                }
                break;
            }

            case "delay": {
                const delay = req.url.split("/")[2];

                const delay_in_sec = parseInt(delay);

                try {
                    if (!isNaN(delay_in_sec)) {
                        setTimeout(() => {
                            res.statusCode = 200;
                            res.end(`response delay by ${delay_in_sec} seconds.`)
                        }, delay_in_sec * 1000);
                    }else{
                        res.statusCode = 400;
                        res.end("Invalid delay time.");
                    }
                } catch (error) {
                    res.statusCode = 404;
                    res.end("Invalid operation.")
                }
                break;
            }

            default: {

                res.statusCode = 404;
                res.end("<h1>Wrong end-point</h1>");
                break;
            }
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
