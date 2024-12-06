import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const host = process.env.EMPLOYEE_MANAGEMENT_DB_HOST;
const type = process.env.EMPLOYEE_MANAGEMENT_DB_TYPE;
const port = Number(process.env.EMPLOYEE_MANAGEMENT_DB_PORT);
const username = process.env.EMPLOYEE_MANAGEMENT_DB_USERNAME;
const password = process.env.EMPLOYEE_MANAGEMENT_DB_PASSWORD;
const database = process.env.EMPLOYEE_MANAGEMENT_DB_DATABASE;

// Solamente para verificar los datos en desarrollo
console.log('\x1b[42m Employee Management Data Source \x1b[42m%s\x1b[0m');
// console.log('\x1b[32m Host: \x1b[32m', host);
// console.log('\x1b[32m Type: \x1b[32m', type);
// console.log('\x1b[32m Port: \x1b[32m', port);
// console.log('\x1b[32m Username: \x1b[32m', username);
// console.log('\x1b[32m Password: \x1b[32m', password);
// console.log('\x1b[32m Database: \x1b[32m%s\x1b[0m', database);

export const employeeManagementDataSource: TypeOrmModuleOptions = {
  type: type as any,
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  entities: ['dist/**/*.entity{.ts,.js}'], // Tiene que apuntar a "dist", para evitar problemas de ESM. Asegúrate de compilar las entidades
  migrations: [
    'dist/application/db/employee-management-db/migrations/*{.ts,.js}',
  ], // Tiene que apuntar a "dist", para evitar problemas de ESM. Asegúrate de compilar las entidades
  synchronize: false, // Migraciones requieren esto en false
  // synchronize: true, // Se recomienda usar "synchronize: true" solo en desarrollo. En producción, utiliza migraciones para manejar cambios en la base de datos
  logging: true,
};
