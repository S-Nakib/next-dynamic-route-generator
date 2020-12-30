const extensionMatcher = /\.\w+$/;
import { allRoutes } from "../src/_globals";

//Mocking the glob(https://www.npmjs.com/package/glob) package
const glob = {
    //returns all mock routes from "src/_globals" appending the given extension
    sync: (pathWithExtenstion: string, _options: object): string[] => {
        //Extracting the extension from given glob pattern(**/*.extension)
        let extensionArray = pathWithExtenstion.match(extensionMatcher);

        //The extension array will never be null, the if condition is for narrowing the type..
        if (extensionArray) {
            //The extensionArray will contain at most one element
            const extension = extensionArray[0];

            //generating files of given extension from the allRoutes
            return allRoutes.map((route) => route + extension);
        }

        //If no extension was given
        return [];
    }
};

export default glob;
