//Regex that matches extension of a file such as .txt, .md.
//It won't match extension with two dot(.) such as .tar.gz
export const extensionRegex = /\.[^.]+$/;
