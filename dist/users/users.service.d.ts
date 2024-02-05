import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserListDto } from './dto/list-user.dto';
export declare class UsersService {
    private userRepository;
    findOneByEmail(email: string): void;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<UserListDto[]>;
    findOne(id: number): Promise<UserListDto>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    userEmailExists(email: string): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
}
