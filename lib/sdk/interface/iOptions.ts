/*
    * @returns { Options }
    * @description Interface for API options
*/
interface Options {
    key  : string; // API key
    env ?: string; // optional environment, defaults to 'api' but may be 'staging'
}

export default Options;

// Path: lib/sdk/interface/iOptions.ts
