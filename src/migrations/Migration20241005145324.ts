import { Migration } from "@mikro-orm/migrations";

export class Migration20241005145324 extends Migration {
    override async up(): Promise<void> {
        this.addSql('alter table "klaverjas_round" add column "is_going" boolean;');
        this.addSql(
            'update "klaverjas_round" set "is_going" = false where "is_going" is null;',
        );
        this.addSql(
            'alter table klaverjas_round alter column "is_going" set not null;',
        );
    }

    override async down(): Promise<void> {
        this.addSql('alter table "klaverjas_round" drop column "is_going";');
    }
}
