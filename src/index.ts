import getAllRoutes from "./utils/get_all_routes";
import generatePaths from "./utils/generate_paths";
import { pathType, pathsType } from "./types";

/*
Definitions: 

paths: The 'paths' key of next.js(https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required). It is an array.

path: The elements of 'paths' array. 

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

//generates route from given 'path'.
export const generateRoute = (path: pathType, extension?: string): string => {
    //Handling error for first argument. Here, 'slug' should be an array. But it is not possible in
    //javascript to check if a variable is array. We can only check if it is an object.
    if (
        typeof path === "object" &&
        "params" in path &&
        "slug" in path.params &&
        (typeof path.params.slug === "object") === false
    )
        throw Error(
            "Error on calling 'generateRoute' method of 'next-dynamic-route-generator'. The first argument should be the object passed as parameter to 'getStaticProps' without any changing or destructuring. Moreover, on getStaticPaths you should generate the 'paths' key by 'getRoute'."
        );

    let route = path.params.slug.join("/");

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
