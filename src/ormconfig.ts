import { DataSourceOptions } from "typeorm";

export const config: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost', // Endereço do servidor MySQL
    port: 3306, // Porta padrão do MySQL
    username: 'root', // Nome de usuário do MySQL
    password: '', // Senha do MySQL
    database: 'nest', // Nome do banco de dados MySQL
    synchronize: true, // Define se o TypeORM deve sincronizar automaticamente as entidades com o banco de dados (cuidado em ambientes de produção)
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Caminho para suas entidades
}
