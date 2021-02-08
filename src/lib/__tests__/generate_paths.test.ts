//This is an integration test, so methods are not mocked.
import generatePaths from "../generate_paths";
import { pathsType, generatePathsParamType } from "../../types";

describe("", () => {
    type checkerType = {
        parameter: generatePathsParamType;
        returnedValue: pathsType;
    }[];

    const checker: checkerType = [
        {
            parameter: {
                routes: [
                    "index",
                    "index/posts",
                    "index/posts/typescript/testing/jest"
                ],
                queryParam: "slug"
            },
            returnedValue: [
                {
                    params: {
                        slug: ["index"]
                    }
                },
                {
                    params: {
                        slug: ["index", "posts"]
                    }
                },
                {
                    params: {
                        slug: [
                            "index",
                            "posts",
                            "typescript",
                            "testing",
                            "jest"
                        ]
                    }
                }
            ]
        },
        {
            parameter: { routes: [], queryParam: "slug" },
            returnedValue: []
        }
    ];

    test("Testing generatePaths method", () => {
        checker.forEach((value) => {
            expect(generatePaths(value.parameter)).toEqual(value.returnedValue);
        });
    });
});
