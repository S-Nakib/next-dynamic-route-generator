import { generateRoute } from "../index";
import { pathType } from "../types";

describe("Testing generateRoute method with valid parameters", () => {
    test("Testing single-element slug array without extension", () => {
        const path: pathType = {
            params: {
                slug: ["index"]
            }
        };
        expect(generateRoute(path)).toBe("index");
    });

    test("testing 2-element slug array without extension argument", () => {
        const path: pathType = {
            params: {
                slug: ["index", "posts"]
            }
        };
        expect(generateRoute(path)).toBe("index/posts");
    });

    test("testing with extension", () => {
        const path: pathType = {
            params: {
                slug: ["index", "posts", "typescript", "testing", "jest"]
            }
        };
        expect(generateRoute(path, "md")).toBe(
            "index/posts/typescript/testing/jest.md"
        );
    });

    test("Testing single-element slug array with extension arguement having a dot(.)", () => {
        const path: pathType = {
            params: {
                slug: ["index"]
            }
        };
        expect(generateRoute(path, ".mdx")).toBe("index.mdx");
    });
});

/*
We are using typescript so we directly can not pass invalid argument. We need to convert it to unknown first and then convert to the argument type. 
We are testing this for Javascript users. Since this type of error cann't be happened on typescript.
*/
describe("Testing parameter validation for first parameter", () => {
    test("Passing a non-object", () => {
        expect(() => generateRoute((3 as unknown) as pathType)).toThrow();
    });

    test("Passing an object without 'params' key", () => {
        expect(() =>
            generateRoute(({ id: 3 } as unknown) as pathType)
        ).toThrow();
    });

    test("Passing an object where 'params' key doesn't have a 'slug' key", () => {
        expect(() =>
            generateRoute(({ params: { id: 3 } } as unknown) as pathType)
        ).toThrow();
    });

    //'slug' should be an array. But it is not possible in javascript to check if a variable is array.
    // We can only check if it is an object.
    test("Passing an object where slug is not an object", () => {
        expect(() =>
            generateRoute(({ params: { slug: 3 } } as unknown) as pathType)
        ).toThrow();
    });
});

describe("Testing parameter validation for second parameter", () => {
    const path: pathType = {
        params: {
            slug: ["index"]
        }
    };

    test("Passing a non string value", () => {
        expect(() => {
            generateRoute(path, (3 as unknown) as string);
        }).toThrow();
    });

    test("Passing an empty string", () => {
        expect(() => {
            generateRoute(path, "");
        }).toThrow();
    });
});
