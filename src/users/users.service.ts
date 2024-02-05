import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserListDto } from './dto/list-user.dto';import { classToPlain } from 'class-transformer';


@Injectable()
export class UsersService {
 
  findOneByEmail(email: string) {
      throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>, 
  ) {}

  async findAll() {
    try{
      const data = await this.userRepository.find();
      if(data.length > 0){
        return data.map(user => classToPlain(user, { excludePrefixes: ['password'] }) as UserListDto);        
      }else{
        throw new BadRequestException('Não há dados cadastrados');
      }     

    } catch (error){

      throw new BadRequestException('Não foi possível recuperar os dados.');
    } 
  }

  async findOne(id: number) {
    try{
      
      if(id){

        const data = await this.userRepository.findOneBy({ id: id });
        if(!data){
          throw new BadRequestException('Ops, Registro não encontrado na base de dados');
        }  
       
        // Remover a propriedade 'password' do usuário
        const { password, ...userWithoutPassword } = data;
        return classToPlain(userWithoutPassword, { excludePrefixes: ['password'] }) as UserListDto;

      }else{
        throw new BadRequestException('Ops!, Parametro não foi repassado');
      }


    }catch (error){

      throw new BadRequestException('Ops!, Não foi possivel recuperar registro da base de dados');
    }
  }  
  
  async create(createUserDto: CreateUserDto) {
    try {
      // Verificar se o e-mail já está cadastrado
      const userExists = await this.userEmailExists(createUserDto.email);
  
      if (userExists) {
       
        throw new BadRequestException('Ops! E-mail já cadastrado na base de dados');       
       
      }
  
      // Criptografar a senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = { ...createUserDto, password: hashedPassword };
  
      // Salvar o novo usuário no banco de dados
      await this.userRepository.save(newUser);
  
      return { message: 'Registro inserido com sucesso.' };
    } catch (error) {
      throw error; 
    }
  }
  
  async update(id: number, updateUserDto: UpdateUserDto) {
      try {

        //Verifica se o usuario ja existe na base de dados
        const user = await this.findOne(id);
        
        if (!user) {
          throw new NotFoundException('Usuário não encontrado');
        }

        // Verifica se o DTO de atualização inclui o campo de e-mail
        if (updateUserDto.email) {
          // Verifica se o e-mail no DTO de atualização é diferente do e-mail do usuário atual
          if (updateUserDto.email !== user.email) {
            // Verifica se o novo e-mail já está cadastrado na base de dados
            const emailExists = await this.userEmailExists(updateUserDto.email);
            if (emailExists) {
              throw new BadRequestException('Ops! Este e-mail já está cadastrado na base de dados');
            }
          }
        }

        // Verifique se o DTO de atualização inclui a senha
        if (updateUserDto.password) {
          // Se incluir, crie um hash da senha
          const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
          // Substitua a senha no DTO de atualização pelo hash criptografado
          updateUserDto.password = hashedPassword;
        } else {
          // Se a senha não estiver incluída, remova o campo da senha do DTO de atualização
          delete updateUserDto.password;
        }

        // Atualizar o usuário no banco de dados com os dados fornecidos em updateUserDto
        await this.userRepository.update(id, updateUserDto);
        return { message: 'Registro Atualizado com sucesso' };

      } catch (error) {
        throw error; 
      }
  }

  async remove(id: number) {
      try{

        if(!id){
          throw new BadRequestException('Ops!, Parametro não repassado operação cancelada');
        }
       
        await this.userRepository.delete(id);
       
        return { message: 'Registro deletado com sucesso.' };

      } catch(error){
         throw new BadRequestException('Ops!, Ocorreu um erro interno contate o suporte');
      }
  }

  async userEmailExists(email: string) {
    return await this.userRepository.findOne({ where: { email } });    
  }

  async findByEmail(email: string): Promise<User | undefined> {
   
    return this.userRepository.findOne({ where: { email } });
  }
  
}
