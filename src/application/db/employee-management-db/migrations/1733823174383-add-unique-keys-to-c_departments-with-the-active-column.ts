import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueKeysToCDepartmentsWithTheActiveColumn1733823174383 implements MigrationInterface {
    name = 'AddUniqueKeysToCDepartmentsWithTheActiveColumn1733823174383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "c_departments" DROP CONSTRAINT "UQ_1a2c04058e01d742d9cb9e5d171"`);
        await queryRunner.query(`ALTER TABLE "c_departments" ADD CONSTRAINT "UQ_5b080b501c9f94c72ce90a2343d" UNIQUE ("active", "key", "name")`);
        await queryRunner.query(`ALTER TABLE "c_departments" ADD CONSTRAINT "UQ_32e211fe2610b2e3506904fa3ac" UNIQUE ("active", "name")`);
        await queryRunner.query(`ALTER TABLE "c_departments" ADD CONSTRAINT "UQ_a6952f63b39f84a99e8260d374c" UNIQUE ("active", "key")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "c_departments" DROP CONSTRAINT "UQ_a6952f63b39f84a99e8260d374c"`);
        await queryRunner.query(`ALTER TABLE "c_departments" DROP CONSTRAINT "UQ_32e211fe2610b2e3506904fa3ac"`);
        await queryRunner.query(`ALTER TABLE "c_departments" DROP CONSTRAINT "UQ_5b080b501c9f94c72ce90a2343d"`);
        await queryRunner.query(`ALTER TABLE "c_departments" ADD CONSTRAINT "UQ_1a2c04058e01d742d9cb9e5d171" UNIQUE ("key", "name")`);
    }

}
