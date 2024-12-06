import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCDepartmentsAndCEmployeeRolesAndCEmployeesEntoties1733435300169 implements MigrationInterface {
    name = 'AddCDepartmentsAndCEmployeeRolesAndCEmployeesEntoties1733435300169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "c_employee_roles" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying(5) NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(500), CONSTRAINT "PK_a5db82d53916cb0659e1fd0646d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "c_departments" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying(5) NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(500), CONSTRAINT "PK_a3537ede0d88352a15e0e167b05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "c_employees" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying(5) NOT NULL, "name" character varying(35) NOT NULL, "last_name" character varying(35) NOT NULL, "maternal_last_name" character varying(35), "rfc" character varying(13), "curp" character varying(18), "bank_account_number" character varying(18), "entry_date" TIMESTAMP NOT NULL DEFAULT now(), "departure_date" TIMESTAMP, "contract_type" character varying(25) NOT NULL, "salary_type" character varying(25) NOT NULL, "working_day" character varying(25) NOT NULL, "id_c_deparment" integer NOT NULL, "id_c_employee_role" integer NOT NULL, CONSTRAINT "PK_55e05fffeeeb6841a262700631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "c_employees" ADD CONSTRAINT "FK_9ee9470372982deefe916b043d2" FOREIGN KEY ("id_c_deparment") REFERENCES "c_departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "c_employees" ADD CONSTRAINT "FK_6443d56d8d81c8002377014fe3e" FOREIGN KEY ("id_c_employee_role") REFERENCES "c_employee_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "c_employees" DROP CONSTRAINT "FK_6443d56d8d81c8002377014fe3e"`);
        await queryRunner.query(`ALTER TABLE "c_employees" DROP CONSTRAINT "FK_9ee9470372982deefe916b043d2"`);
        await queryRunner.query(`DROP TABLE "c_employees"`);
        await queryRunner.query(`DROP TABLE "c_departments"`);
        await queryRunner.query(`DROP TABLE "c_employee_roles"`);
    }

}
