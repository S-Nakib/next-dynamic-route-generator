import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    rootDir: "build",
    testPathIgnorePatterns: ["/node_modules/", ".d.ts$"]
};

export default config;
