import { MigrationInterface, QueryRunner } from "typeorm";

export class FixReplyTo1746563641040 implements MigrationInterface {
    name = 'FixReplyTo1746563641040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "reply_to" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "reply_to"`);
    }

}
