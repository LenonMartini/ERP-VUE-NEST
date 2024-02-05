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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const return_user_dto_1 = require("../users/dto/return-user.dto");
const login_payload_dto_1 = require("./dtos/login-payload.dto");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.blacklist = [];
    }
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email).catch(() => undefined);
        const isMatch = await bcrypt.compare(loginDto.password, user?.password || '');
        if (!user || !isMatch) {
            throw new common_1.NotAcceptableException('Dados de autenticação inválidos');
        }
        const { password, ...userWithoutPassword } = user;
        return {
            accessToken: this.jwtService.sign({ ...new login_payload_dto_1.LoginPayload(user) }),
            user: new return_user_dto_1.ReturnUserDto(userWithoutPassword),
        };
    }
    async me(token) {
        try {
            const decodedToken = this.jwtService.verify(token);
            return {
                accessToken: token,
                user: new return_user_dto_1.ReturnUserDto(decodedToken),
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async logout(token) {
        this.blacklist.push(token);
        const isBlacklisted = await this.isTokenBlacklisted(token);
        return isBlacklisted;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map