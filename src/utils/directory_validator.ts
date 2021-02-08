import { access } from "./lib_methods";

const directoryValidator = async (
    absoluteDirPath: string
): Promise<boolean> => {
    try {
        await access(absoluteDirPath);
        return true;
    } catch (e) {
        return false;
    }
};

export default directoryValidator;
