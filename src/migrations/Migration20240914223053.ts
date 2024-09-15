import { Migration } from "@mikro-orm/migrations";

export class Migration20240914223053 extends Migration {
    override async up(): Promise<void> {
        this.addSql('alter table "scoreboard" add column "game_type" varchar(255);');
        this.addSql(
            'update "scoreboard" set "game_type" = \'klaverjas\' where "game_type" is null;',
        );
        this.addSql('alter table scoreboard alter column "game_type" set not null;');
    }

    override async down(): Promise<void> {
        this.addSql('alter table "scoreboard" drop column "game_type";');
    }
}
