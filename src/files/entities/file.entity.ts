import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'files'})
export class FileEntity {
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({type: 'varchar', name: 'fileName', nullable: false, unique: true})
    fileName: string
    
    @Column({type: 'int', name: 'contentLength', nullable: false})
    contentLength: number

    @Column({type: 'varchar', name: 'contentType', nullable: false})
    contentType: string

    @Column({type: 'varchar', name: 'url', nullable: false})
    url: string

    @CreateDateColumn({type: Date, name: 'createdAt'})
    createdAt?: Date

    @UpdateDateColumn({type: Date, name: 'updatedAt'})
    updatedAt?: Date
}
