import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCompany1706894425569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE companies (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(150) NOT NULL,
                status INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );

            
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.companies;
        `)
    }

}
