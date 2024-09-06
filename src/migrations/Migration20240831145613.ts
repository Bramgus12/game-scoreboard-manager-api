import { Migration } from '@mikro-orm/migrations';

export class Migration20240831145613 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `scoreboard` (`id` text not null, `scoreboard_name` text not null, primary key (`id`));');

    this.addSql('create table `user` (`id` text not null, `external_id` text not null, `first_name` text not null, `last_name` text not null, `email` text not null, primary key (`id`));');
  }

}
