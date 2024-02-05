import { Controller, Post, Body, Get, UsePipes, ValidationPipe, Req, UseGuards, Res } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnLogin } from './dtos/return-login.dto';
import { AuthGuard } from './guards/auth.guard'; 

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post('auth/login')
    async login(@Body() loginDto: LoginDto): Promise<ReturnLogin> {
        return await this.authService.login(loginDto);
    }
    
    @UseGuards(AuthGuard)
    @Get('auth/me')
    async me(@Req() req: Request): Promise<any> {
       
        // Obtenha o token JWT do cabeçalho da requisição
        const token = req.headers.authorization.split(' ')[1];

        // Decodifique o token JWT para obter as informações do usuário
        const userInfo = await this.authService.me(token);

        // Retorne as informações do usuário
        return userInfo;
    }

    @UseGuards(AuthGuard)
    @Get('auth/logout')
    async logout(@Req() req): Promise<any> {
        const token = req.headers.authorization.split(' ')[1]; 
        const isLogoutSuccessful = await this.authService.logout(token);
        return isLogoutSuccessful;
        /*try {
            const token = req.headers.authorization.split(' ')[1]; 
            const isLogoutSuccessful = await this.authService.logout(token);
            if (isLogoutSuccessful) {
                res.status(200).json({ message: 'Logout realizado com sucesso' });
            } else {
                res.status(400).json({ message: 'Falha ao realizar logout' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }*/
    }
}
