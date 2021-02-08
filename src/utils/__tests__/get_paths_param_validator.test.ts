import { getPathsParamType } from "../../types";
import getPathsParamValidator from "../get_paths_param_validator";

describe("", () => {
    type parametersType = getPathsParamType[];

    test("Valid Parameter", () => {
        const parameters: parametersType = [
            {
                dirPath: "a/b",
                queryParam: "slug",
                extension: ".md"
            },

            {
                dirPath: "ab",
                queryParam: "slug",
                globPattern: "**/*.md"
            },
            {
                dirPath: "b",
                queryParam: "slug",
                extension: "md",
                globPattern: "**/*.md"
            }
        ];

        parameters.forEach((parameter) =>
            expect(getPathsParamValidator(parameter)).toBe(true)
        );
    });

    test("Invalid Parameter", () => {
        const parameters: any = [
            (3 as unknown) as getPathsParamType,
            ({} as unknown) as getPathsParamType,
            {
                dirPath: "a/b/d",
                queryParam: "slug"
            },
            {
                queryParam: "slug"
            },
            {
                dirPath: "a/b"
            },
            {
                dirPath: "",
                queryParam: "slug",
                extension: "md"
            },
            {
                dirPath: "a/n/d",
                queryParam: 4,
                extension: "md"
            },
            {
                dirPath: "a/b",
                queryParam: "",
                extension: "md"
            },
            ({
                dirPath: "a/b",
                queryParam: "slug",
                extension: 5,
                globPattern: 6
            } as unknown) as getPathsParamType,
            ({
                extension: ".md",
                globPattern: "**/*.md"
            } as unknown) as getPathsParamType,
            {
                extension: "md"
            } as getPathsParamType,
            {
                globPattern: "**/*"
            } as getPathsParamType,
            ({
                dirPath: 3,
                extension: ".md"
            } as unknown) as getPathsParamType,
            ({
                dirPath: "a/b",
                extension: {},
                globPattern: []
            } as unknown) as getPathsParamType
        ];

        parameters.forEach((parameter: any) => {
            expect(getPathsParamValidator(parameter)).toBe(false);
        });
    });
});
