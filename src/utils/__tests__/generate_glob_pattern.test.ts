import { getPathsParamType } from "../../types";
import generateGlobPattern from "../generate_glob_pattern";

describe("", () => {
    test("", () => {
        type checkerType = {
            parameter: getPathsParamType;
            returnedValue: ReturnType<typeof generateGlobPattern>;
        }[];

        /*This array contains some parameters and expected returned value of generate_glob_pattern
        method.*/
        const checker: checkerType = [
            {
                parameter: {
                    dirPath: "a/b",
                    queryParam: "slug",
                    extension: ".md"
                },
                returnedValue: "**/*.md"
            },

            {
                parameter: {
                    dirPath: "ab",
                    queryParam: "slug",
                    extension: "txt"
                },
                returnedValue: "**/*.txt"
            },

            {
                parameter: {
                    dirPath: "a/b",
                    queryParam: "slug",
                    extension: ".pdf",
                    globPattern: "**/*pdf"
                },
                returnedValue: "**/*.pdf"
            },

            {
                parameter: {
                    dirPath: "ab",
                    queryParam: "slug",
                    globPattern: "**/*.odt"
                },
                returnedValue: "**/*.odt"
            }
        ];

        checker.forEach((value) => {
            expect(generateGlobPattern(value.parameter)).toBe(
                value.returnedValue
            );
        });
    });
});
