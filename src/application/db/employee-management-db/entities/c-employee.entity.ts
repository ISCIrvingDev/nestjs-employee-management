import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { CDepartment } from './c-department.entity';
import { CEmployeeRole } from './c-employee-role.entity';

@Entity('c_employees')
export class CEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  updated_at: Date;

  @Column({ type: 'varchar', length: 5, nullable: false })
  key: string;

  @Column({ type: 'varchar', length: 35, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 35, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 35, nullable: true })
  maternal_last_name: string | null;

  @Column({ type: 'varchar', length: 13, nullable: true })
  rfc: string | null;

  @Column({ type: 'varchar', length: 18, nullable: true })
  curp: string | null;

  @Column({ type: 'varchar', length: 18, nullable: true })
  bank_account_number: string | null;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'now()',
    nullable: false,
  })
  entry_date: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  departure_date: Date | null;

  @ManyToOne(() => CDepartment, { nullable: false })
  @JoinColumn({ name: 'id_c_department' })
  department: CDepartment;

  @ManyToMany(() => CEmployeeRole, { cascade: true })
  @JoinTable({
    name: 'employee_roles', // Tabla intermedia para la relación N a N
    joinColumn: { name: 'employee_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: CEmployeeRole[];

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
    enum: ['PERMANENTE', 'POR PROYECTOS', '3 MESES', '6 MESES'],
  })
  contract_type: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
    enum: ['FIJO', 'VARIABLE', 'POR HORA', 'POR COMISIÓN'],
  })
  salary_type: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
    enum: ['MATUTINO', 'VERPERTINO', 'NOCTURNO'],
  })
  working_day: string;
}
