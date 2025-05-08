import { MigrationInterface, QueryRunner } from "typeorm";

export class TimezoneToTimezonetz1746731934779 implements MigrationInterface {
    name = 'TimezoneToTimezonetz1746731934779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "channel" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "channel" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credentials" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "channel" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "channel" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
