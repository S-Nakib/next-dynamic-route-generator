import getsPaths from "../index";

/*
We are using typescript so we directly can not pass invalid argument. We need to convert it to unknown first and then convert to the argument type. 
We are testing this for Javascript users. Since this type of error cann't be happened on typescript.
*/
describe("Parameter validation testing", () => {
    test("First argument is undefined. Should throw an error", () => {
        expect(() => {
            getsPaths((undefined as unknown) as string, ".md");
        }).toThrow();
    });

    test("Second argument is undefined. Should throw an error", () => {
        expect(() => {
            getsPaths("posts", (undefined as unknown) as string);
        }).toThrow();
    });

    test("First argument is not a string. Should throw an error", () => {
        expect(() => {
            getsPaths((11 as unknown) as string, ".md");
        }).toThrow();
    });

    test("Second argument is not a string. Should throw an error", () => {
        expect(() => {
            getsPaths("posts", (11 as unknown) as string);
        }).toThrow();
    });

    test("First argument is an empty string Should throw an error", () => {
        expect(() => {
            getsPaths("", ".md");
        }).toThrow();
    });

    test("Second argument is not a string. Should throw an error", () => {
        expect(() => {
            getsPaths("posts", "");
        }).toThrow();
    });
});

import getAllRoutes from "../utils/get_all_routes";
import generatePaths from "../utils/generate_paths";

//This will be returned by Mock getAllRoutes.
//We will check later if the Mock generatePaths is called by this value
const getAllRoutesReturns = ["index", "posts/about"];

jest.mock("fs");
jest.mock("../utils/get_all_routes", () =>
    jest.fn().mockReturnValue(getAllRoutesReturns)
);
jest.mock("../utils/generate_paths", () => jest.fn());

describe("Testing if both funciton gets called for valid parameter", () => {
    test("", () => {
        getsPaths("posts", "md");
        expect(getAllRoutes).toBeCalledTimes(1);
        expect(getAllRoutes).toBeCalledWith("posts", "md");
        expect(generatePaths).toBeCalledTimes(1);
        expect(generatePaths).toBeCalledWith(getAllRoutesReturns);
    });
});
