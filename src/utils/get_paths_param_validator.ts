import { getPathsParamType } from "../types";

//The param is of any type since javascript users may pass any param.
const getPathsParamValidator = (param: any) => {
    if (typeof param !== "object") return false;

    const { dirPath, queryParam } = param as getPathsParamType;
    let extension, globPattern;

    if ("extension" in param) extension = param.extension;

    if ("globPattern" in param) globPattern = param.globPattern;

    if (!dirPath || typeof dirPath !== "string") return false;

    if (!queryParam || typeof queryParam !== "string") return false;

    if (!extension && !globPattern) return false;

    //The extension key precedes the globPattern key.
    if (extension) {
        if (typeof extension !== "string") return false;
    } else {
        if (typeof globPattern !== "string") return false;
    }

    return true;
};
export default getPathsParamValidator;
