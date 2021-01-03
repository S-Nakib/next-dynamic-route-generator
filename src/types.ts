//paramsType is the type of 'params' key.
export declare type paramsType = {
    [name: string]: string | string[] | undefined;
};

//pathsType is the type of 'paths' key.
export declare type pathsType = {
    params: {
        slug: string[];
    };
}[];
