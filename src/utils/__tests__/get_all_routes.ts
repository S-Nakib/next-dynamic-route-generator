import getAllRoutes from "../get_all_routes";
import { allRoutes } from "../../_globals";

describe("Testing getAllRoutes", () => {
    test("Should return all routes with .md extension", () => {
        expect(getAllRoutes("posts", "md")).toEqual(allRoutes);
    });

    test("should return all routes with .mdx extension even when users put a dot(.) before the extension", () => {
        expect(getAllRoutes("posts", ".mdx")).toEqual(allRoutes);
    });
});
