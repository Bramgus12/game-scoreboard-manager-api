import { Migration } from '@mikro-orm/migrations';

export class Migration20240914125216 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "external_id" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "scoreboard" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "scoreboard_name" varchar(255) not null, "user_id" uuid not null, constraint "scoreboard_pkey" primary key ("id"));');

    this.addSql('alter table "scoreboard" add constraint "scoreboard_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "scoreboard" drop constraint "scoreboard_user_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "scoreboard" cascade;');
  }

}
