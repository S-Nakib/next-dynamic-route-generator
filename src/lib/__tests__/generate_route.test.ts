import { generateRoute } from "../generate_route";
import { generateRouteParamType } from "../../types";
import generateRouteParamValidator from "../../utils/generate_route_param_validator";

jest.mock("../../utils/generate_route_param_validator", () =>
    jest.fn().mockImplementation(() => true)
);

describe("", () => {
    test("Invalid Parameter", () => {
        const param = { params: {} } as generateRouteParamType;
        //Mocking the parameter as invalid for one case.
        (generateRouteParamValidator as jest.Mock).mockImplementationOnce(
            () => false
        );

        expect(() => {
            generateRoute(param);
        }).toThrowError();

        expect(generateRouteParamValidator).toBeCalledTimes(1);
    });

    test("Valid Parameter ", () => {
        type checkerType = {
            parameter: generateRouteParamType;
            returnedValue: ReturnType<typeof generateRoute>;
        }[];
        //This array contains some valid parameters with their expected returned value.
        const checker: checkerType = [
            {
                parameter: {
                    params: { slug: ["a", "b", "c"] },
                    queryParam: "slug"
                },
                returnedValue: "a/b/c"
            },
            {
                parameter: {
                    params: { slg: ["a", "b", "c"] },
                    queryParam: "slg",
                    dirPath: "post/z"
                },
                returnedValue: "post/z/a/b/c"
            },
            {
                parameter: {
                    params: { sug: ["a", "b", "c"] },
                    queryParam: "sug",
                    extension: ".md"
                },

                returnedValue: "a/b/c.md"
            },
            {
                parameter: {
                    params: { lug: ["a", "b", "c"] },
                    queryParam: "lug",
                    absolute: true
                },
                returnedValue: process.cwd() + "/a/b/c"
            },
            {
                parameter: {
                    params: { slu: ["a", "b", "c"] },
                    queryParam: "slu",
                    dirPath: "post",
                    extension: ".md"
                },
                returnedValue: "post/a/b/c.md"
            },
            {
                parameter: {
                    params: { sg: ["a", "b", "c"] },
                    queryParam: "sg",
                    dirPath: "post",
                    absolute: true
                },
                returnedValue: process.cwd() + "/post/a/b/c"
            },
            {
                parameter: {
                    params: { ug: ["a", "b", "c"] },
                    queryParam: "ug",
                    extension: ".md",
                    absolute: true
                },

                returnedValue: process.cwd() + "/a/b/c.md"
            },
            {
                parameter: {
                    params: { slug: ["a", "b", "c"] },
                    queryParam: "slug",
                    dirPath: "post",
                    extension: ".md",
                    absolute: true
                },

                returnedValue: process.cwd() + "/post/a/b/c.md"
            }
        ];

        checker.forEach((currentValue) => {
            expect(generateRoute(currentValue.parameter)).toBe(
                currentValue.returnedValue
            );
        });
    });
});
