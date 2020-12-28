const extensionMatcher = /\.\w+$/;
import { allRoutes } from "../src/_globals";

//Mocking the glob(https://www.npmjs.com/package/glob) package
const glob = {
    //returns all mock routes from "src/_globals" with given extension
    sync: (pathWithExtenstion: string, _options: object): string[] => {
        //Getting the extension from given glob pattern(**/*.extension)
        let extensionArray = pathWithExtenstion.match(extensionMatcher);

        //If extension was given
        if (extensionArray && extensionArray.length !== 0) {
            //The extensionArray should contain at most one element
            const extension = extensionArray[0];

            //generating files of given extension from the allRoutes
            return allRoutes.map((route) => route + extension);
        }

        //If no extension was given
        return [];
    }
};

export default glob;
