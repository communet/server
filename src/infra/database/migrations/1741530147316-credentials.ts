import { MigrationInterface, QueryRunner } from 'typeorm';

export class Credentials1741530147316 implements MigrationInterface {
  name = 'Credentials1741530147316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(32) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9696610f85145a37910365498f9" UNIQUE ("username"), CONSTRAINT "UQ_c286aa8e09ecff5cc756ee83214" UNIQUE ("email"), CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "credentials"`);
  }
}
