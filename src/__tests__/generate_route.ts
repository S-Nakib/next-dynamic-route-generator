import { generateRoute } from "../index";
import { pathType } from "../types";

describe("Testing generateRoute function", () => {
    test("Testing single-element slug array", () => {
        const path: pathType = {
            params: {
                slug: ["index"]
            }
        };
        expect(generateRoute(path)).toBe("index");
    });

    test("testing 2-element slug array", () => {
        const path: pathType = {
            params: {
                slug: ["index", "posts"]
            }
        };
        expect(generateRoute(path)).toBe("index/posts");
    });

    test("testing mulitple-element slug array", () => {
        const path: pathType = {
            params: {
                slug: ["index", "posts", "typescript", "testing", "jest"]
            }
        };
        expect(generateRoute(path)).toBe("index/posts/typescript/testing/jest");
    });
});
