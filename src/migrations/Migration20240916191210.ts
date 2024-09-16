import { Migration } from '@mikro-orm/migrations';

export class Migration20240916191210 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "klaverjas_round" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "round_number" int not null, "points" int not null, "fame" int not null, "is_pit" boolean not null, "is_wet" boolean not null, "klaverjas_team_id" uuid not null, constraint "klaverjas_round_pkey" primary key ("id"));');

    this.addSql('alter table "klaverjas_round" add constraint "klaverjas_round_klaverjas_team_id_foreign" foreign key ("klaverjas_team_id") references "klaverjas_team" ("id") on update cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "klaverjas_round" cascade;');
  }

}
