import { config } from "dotenv";

config();

const envs = ["DISCORD_CLIENT_ID", "DISCORD_TOKEN"] as const;

for (const env_var in envs) {
  if (!(env_var in envs)) {
    throw new Error(`Env Var: {${env_var}} not found`);
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_CLIENT_ID: string,
      DISCORD_TOKEN: string
    }
  }
}

export const env = process.env



// @ts-ignore
const _translate = require("translate-google-api");



type TranslateOptions = {
  from?: string,
  to?: string
}
export const translate: (data: string | string[], options: TranslateOptions) => Promise<string | string[]> = _translate;