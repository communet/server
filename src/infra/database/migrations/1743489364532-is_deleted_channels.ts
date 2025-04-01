import { MigrationInterface, QueryRunner } from "typeorm";

export class IsDeletedChannels1743489364532 implements MigrationInterface {
    name = 'IsDeletedChannels1743489364532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channel" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "is_deleted"`);
    }

}
