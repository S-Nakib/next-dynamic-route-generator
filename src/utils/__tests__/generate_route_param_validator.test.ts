import { generateRouteParamType } from "../../types";
import generateRouteParamValidator from "../generate_route_param_validator";

describe("", () => {
    type parametersType = generateRouteParamType[];

    test("Valid Parameter", () => {
        const parameters: parametersType = [
            {
                params: { slug: ["a/v", "b", "c"] },
                queryParam: "slug",
                dirPath: "post"
            },

            {
                params: { slg: ["a", "b/x", "c"] },
                queryParam: "slg",
                dirPath: "post"
            },

            {
                params: { sug: ["a", "b", "r/c"] },
                queryParam: "sug",
                extension: ".md"
            },

            {
                params: { slu: ["a", "b", "c"] },
                queryParam: "slu",
                absolute: true
            },

            {
                params: { lug: ["f/a", "b", "c"] },
                queryParam: "lug",
                dirPath: "post",
                extension: ".md"
            },

            {
                params: { sg: ["a/g", "b", "c"] },
                queryParam: "sg",
                dirPath: "post",
                absolute: true
            },

            {
                params: { sl: ["a", "b/n", "c"] },
                queryParam: "sl",
                extension: ".md",
                absolute: true
            },

            {
                params: { lg: ["a", "b", "h/c"] },
                queryParam: "lg",
                dirPath: "post",
                extension: ".md",
                absolute: true
            }
        ];

        parameters.forEach((parameter) => {
            expect(generateRouteParamValidator(parameter)).toBe(true);
        });
    });

    // test("Invalid Parameter", () => {
    //     const parameters: any = [
    //         {
    //             params: {
    //                 slug: ["a"]
    //             }
    //         },
    //         {
    //             params: {
    //                 slug: ["a"]
    //             },
    //             queryParam: 3
    //         },
    //         {
    //             params: {
    //                 slug: ["a"]
    //             },
    //             queryParam: ""
    //         },
    //         {
    //             params: {
    //                 slug: []
    //             }
    //         },
    //         {
    //             params: {
    //                 slug: ["a", ""]
    //             }
    //         },
    //         ({
    //             params: {
    //                 slug: ["a", 5]
    //             }
    //         } as unknown) as generateRouteParamType,
    //         (4 as unknown) as generateRouteParamType,
    //         ({} as unknown) as generateRouteParamType,
    //         ({
    //             dirPath: "post",
    //             extension: ".md",
    //             absolute: true
    //         } as unknown) as generateRouteParamType
    //     ];

    //     parameters.forEach((parameter: generateRouteParamType) => {
    //         expect(generateRouteParamValidator(parameter)).toBe(false);
    //     });
    // });
});
