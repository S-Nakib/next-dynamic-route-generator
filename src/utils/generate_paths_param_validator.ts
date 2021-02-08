import { generatePathsParamType } from "../types";

//The param is of any type since javascript users may pass any param.
const generatePathsParamValidator = (param: any): boolean => {
    if (typeof param !== "object") return false;

    const { routes, queryParam } = param as generatePathsParamType;

    if (!Array.isArray(routes) || !queryParam || typeof queryParam !== "string")
        return false;

    for (let route of routes) {
        if (!route || typeof route !== "string") return false;
    }

    return true;
};

export default generatePathsParamValidator;
