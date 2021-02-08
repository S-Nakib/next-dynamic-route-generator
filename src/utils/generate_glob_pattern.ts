import { getPathsParamType } from "../types";

const generateGlobPattern = (param: getPathsParamType) => {
    // const { extension, globPattern } = param;

    if ("extension" in param) {
        const { extension } = param;
        const validExtension =
            //The user may or may not add a dot(.), so we are explicitly adding a dot(.).
            extension[0] === "." ? extension : "." + extension;

        return "**/*" + validExtension;
    } else if ("globPattern" in param)
        return param.globPattern; /*If the extension is falsy then globPattern is always a string, else the getPathsParamValidator would throw an error*/

    //This program will bever come here, it's  //just for typescript.
    return "";
};

export default generateGlobPattern;
