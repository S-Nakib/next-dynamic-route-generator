import { pathsType } from "../types";

const generateParams = (allRoutes: string[]): pathsType => {
    let paths: pathsType = [];

    allRoutes.forEach((path) => {
        const slug = path.split("/");

        paths.push({
            params: { slug }
        });
    });

    return paths;
};

export default generateParams;
