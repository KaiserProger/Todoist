import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1658530251780 implements MigrationInterface {
    name = 'migration1658530251780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_99f220333df04d5f74f6db26c07" UNIQUE ("name"), CONSTRAINT "PK_65480f20ffc4f826f332037ce69" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "LocalUser" ("email" character varying NOT NULL, "password" character varying NOT NULL, "attachedUserUuid" uuid, CONSTRAINT "REL_5a92c5cd92b4158dba8fd8f361" UNIQUE ("attachedUserUuid"), CONSTRAINT "PK_955fdfc635dd4704f54758ed619" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "Note" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "user_id" character varying NOT NULL, "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "completed" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_6e3cab73d5113e98cec98e8e8f7" UNIQUE ("name"), CONSTRAINT "PK_14afa65f41c27fee96a8aec5dd3" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "GoogleUser" ("googleId" character varying NOT NULL, "profileName" character varying NOT NULL, CONSTRAINT "PK_225c5126e026c9f132face48467" PRIMARY KEY ("googleId"))`);
        await queryRunner.query(`ALTER TABLE "LocalUser" ADD CONSTRAINT "FK_5a92c5cd92b4158dba8fd8f3615" FOREIGN KEY ("attachedUserUuid") REFERENCES "User"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LocalUser" DROP CONSTRAINT "FK_5a92c5cd92b4158dba8fd8f3615"`);
        await queryRunner.query(`DROP TABLE "GoogleUser"`);
        await queryRunner.query(`DROP TABLE "Note"`);
        await queryRunner.query(`DROP TABLE "LocalUser"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
