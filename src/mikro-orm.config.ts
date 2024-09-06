import { Options } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { SqliteDriver } from "@mikro-orm/sqlite";

const Config: Options = {
    entities: ["./dist/entities"],
    entitiesTs: ["./src/entities"],
    dbName: "sqlite.db",
    driver: SqliteDriver,
    debug: true,
    extensions: [Migrator],
};

export default Config;
