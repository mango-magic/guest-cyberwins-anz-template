import { readFileSync } from "fs";
import data from "./public/data/dan.json" with { type: "json" };

const transcript = readFileSync(data.transcript[0], "utf-8");
console.log(transcript);