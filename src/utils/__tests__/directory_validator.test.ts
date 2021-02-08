import directoryValidator from "../directory_validator";
import { access } from "../lib_methods";

jest.mock("../lib_methods");

describe("", () => {
    test("Directory Exists", async () => {
        (access as jest.Mock).mockImplementation(() => Promise.resolve(true));

        await expect(directoryValidator("abc")).resolves.toBe(true);
    });

    test("Directory Doesn't exists", async () => {
        (access as jest.Mock).mockImplementation(() => {
            throw Error("error");
        });

        await expect(directoryValidator("abc")).resolves.toBe(false);
    });
});
