import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Note')
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column({ unique: true })
  name: string;
  @Column()
  user_id: string;
  @Column()
  text: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ default: false })
  completed: boolean;
}
