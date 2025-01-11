import { Migration } from '@mikro-orm/migrations';

export class Migration20250111215837 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "boerenbridge_round" add column "penalty_points" int not null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "boerenbridge_round" drop column "penalty_points";');
  }

}
