import glob from "glob";
import fs from "fs";
import path from "path";

const getAllRoutes = (dir: string, extension: string): string[] => {
    /*
    next.js compiles code into a separate directory, so process.cwd() should be used instead of __dirname. (https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd)
    */
    const dirPath = path.join(process.cwd(), dir);

    if (fs.existsSync(dirPath) === false)
        throw Error(
            "Error on 'getPaths' method of 'next-dynamic-route-generator'. The directory that was passed as an argument doesn't exist."
        );

    //Handling mistaken extension argument with a dot(.).
    extension = extension[0] === "." ? extension : "." + extension;

    const extensionRegex = new RegExp(`${extension}$`);

    const allRoutes = glob
        //getting all the files route of given extension using glob(https://www.npmjs.com/package/glob)
        .sync(`**/*${extension}`, { cwd: dirPath })
        //removing extension
        .map((filePath) => filePath.replace(extensionRegex, ""));

    return allRoutes;
};

export default getAllRoutes;
