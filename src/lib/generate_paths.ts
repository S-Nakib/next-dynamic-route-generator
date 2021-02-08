import { pathsType, strictParamsType, generatePathsParamType } from "../types";
import generatePathsParamValidator from "../utils/generate_paths_param_validator";

const generatePaths = (allRoutes: generatePathsParamType): pathsType => {
    if (generatePathsParamValidator(allRoutes) === false)
        throw Error(
            "Invalid Parameter on generatePaths method of 'next-dynamic-route-generator'"
        );

    let paths: pathsType = [];

    const { routes, queryParam } = allRoutes;

    routes.forEach((route) => {
        let params: strictParamsType = {};
        params[queryParam] = route.split("/");

        paths.push({
            params
        });
    });

    return paths;
};

export default generatePaths;
