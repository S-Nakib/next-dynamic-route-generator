import glob from "glob"; // glob(https://www.npmjs.com/package/glob)
import fs from "fs";
import { promisify } from "util";

const access = promisify(fs.access);
const readDirRecursive = promisify(glob);

export { access, readDirRecursive };
