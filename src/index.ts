import getAllRoutes from "./utils/get_all_routes";
import generatePaths from "./utils/generate_paths";
import { paramsType, pathsType } from "./types";

/*
Definitions: 

paths: The 'paths' key of next.js. It is an array.
(https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required). 

params: The 'params' key of parameter of 'getStaticProps'.
https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation

route: The url string. Such as "about/about_me"


Error handling: 
Here we are handling some common error manually so that uses gets a better error message when something breaks. We are also checking type for javascript user. 

Since we are validating parameter on entrypoint, the other methods of other module need not be validated. 
*/

//getPaths returns 'paths' key for all files in given directory and type.
const getPaths = (dir: string, extension: string): pathsType => {
    //Handling some common method calling errors.
    if (
        dir === undefined ||
        extension === undefined ||
        typeof dir !== "string" ||
        typeof extension !== "string" ||
        dir === "" ||
        extension === ""
    )
        throw Error(
            "Error on calling 'getPaths' method of 'next-dynamic-route-generator' package. Call it with expected arguments. It takes two non-empty string as parameters. Both parameters are required."
        );

    //getting all the routes of 'extension' type file from the directory 'dir'.
    const allRoutes = getAllRoutes(dir, extension);

    //generating 'paths' key from all the routes and returning them.
    return generatePaths(allRoutes);
};

export default getPaths;

//generates route from given 'params' key.
export const generateRoute = (
    params: paramsType,
    extension?: string
): string => {
    //Handling error for first argument.
    if (
        (typeof params === "object" &&
            "slug" in params &&
            Array.isArray(params.slug)) === false
    )
        throw Error(
            "Error on calling 'generateRoute' method of 'next-dynamic-route-generator'. Pass the correct argument. Also on 'getStaticPaths' you should generate the 'paths' key using 'getRoute'."
        );

    /*
    Here we are assuming the params is of 'paramsType' because a custom error is thrown for other types.
    Though we couldn't check if all the elements of slug array is string. 
    */
    let route: string = "";
    if (Array.isArray(params?.slug)) route = params?.slug?.join("/");

    //Handling error for second argument.
    if (extension !== undefined) {
        if (typeof extension !== "string" || extension === "")
            throw Error(
                "Error on calling 'generateRoute' method of 'next-dynamic-route-generator'. The second argument 'extension' must be a non-empty string."
            );
        else {
            //Handling mistaken extension argument with a dot(.).
            extension = extension[0] === "." ? extension : "." + extension;
            route += extension;
        }
    }

    return route;
};
