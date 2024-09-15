import { Migration } from '@mikro-orm/migrations';

export class Migration20240914225925 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "klaverjas_team" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "type" varchar(255) not null, "name" varchar(255) not null, "scoreboard_id" uuid not null, constraint "klaverjas_team_pkey" primary key ("id"));');

    this.addSql('alter table "klaverjas_team" add constraint "klaverjas_team_scoreboard_id_foreign" foreign key ("scoreboard_id") references "scoreboard" ("id") on update cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "klaverjas_team" cascade;');
  }

}
