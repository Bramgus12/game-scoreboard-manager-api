import { Migration } from '@mikro-orm/migrations';

export class Migration20250109073335 extends Migration {

  override async up(): Promise<void> {
    this.addSql('drop table if exists "boerenbridge_player_rounds" cascade;');

    this.addSql('alter table "boerenbridge_round" add column "player_id" uuid not null;');
    this.addSql('alter table "boerenbridge_round" add constraint "boerenbridge_round_player_id_foreign" foreign key ("player_id") references "boerenbridge_player" ("id") on update cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('create table "boerenbridge_player_rounds" ("boerenbridge_player_id" uuid not null, "boerenbridge_round_id" uuid not null, constraint "boerenbridge_player_rounds_pkey" primary key ("boerenbridge_player_id", "boerenbridge_round_id"));');

    this.addSql('alter table "boerenbridge_player_rounds" add constraint "boerenbridge_player_rounds_boerenbridge_player_id_foreign" foreign key ("boerenbridge_player_id") references "boerenbridge_player" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "boerenbridge_player_rounds" add constraint "boerenbridge_player_rounds_boerenbridge_round_id_foreign" foreign key ("boerenbridge_round_id") references "boerenbridge_round" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "boerenbridge_round" drop constraint "boerenbridge_round_player_id_foreign";');

    this.addSql('alter table "boerenbridge_round" drop column "player_id";');
  }

}
