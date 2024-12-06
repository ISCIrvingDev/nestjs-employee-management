import { MigrationInterface, QueryRunner } from "typeorm";

export class FixexToCDepartmentsAndCEmployeeRoles1733445321762 implements MigrationInterface {
    name = 'FixexToCDepartmentsAndCEmployeeRoles1733445321762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "c_employees" DROP CONSTRAINT "FK_6443d56d8d81c8002377014fe3e"`);
        await queryRunner.query(`CREATE TABLE "employee_roles" ("employee_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_8bf7f2fbc9039751cd34d9f9606" PRIMARY KEY ("employee_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04aafdf0252f05451916c4810e" ON "employee_roles" ("employee_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_13f42debabcdc155b21632097c" ON "employee_roles" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "c_employees" DROP COLUMN "id_c_employee_role"`);
        await queryRunner.query(`ALTER TABLE "employee_roles" ADD CONSTRAINT "FK_04aafdf0252f05451916c4810ec" FOREIGN KEY ("employee_id") REFERENCES "c_employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_roles" ADD CONSTRAINT "FK_13f42debabcdc155b21632097cf" FOREIGN KEY ("role_id") REFERENCES "c_employee_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_roles" DROP CONSTRAINT "FK_13f42debabcdc155b21632097cf"`);
        await queryRunner.query(`ALTER TABLE "employee_roles" DROP CONSTRAINT "FK_04aafdf0252f05451916c4810ec"`);
        await queryRunner.query(`ALTER TABLE "c_employees" ADD "id_c_employee_role" integer NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13f42debabcdc155b21632097c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04aafdf0252f05451916c4810e"`);
        await queryRunner.query(`DROP TABLE "employee_roles"`);
        await queryRunner.query(`ALTER TABLE "c_employees" ADD CONSTRAINT "FK_6443d56d8d81c8002377014fe3e" FOREIGN KEY ("id_c_employee_role") REFERENCES "c_employee_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
