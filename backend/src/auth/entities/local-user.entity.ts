import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('LocalUser')
export class LocalUserEntity {
  @PrimaryColumn()
  email: string;
  @Column()
  password: string;
  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  attachedUser: UserEntity;
}
