import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1706895073062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE users (
                id INT NOT NULL AUTO_INCREMENT,
                company_id INT NULL,
                role_id INT NULL,
                name VARCHAR(150) NOT NULL,
                email VARCHAR(150) NOT NULL,
                password VARCHAR(150) NOT NULL,
                status INT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );

            
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.users;
        `)
    }

}
