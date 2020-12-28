import getAllPaths from "./utils/get_all_routes";
import generateParams from "./utils/generate_params";
import { pathType, pathsType } from "./types";

//returns 'paths' key for all files in given directory and type.
export const getPaths = (dir: string, extension: string): pathsType => {
    //getting all the paths of 'extension' type file from the directory 'dir'.
    const allPaths = getAllPaths(dir, extension);

    //generating 'paths' key from all the paths and returning them.
    return generateParams(allPaths);
};

//generates route from given 'path' where path is the elements of 'paths' key.
export const generateRoute = (path: pathType): string => {
    return path.params.slug.join("/");
};
