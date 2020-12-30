import generatePaths from "../generate_paths";
import { pathsType } from "../../types";

const argumentRoutes: string[] = [
    "index",
    "index/posts",
    "index/posts/typescript/testing/jest"
];

const returnedPaths: pathsType = [
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
            slug: ["index", "posts", "typescript", "testing", "jest"]
        }
    }
];

test("Testing generatePaths method", () => {
    expect(generatePaths(argumentRoutes)).toEqual(returnedPaths);
});
