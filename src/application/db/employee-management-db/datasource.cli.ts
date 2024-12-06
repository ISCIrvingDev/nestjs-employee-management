import { DataSource } from 'typeorm';

export const employeeManagementDataSource = new DataSource({
  type: 'postgres', // Se tuvo que poner hardcodeado, si no, no funcionaba
  host: 'localhost', // Se tuvo que poner hardcodeado, si no, no funcionaba
  port: 5432,
  username: 'postgres', // Se tuvo que poner hardcodeado, si no, no funcionaba
  password: '123456', // Se tuvo que poner hardcodeado, si no, no funcionaba
  database: 'employee-management-db', // Se tuvo que poner hardcodeado, si no, no funcionaba
  entities: ['dist/**/*.entity{.ts,.js}'], // Tiene que apuntar a "dist", para evitar problemas de ESM. Asegúrate de compilar las entidades
  migrations: [
    'dist/application/db/employee-management-db/migrations/*{.ts,.js}',
  ], // Tiene que apuntar a "dist", para evitar problemas de ESM. Asegúrate de compilar las entidades
  synchronize: false, // Migraciones requieren esto en false
  // synchronize: true, // Se recomienda usar "synchronize: true" solo en desarrollo. En producción, siempre utilizar migraciones para manejar cambios en la base de datos
  logging: true,
});
