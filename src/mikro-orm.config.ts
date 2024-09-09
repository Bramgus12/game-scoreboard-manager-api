import { Options } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";

import * as DotEnv from "dotenv";

const EnvFilePath: string = `${process.cwd()}/.local.env`;
DotEnv.config({ path: EnvFilePath });

const config: Options = defineConfig({
    entities: [`${__dirname}/entities`],
    entitiesTs: ["./src/entities"],
    clientUrl: process.env.DATABASE_URL,
    debug: true,
    extensions: [Migrator],
});

export default config;
