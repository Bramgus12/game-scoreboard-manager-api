import { Migration } from '@mikro-orm/migrations';

export class Migration20250106215429 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "boerenbridge_round" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "round_number" int not null, "guess" int not null, "is_correct" boolean not null, constraint "boerenbridge_round_pkey" primary key ("id"));');

    this.addSql('create table "boerenbridge_game" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "current_round" int not null, "points_per_correct_guess" int not null, "scoreboard_id" uuid not null, constraint "boerenbridge_game_pkey" primary key ("id"));');

    this.addSql('create table "boerenbridge_player" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "game_id" uuid not null, constraint "boerenbridge_player_pkey" primary key ("id"));');

    this.addSql('create table "boerenbridge_player_rounds" ("boerenbridge_player_id" uuid not null, "boerenbridge_round_id" uuid not null, constraint "boerenbridge_player_rounds_pkey" primary key ("boerenbridge_player_id", "boerenbridge_round_id"));');

    this.addSql('alter table "boerenbridge_game" add constraint "boerenbridge_game_scoreboard_id_foreign" foreign key ("scoreboard_id") references "scoreboard" ("id") on update cascade;');

    this.addSql('alter table "boerenbridge_player" add constraint "boerenbridge_player_game_id_foreign" foreign key ("game_id") references "boerenbridge_game" ("id") on update cascade;');

    this.addSql('alter table "boerenbridge_player_rounds" add constraint "boerenbridge_player_rounds_boerenbridge_player_id_foreign" foreign key ("boerenbridge_player_id") references "boerenbridge_player" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "boerenbridge_player_rounds" add constraint "boerenbridge_player_rounds_boerenbridge_round_id_foreign" foreign key ("boerenbridge_round_id") references "boerenbridge_round" ("id") on update cascade on delete cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "boerenbridge_player_rounds" drop constraint "boerenbridge_player_rounds_boerenbridge_round_id_foreign";');

    this.addSql('alter table "boerenbridge_player" drop constraint "boerenbridge_player_game_id_foreign";');

    this.addSql('alter table "boerenbridge_player_rounds" drop constraint "boerenbridge_player_rounds_boerenbridge_player_id_foreign";');

    this.addSql('drop table if exists "boerenbridge_round" cascade;');

    this.addSql('drop table if exists "boerenbridge_game" cascade;');

    this.addSql('drop table if exists "boerenbridge_player" cascade;');

    this.addSql('drop table if exists "boerenbridge_player_rounds" cascade;');
  }

}
