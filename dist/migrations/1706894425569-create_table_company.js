"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableCompany1706894425569 = void 0;
class CreateTableCompany1706894425569 {
    async up(queryRunner) {
        queryRunner.query(`
            CREATE TABLE companies (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(150) NOT NULL,
                status INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );

            
        `);
    }
    async down(queryRunner) {
        queryRunner.query(`
            drop table public.companies;
        `);
    }
}
exports.CreateTableCompany1706894425569 = CreateTableCompany1706894425569;
//# sourceMappingURL=1706894425569-create_table_company.js.map