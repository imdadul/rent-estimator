
import {Config} from "./types";
import config from "./config.json";

export const getConfig = ():Config => {
    const mode = process.env.NODE_ENV == 'prod'? 'prod':'test';
    return config[mode];
};