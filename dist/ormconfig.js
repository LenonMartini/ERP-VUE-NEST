"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nest',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
//# sourceMappingURL=ormconfig.js.map