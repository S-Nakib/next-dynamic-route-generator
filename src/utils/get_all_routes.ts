import path from "path";
import { getPathsParamType } from "../types";
import directoryValidator from "./directory_validator";
import generateGlobPattern from "./generate_glob_pattern";
import { readDirRecursive } from "./lib_methods";
import { extensionRegex } from "../_globals";

const getAllRoutes = async (param: getPathsParamType): Promise<string[]> => {
    const { dirPath } = param;

    /*
    next.js compiles code into a separate directory, so process.cwd() should be used instead of __dirname. (https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd)
    */
    const absoluteDirPath = path.join(process.cwd(), dirPath);

    //It will throw an error with the error message if the directory is not accessible.
    if (!(await directoryValidator(absoluteDirPath)))
        throw Error(
            //This method is called by 'getPaths' method which is invoked by the user.
            "Error on 'getPaths' method of 'next-dynamic-route-generator'. Can not access the directory."
        );

    const globPattern = generateGlobPattern(param);

    const allRoutes =
        //getting all the files on the given directory path.
        (await readDirRecursive(globPattern, { cwd: absoluteDirPath }))
            //removing extension
            .map((filePath) => filePath.replace(extensionRegex, ""));

    return allRoutes;
};

export default getAllRoutes;
