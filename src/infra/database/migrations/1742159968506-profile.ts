import { MigrationInterface, QueryRunner } from 'typeorm';

export class Profile1742159968506 implements MigrationInterface {
  name = 'Profile1742159968506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "display_username" character varying(32) NOT NULL, "avatar_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "credentialsId" uuid, CONSTRAINT "REL_6b5de39605b9b74863f716e63a" UNIQUE ("credentialsId"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "FK_6b5de39605b9b74863f716e63ab" FOREIGN KEY ("credentialsId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP CONSTRAINT "FK_6b5de39605b9b74863f716e63ab"`,
    );
    await queryRunner.query(`DROP TABLE "profiles"`);
  }
}
