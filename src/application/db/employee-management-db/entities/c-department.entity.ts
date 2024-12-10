import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity('c_departments')
@Unique(['active', 'key']) // Restricción de unicidad compuesta
@Unique(['active', 'name']) // Restricción de unicidad compuesta
@Unique(['active', 'key', 'name']) // Restricción de unicidad compuesta
export class CDepartment {
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

  @Column({ type: 'varchar', length: 5, nullable: false, unique: true }) // Unicidad individual
  key: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true }) // Unicidad individual
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string | null;
}
