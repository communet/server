import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParams1746706346046 implements MigrationInterface {
    name = 'AddParams1746706346046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_6b5de39605b9b74863f716e63ab"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_175d69bf4830772f7ddd88f1fec"`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "channel_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP CONSTRAINT "FK_701317781dfa7d192aff251e011"`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP CONSTRAINT "FK_71a10831469775a1effdd85f240"`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP CONSTRAINT "UQ_38a5fd1d2472ea09ad10b0ca41f"`);
        await queryRunner.query(`ALTER TABLE "channel_members" ALTER COLUMN "profile_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "channel_members" ALTER COLUMN "channel_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "credentialsId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_27675d1d5b9dbaabc0546aeb0a1"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_859ffc7f95098efb4d84d50c632"`);
        await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "author_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "chat_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD CONSTRAINT "UQ_38a5fd1d2472ea09ad10b0ca41f" UNIQUE ("profile_id", "channel_id")`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_175d69bf4830772f7ddd88f1fec" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD CONSTRAINT "FK_701317781dfa7d192aff251e011" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD CONSTRAINT "FK_71a10831469775a1effdd85f240" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_6b5de39605b9b74863f716e63ab" FOREIGN KEY ("credentialsId") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_27675d1d5b9dbaabc0546aeb0a1" FOREIGN KEY ("author_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_859ffc7f95098efb4d84d50c632" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_859ffc7f95098efb4d84d50c632"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_27675d1d5b9dbaabc0546aeb0a1"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_6b5de39605b9b74863f716e63ab"`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP CONSTRAINT "FK_71a10831469775a1effdd85f240"`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP CONSTRAINT "FK_701317781dfa7d192aff251e011"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_175d69bf4830772f7ddd88f1fec"`);
        await queryRunner.query(`ALTER TABLE "channel_members" DROP CONSTRAINT "UQ_38a5fd1d2472ea09ad10b0ca41f"`);
        await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "chat_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "author_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_859ffc7f95098efb4d84d50c632" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_27675d1d5b9dbaabc0546aeb0a1" FOREIGN KEY ("author_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "credentialsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "channel_members" ALTER COLUMN "channel_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "channel_members" ALTER COLUMN "profile_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD CONSTRAINT "UQ_38a5fd1d2472ea09ad10b0ca41f" UNIQUE ("profile_id", "channel_id")`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD CONSTRAINT "FK_71a10831469775a1effdd85f240" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel_members" ADD CONSTRAINT "FK_701317781dfa7d192aff251e011" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "channel_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_175d69bf4830772f7ddd88f1fec" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_6b5de39605b9b74863f716e63ab" FOREIGN KEY ("credentialsId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
