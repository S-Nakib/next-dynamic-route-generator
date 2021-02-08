import getAllRoutes from "../utils/get_all_routes";
import generatePaths from "./generate_paths";
import getPathsParamValidator from "../utils/get_paths_param_validator";
import { pathsType, getPathsParamType } from "../types";

const getPaths = async (param: getPathsParamType): Promise<pathsType> => {
    if (!getPathsParamValidator(param))
        throw Error(
            "Error on calling 'getPaths' method of 'next-dynamic-route-generator' package. The parameter is invalid."
        );

    const allRoutes = await getAllRoutes(param);

    return generatePaths({ routes: allRoutes, queryParam: param.queryParam });
};

export default getPaths;
