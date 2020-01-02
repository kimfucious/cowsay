import { cows } from "../data/cows";
import { setStatusCode, titleCase } from "../utils/helpers";
export const getCowsay = async (req, res, next) => {
  try {
    let { message, character } = req.body;
    let response = "";

    if (!character || !cows.includes(titleCase(character))) {
      character = "cow";
    }

    const { spawn } = require("child_process");

    if (!message) {
      const fortune = spawn("fortune");
      const cowsay = spawn("cowsay", ["-f", `${character}`]);

      fortune.stdout.pipe(cowsay.stdin);

      cowsay.stdout.on("data", data => {
        response += data.toString();
      });

      cowsay.on("close", () => {
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-control": "no-cache"
        });
        res.end(response);
      });

      cowsay.stderr.on("data", err => {
        console.log(err);
        res.end("Error " + err);
      });

      fortune.stderr.on("data", err => {
        console.log(err);
        res.end("Error " + err);
      });
    } else {
      const cowsay = spawn("cowsay", ["-f", `${character}`, `${message}`]);
      cowsay.stdout.on("data", data => {
        response += data.toString();
      });

      cowsay.on("close", () => {
        res.end(response);
      });

      cowsay.stderr.on("data", err => {
        console.log(err);
        res.end("Error " + err);
      });
    }
  } catch (err) {
    next(setStatusCode(err));
  }
};
