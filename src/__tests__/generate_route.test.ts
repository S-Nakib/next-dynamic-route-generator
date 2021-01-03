import { generateRoute } from "../index";
import { paramsType } from "../types";

describe("Testing generateRoute method with valid parameters", () => {
    test("Testing single-element slug array without extension", () => {
        const params: paramsType = {
            slug: ["index"]
        };
        expect(generateRoute(params)).toBe("index");
    });

    test("testing 2-element slug array without extension argument", () => {
        const params: paramsType = {
            slug: ["index", "posts"]
        };
        expect(generateRoute(params)).toBe("index/posts");
    });

    test("testing with extension", () => {
        const params: paramsType = {
            slug: ["index", "posts", "typescript", "testing", "jest"]
        };
        expect(generateRoute(params, "md")).toBe(
            "index/posts/typescript/testing/jest.md"
        );
    });

    test("Testing single-element slug array with extension arguement having a dot(.)", () => {
        const params: paramsType = {
            slug: ["index"]
        };
        expect(generateRoute(params, ".mdx")).toBe("index.mdx");
    });
});

/*
We are using typescript so we directly can not pass invalid argument. We need to convert it to unknown first and then convert to the argument type. 
We are testing this for Javascript users. Since this type of error cann't be happened on typescript.
*/
describe("Testing parameter validation for first parameter", () => {
    test("Passing undefined", () => {
        expect(() =>
            generateRoute((undefined as unknown) as paramsType)
        ).toThrow();
    });

    test("Passing a non-object", () => {
        expect(() => generateRoute((3 as unknown) as paramsType)).toThrow();
    });

    test("Passing an object that doesn't have a 'slug' key", () => {
        expect(() =>
            generateRoute(({ id: 3 } as unknown) as paramsType)
        ).toThrow();
    });

    test("Passing an object where slug is not an array", () => {
        expect(() =>
            generateRoute(({ slug: 3 } as unknown) as paramsType)
        ).toThrow();
    });
});

describe("Testing parameter validation for second parameter", () => {
    const params: paramsType = {
        slug: ["index"]
    };

    test("Passing a non string value", () => {
        expect(() => {
            generateRoute(params, (3 as unknown) as string);
        }).toThrow();
    });

    test("Passing an empty string", () => {
        expect(() => {
            generateRoute(params, "");
        }).toThrow();
    });
});
