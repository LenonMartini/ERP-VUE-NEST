import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    status:string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}
