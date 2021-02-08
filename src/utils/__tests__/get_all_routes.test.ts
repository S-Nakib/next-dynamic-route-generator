import getAllRoutes from "../get_all_routes";
import { getPathsParamType } from "../../types";
import { readDirRecursive } from "../lib_methods";
import directoryValidator from "../directory_validator";

//Some methods are mocked and some are not. This is not an unit test.
jest.mock("../lib_methods");
jest.mock("../directory_validator");

describe("", () => {
    const parameter: getPathsParamType = {
        dirPath: "a",
        queryParam: "slug",
        extension: ".md"
    };

    (readDirRecursive as jest.Mock).mockImplementation(() => [
        "a.md",
        "b/c.md",
        "d/e/f.md"
    ]);

    test("Invalid Directory", async () => {
        (directoryValidator as jest.Mock).mockImplementation(() => false);

        await expect(getAllRoutes(parameter)).rejects.toThrowError();

        expect(readDirRecursive).toBeCalledTimes(0);
    });

    test("Valid Directory", async () => {
        (directoryValidator as jest.Mock).mockImplementation(() => true);

        await expect(getAllRoutes(parameter)).resolves.toStrictEqual([
            "a",
            "b/c",
            "d/e/f"
        ]);

        expect(readDirRecursive).toBeCalledTimes(1);
        expect(readDirRecursive).toBeCalledWith("**/*.md", {
            cwd: process.cwd() + "/" + parameter.dirPath
        });
    });
});
