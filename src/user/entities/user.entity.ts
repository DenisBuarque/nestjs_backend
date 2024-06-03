import { Role } from "../../enums/role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id', unsigned: false})
    id: number;

    @Column({ type: 'varchar', name: 'name', length: 50, nullable: true })
    name: string;

    @Column({type: 'varchar', name: 'email', length: 50, nullable: true, unique: true })
    email: string;

    @Column({type: 'varchar', name: 'password', length: 255, nullable: true })
    password: string;

    @Column({
        type: "enum",
        name: 'role',
        enum: Role,
        default: Role.User,
    })
    role: Role

    @CreateDateColumn({type: Date, name: 'createdAt'})
    createdAt?: Date;

    @UpdateDateColumn({ type: Date, name: 'updatedAt'})
    updatedAt?: Date;
}
