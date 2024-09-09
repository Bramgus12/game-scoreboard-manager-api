import { Options } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { SqliteDriver } from "@mikro-orm/sqlite";
import fs from "fs";

fs.readdirSync(__dirname).forEach((file) => {
    console.log(file);
});

const Config: Options = {
    entities: ["./entities"],
    entitiesTs: ["./src/entities"],
    dbName: "sqlite.db",
    driver: SqliteDriver,
    debug: true,
    extensions: [Migrator],
};

export default Config;
