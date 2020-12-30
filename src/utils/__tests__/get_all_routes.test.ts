import getAllRoutes from "../get_all_routes";
import { allRoutes } from "../../_globals";

jest.mock("fs");
jest.mock("glob");

describe("Testing getAllRoutes", () => {
    test("Should return all routes with .md extension by removing the extension", () => {
        expect(getAllRoutes("posts", "md")).toEqual(allRoutes);
    });

    test("should return all routes with .mdx extension by removing the extension even when users put a dot(.) before the extension", () => {
        expect(getAllRoutes("posts", ".mdx")).toEqual(allRoutes);
    });
});
