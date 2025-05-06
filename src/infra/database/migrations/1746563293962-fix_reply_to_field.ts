import { MigrationInterface, QueryRunner } from "typeorm";

export class FixReplyToField1746563293962 implements MigrationInterface {
    name = 'FixReplyToField1746563293962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7bde54db4741c92b434f7fdd292"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "UQ_7bde54db4741c92b434f7fdd292"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "reply_to_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "reply_to_id" uuid`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "UQ_7bde54db4741c92b434f7fdd292" UNIQUE ("reply_to_id")`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7bde54db4741c92b434f7fdd292" FOREIGN KEY ("reply_to_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
