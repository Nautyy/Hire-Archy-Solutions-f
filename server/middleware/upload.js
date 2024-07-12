import multer from "multer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import path from "path";
const DataURIParser = require("datauri/parser.js");

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("file");

const dUri = new DataURIParser();
const dataUri = (req) => {
    console.log("FILE: ", req.file);
    return dUri.format(
        // path.extname(req.file.originalname).toString(),
        "jpeg",
        req.file.buffer
    );
};

export { multerUploads, dataUri };
