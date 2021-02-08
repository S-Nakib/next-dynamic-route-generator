import { generateRouteParamType } from "../types";
import path from "path";
import generateRouteParamValidator from "../utils/generate_route_param_validator";

export const generateRoute = (param: generateRouteParamType): string => {
    if (!generateRouteParamValidator(param))
        throw Error(
            "Invalid parameter on generateRoute method of 'next-dynamic-route-generator'."
        );

    const { params, queryParam, dirPath, extension, absolute } = param;

    let route: string = "";

    /*next.js compiles code into a separate directory, so process.cwd() should be used instead of
    __dirname. (https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd)*/
    if (absolute) route = path.join(route, process.cwd());

    if (dirPath) route = path.join(route, dirPath);

    /*Here params[queryParam] is always an array of strings.
    generateRouteParamValidator would throw an error otherwise.*/
    if (params) {
        route = path.join(route, (params[queryParam] as string[]).join("/"));
    }

    if (extension) route += extension;

    return route;
};

export default generateRoute;
