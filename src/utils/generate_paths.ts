import { pathsType } from "../types";

const generatePaths = (allRoutes: string[]): pathsType => {
    let paths: pathsType = [];

    allRoutes.forEach((path) => {
        const slug = path.split("/");

        paths.push({
            params: { slug }
        });
    });

    return paths;
};

export default generatePaths;
