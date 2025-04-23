import { MigrationInterface, QueryRunner } from "typeorm";

export class Chat1745438395920 implements MigrationInterface {
    name = 'Chat1745438395920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."chat_type_enum" AS ENUM('text', 'voice')`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."chat_type_enum" NOT NULL DEFAULT 'text', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "channel_id" uuid, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_175d69bf4830772f7ddd88f1fec" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_175d69bf4830772f7ddd88f1fec"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TYPE "public"."chat_type_enum"`);
    }

}
