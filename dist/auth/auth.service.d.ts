import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/return-login.dto';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    [x: string]: any;
    private readonly blacklist;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<ReturnLogin>;
    me(token: string): Promise<any>;
    logout(token: string): Promise<boolean>;
}
