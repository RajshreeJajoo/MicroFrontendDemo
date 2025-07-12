import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // ✅ CORS
  next();
});

app.use(express.static(path.join(__dirname, "dist")));

app.listen(3001, () => {
  console.log("✅ Product app running at http://localhost:3001");
});
