import glob from "glob";
import path from "path";

const getAllRoutes = (dir: string, extension: string): string[] => {
    //next.js compiles code into a separate directory, so process.cwd() should be used instead of __dirname
    const dirPath = path.join(process.cwd(), dir);

    //Handling mistaken extension input with a dot(.).
    extension = extension[0] === "." ? extension : "." + extension;

    const extensionRegex = new RegExp(`${extension}$`);

    const allRoutes = glob
        //getting all the files of given extension using glob(https://www.npmjs.com/package/glob)
        .sync(`**/*${extension}`, { cwd: dirPath })
        //removing extension
        .map((filePath) => filePath.replace(extensionRegex, ""));

    return allRoutes;
};

export default getAllRoutes;
