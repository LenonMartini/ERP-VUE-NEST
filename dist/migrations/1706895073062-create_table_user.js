"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUser1706895073062 = void 0;
class CreateTableUser1706895073062 {
    async up(queryRunner) {
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

            
        `);
    }
    async down(queryRunner) {
        queryRunner.query(`
            drop table public.users;
        `);
    }
}
exports.CreateTableUser1706895073062 = CreateTableUser1706895073062;
//# sourceMappingURL=1706895073062-create_table_user.js.map