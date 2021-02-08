import { generateRouteParamType } from "../types";
//The param is of any type since javascript users may pass any param.
const generateRouteParamValidator = (param: any): boolean => {
    if (typeof param !== "object") return false;

    const {
        params,
        queryParam,
        dirPath,
        extension
    } = param as generateRouteParamType;

    if (
        typeof params !== "object" ||
        !queryParam ||
        typeof queryParam !== "string" ||
        !Array.isArray(params[queryParam]) ||
        (params[queryParam] as string[]).length === 0
    ) {
        return false;
    }

    if (dirPath && typeof dirPath !== "string") return false;

    if (extension && typeof extension !== "string") return false;

    for (let element of params[queryParam] as any[]) {
        if (typeof element !== "string" || element === "") return false;
    }

    return true;
};

export default generateRouteParamValidator;
