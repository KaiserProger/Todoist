import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('GoogleUser')
export class GoogleUserEntity {
  @PrimaryColumn()
  googleId: string;
  @Column()
  profileName: string;
  @OneToOne(() => UserEntity, { eager: true })
  attachedUser: UserEntity;
}
