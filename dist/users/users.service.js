"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const class_transformer_1 = require("class-transformer");
let UsersService = class UsersService {
    findOneByEmail(email) {
        throw new Error('Method not implemented.');
    }
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        try {
            const data = await this.userRepository.find();
            if (data.length > 0) {
                return data.map(user => (0, class_transformer_1.classToPlain)(user, { excludePrefixes: ['password'] }));
            }
            else {
                throw new common_1.BadRequestException('Não há dados cadastrados');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Não foi possível recuperar os dados.');
        }
    }
    async findOne(id) {
        try {
            if (id) {
                const data = await this.userRepository.findOneBy({ id: id });
                if (!data) {
                    throw new common_1.BadRequestException('Ops, Registro não encontrado na base de dados');
                }
                const { password, ...userWithoutPassword } = data;
                return (0, class_transformer_1.classToPlain)(userWithoutPassword, { excludePrefixes: ['password'] });
            }
            else {
                throw new common_1.BadRequestException('Ops!, Parametro não foi repassado');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Ops!, Não foi possivel recuperar registro da base de dados');
        }
    }
    async create(createUserDto) {
        try {
            const userExists = await this.userEmailExists(createUserDto.email);
            if (userExists) {
                throw new common_1.BadRequestException('Ops! E-mail já cadastrado na base de dados');
            }
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const newUser = { ...createUserDto, password: hashedPassword };
            await this.userRepository.save(newUser);
            return { message: 'Registro inserido com sucesso.' };
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateUserDto) {
        try {
            const user = await this.findOne(id);
            if (!user) {
                throw new common_1.NotFoundException('Usuário não encontrado');
            }
            if (updateUserDto.email) {
                if (updateUserDto.email !== user.email) {
                    const emailExists = await this.userEmailExists(updateUserDto.email);
                    if (emailExists) {
                        throw new common_1.BadRequestException('Ops! Este e-mail já está cadastrado na base de dados');
                    }
                }
            }
            if (updateUserDto.password) {
                const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
                updateUserDto.password = hashedPassword;
            }
            else {
                delete updateUserDto.password;
            }
            await this.userRepository.update(id, updateUserDto);
            return { message: 'Registro Atualizado com sucesso' };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            if (!id) {
                throw new common_1.BadRequestException('Ops!, Parametro não repassado operação cancelada');
            }
            await this.userRepository.delete(id);
            return { message: 'Registro deletado com sucesso.' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Ops!, Ocorreu um erro interno contate o suporte');
        }
    }
    async userEmailExists(email) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map