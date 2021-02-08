import generatePathsParamValidator from "../generate_paths_param_validator";
import { generatePathsParamType } from "../../types";

describe("", () => {
    test("Valid Parameter", () => {
        const parameters: generatePathsParamType[] = [
            {
                routes: [
                    "index",
                    "index/posts",
                    "index/posts/typescript/testing/jest"
                ],
                queryParam: "slug"
            },
            {
                routes: ["a", "b", "c"],
                queryParam: "id"
            }
        ];

        parameters.forEach((parameter) => {
            expect(generatePathsParamValidator(parameter)).toBe(true);
        });
    });

    test("Invalid Parameter", () => {
        const parameters: any[] = [
            3,
            {},
            {
                routes: ["a"],
                queryParam: 4
            },
            {
                routes: ["a"]
            },

            {
                routes: ["a", "n"],
                queryParam: ""
            },
            {
                routes: [3, "a", "b"],
                queryParam: "a"
            },
            {
                routes: [["a", "b"]],
                queryParam: "b"
            },
            {
                routes: [{}, "a"],
                queryParam: "ab"
            },
            {
                routes: [undefined, "a", "b"],
                queryParam: "p"
            },
            {
                routes: ["", "a", "b"],
                queryParam: "abd"
            }
        ];

        parameters.forEach((parameter) => {
            expect(generatePathsParamValidator(parameter)).toBe(false);
        });
    });
});
