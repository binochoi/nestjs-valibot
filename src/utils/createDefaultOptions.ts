import { GlobalOptions } from "src/types/options";

export const createDefaultOptions = (options: GlobalOptions) => ({
    disableErrorMessages: false,
    ...options,
} as GlobalOptions);