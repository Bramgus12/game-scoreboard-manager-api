import { Migration } from '@mikro-orm/migrations';

export class Migration20240910183824 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "scoreboard" ("id" uuid not null, "scoreboard_name" varchar(255) not null, constraint "scoreboard_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" uuid not null, "external_id" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "scoreboard" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
