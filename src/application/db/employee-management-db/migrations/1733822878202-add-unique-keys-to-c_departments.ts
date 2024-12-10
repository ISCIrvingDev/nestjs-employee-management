import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueKeysToCDepartments1733822878202 implements MigrationInterface {
    name = 'AddUniqueKeysToCDepartments1733822878202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "c_employees" DROP CONSTRAINT "FK_9ee9470372982deefe916b043d2"`);
        await queryRunner.query(`ALTER TABLE "c_employees" RENAME COLUMN "id_c_deparment" TO "id_c_department"`);
        await queryRunner.query(`ALTER TABLE "c_departments" ADD CONSTRAINT "UQ_eabbaff7dddd20020383b860e5e" UNIQUE ("key")`);
        await queryRunner.query(`ALTER TABLE "c_departments" ADD CONSTRAINT "UQ_00d483ec7fddd2d83b2b9abcdf6" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "c_departments" ADD CONSTRAINT "UQ_1a2c04058e01d742d9cb9e5d171" UNIQUE ("key", "name")`);
        await queryRunner.query(`ALTER TABLE "c_employees" ADD CONSTRAINT "FK_466e32b1047f7299af6e5c96884" FOREIGN KEY ("id_c_department") REFERENCES "c_departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "c_employees" DROP CONSTRAINT "FK_466e32b1047f7299af6e5c96884"`);
        await queryRunner.query(`ALTER TABLE "c_departments" DROP CONSTRAINT "UQ_1a2c04058e01d742d9cb9e5d171"`);
        await queryRunner.query(`ALTER TABLE "c_departments" DROP CONSTRAINT "UQ_00d483ec7fddd2d83b2b9abcdf6"`);
        await queryRunner.query(`ALTER TABLE "c_departments" DROP CONSTRAINT "UQ_eabbaff7dddd20020383b860e5e"`);
        await queryRunner.query(`ALTER TABLE "c_employees" RENAME COLUMN "id_c_department" TO "id_c_deparment"`);
        await queryRunner.query(`ALTER TABLE "c_employees" ADD CONSTRAINT "FK_9ee9470372982deefe916b043d2" FOREIGN KEY ("id_c_deparment") REFERENCES "c_departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
