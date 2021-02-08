import getsPaths from "../get_paths";
import getAllRoutes from "../../utils/get_all_routes";
import generatePaths from "../generate_paths";
import getPathsParamValidator from "../../utils/get_paths_param_validator";
import { getPathsParamType, pathsType } from "../../types";

const allRoutes: string[] = ["a", "b/c"];
const generatePathsReturns: pathsType = [
    {
        params: {
            slug: ["a"]
        }
    },
    {
        params: {
            slug: ["b", "c"]
        }
    }
];

jest.mock("../../utils/get_all_routes", () =>
    jest.fn().mockReturnValue(Promise.resolve(allRoutes))
);

jest.mock("../generate_paths", () =>
    jest.fn().mockReturnValue(generatePathsReturns)
);

jest.mock("../../utils/get_paths_param_validator", () => jest.fn());

describe("", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Valid parameter", async () => {
        const getPathsParameter: getPathsParamType = {
            dirPath: "index/post",
            queryParam: "slug",
            extension: ".md"
        };

        //Mocking the parameter as Valid
        (getPathsParamValidator as jest.Mock).mockImplementation(() => true);

        expect(await getsPaths(getPathsParameter)).toEqual(
            generatePathsReturns
        );

        expect(getPathsParamValidator).toBeCalledTimes(1);
        expect(getPathsParamValidator).toBeCalledWith(getPathsParameter);

        expect(getAllRoutes).toBeCalledTimes(1);
        expect(getAllRoutes).toBeCalledWith(getPathsParameter);

        expect(generatePaths).toBeCalledTimes(1);
        expect(generatePaths).toBeCalledWith({
            routes: allRoutes,
            queryParam: "slug"
        });
    });

    test("Invalid parameter.", async () => {
        const getPathsParameter: any = {
            dirPath: "index/post"
        };

        //Mocking the parameter as Invalid.
        (getPathsParamValidator as jest.Mock).mockImplementation(() => false);

        await expect(getsPaths(getPathsParameter)).rejects.toThrowError();

        expect(getPathsParamValidator).toBeCalledTimes(1);
        expect(getPathsParamValidator).toBeCalledWith(getPathsParameter);

        expect(getAllRoutes).toBeCalledTimes(0);
        expect(generatePaths).toBeCalledTimes(0);
    });
});
