import { MigrationInterface, QueryRunner } from "typeorm";

export class ChannelMembers1745055088804 implements MigrationInterface {
    name = 'ChannelMembers1745055088804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "channel_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_connected" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "profile_id" uuid, "channel_id" uuid, CONSTRAINT "UQ_38a5fd1d2472ea09ad10b0ca41f" UNIQUE ("profile_id", "channel_id"), CONSTRAINT "PK_95976b619edca48aed364c70c36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD CONSTRAINT "FK_701317781dfa7d192aff251e011" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD CONSTRAINT "FK_71a10831469775a1effdd85f240" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channel_members" DROP CONSTRAINT "FK_71a10831469775a1effdd85f240"`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP CONSTRAINT "FK_701317781dfa7d192aff251e011"`);
        await queryRunner.query(`DROP TABLE "channel_members"`);
    }

}
