import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('public.user')
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

}

export default User