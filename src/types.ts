//paramsType is the type of 'params' key. This type is taken from next.js.
type paramsType =
    | {
          [name: string]: string | string[] | undefined;
      }
    | undefined;

//This is the also type of 'params' key but a bit stricter.
//This is the actual type we will use internally.
export type strictParamsType = {
    [name: string]: string[];
};

//pathsType is the type of 'paths' key.
export type pathsType = {
    params: strictParamsType;
}[];

type getPathsParamTypeDeclaration = {
    dirPath: string;
    queryParam: string;
    extension: string;
    globPattern: string;
};
export type getPathsParamType = Readonly<
    | Pick<getPathsParamTypeDeclaration, "dirPath" | "queryParam" | "extension">
    | Pick<
          getPathsParamTypeDeclaration,
          "dirPath" | "queryParam" | "globPattern"
      >
>;

type generateRouteParamTypeDeclaration = {
    params: paramsType;
    queryParam: string;
    dirPath?: string;
    extension?: string;
    absolute?: boolean;
};
export type generateRouteParamType = Readonly<generateRouteParamTypeDeclaration>;

type generatePathsParamTypeDeclaration = {
    routes: string[];
    queryParam: string;
};
export type generatePathsParamType = Readonly<generatePathsParamTypeDeclaration>;
