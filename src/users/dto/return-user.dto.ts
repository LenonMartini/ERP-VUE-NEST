
import { IsString, IsEmail, IsDate, IsNumber } from 'class-validator';


export class ReturnUserDto {
    // Usando decoradores para aplicar validações
    @IsNumber()
    id: number;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    status: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    constructor(data: Partial<ReturnUserDto>) {
        Object.assign(this, data);
    }

   
    
}
