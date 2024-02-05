import { BadRequestException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/return-login.dto';
import { ReturnUserDto } from 'src/users/dto/return-user.dto';
import { LoginPayload } from './dtos/login-payload.dto';
import { Request } from 'express';


@Injectable()
export class AuthService {
    [x: string]: any;
    private readonly blacklist: string[] = [];
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ){} 

    async login(loginDto: LoginDto): Promise<ReturnLogin> {
        const user: User | undefined = await this.usersService.findByEmail(loginDto.email).catch(() => undefined);
        const isMatch = await bcrypt.compare(loginDto.password, user?.password || '');
    
        if (!user || !isMatch) {
            throw new NotAcceptableException('Dados de autenticação inválidos');
        }
        const { password, ...userWithoutPassword } = user;
        return {
            accessToken: this.jwtService.sign({...new LoginPayload(user)}),
            user: new ReturnUserDto(userWithoutPassword),
        };
    }

    async me(token: string): Promise<any> {
        try {
            
            // Decodifica o token JWT para obter as informações do usuário
            const decodedToken = this.jwtService.verify(token);           
            
            return {
                accessToken: token,
                user: new ReturnUserDto(decodedToken),
            };
        } catch (error) {
            // Em caso de erro na decodificação do token JWT
            throw new UnauthorizedException('Invalid token');
        }
    }
    
    async logout(token: string): Promise<boolean> {
        // Adicione o token à lista negra
        this.blacklist.push(token);        
        // Verifique se o token foi adicionado com sucesso à lista negra
        const isBlacklisted = await this.isTokenBlacklisted(token);
        return isBlacklisted;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*async login(email: string, password: string): Promise<any> {
        
        try {
            // Valida a entrada de dados
            if (!email || !password) {
                throw new BadRequestException('E-mail e senha são obrigatórios');
            }
        
            // Verifica se o e-mail fornecido existe na base de dados
            const user = await this.usersService.findByEmail(email);
            if (!user) {
                throw new NotFoundException('Dados de autenticação inválidos');
            }
        
            // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new UnauthorizedException('Senha incorreta');
            }
        
            // Gerar token de autenticação incluindo email e id do usuário
            const token = await this.gerarToken(user);
            if (!token) {
                throw new UnauthorizedException('Usuário não autorizado');
            }
            // Remover a senha do usuário antes de retorná-lo
            delete user.password;

             // Retorna o usuário e o token
            return { user, token };
        
        } catch (error) {
            throw error;
        }
    }
      
    async gerarToken(payload: User) {
        return {
            access_token: this.jwtService.sign(
                { email: payload.email, id: payload.id }, // Inclui o email e o id do usuário no payload
                {
                    secret: 'topSecret512',
                    expiresIn: '1d',
                },
            ),
        };
    }
    
    async validateToken(token: string): Promise<any> {
        try {
          // Verifica se o token é válido
          const decoded = this.jwtService.verify(token);
          // Se não houver erro, o token é válido
          return decoded;
        } catch (error) {
          // Se houver erro, o token é inválido
          throw new UnauthorizedException('Token inválido');
        }
    }*/

}
