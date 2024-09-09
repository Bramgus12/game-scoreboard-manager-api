import { Options } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { SqliteDriver } from "@mikro-orm/sqlite";
import fs from "fs";

// log whatever is in the ./entities directory
fs.readdirSync(__dirname).forEach((file) => {
    console.log(file);
});

console.log("--------------------");

fs.readdirSync(`${__dirname}/entities`).forEach((file) => {
    console.log(file);
});

console.log("--------------------");

console.log(__dirname);

const Config: Options = {
    entities: ["./entities"],
    entitiesTs: ["./src/entities"],
    dbName: "sqlite.db",
    driver: SqliteDriver,
    debug: true,
    extensions: [Migrator],
};

export default Config;
