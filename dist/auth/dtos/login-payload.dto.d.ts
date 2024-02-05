import { User } from 'src/users/entities/user.entity';
export declare class LoginPayload {
    id: number;
    email: string;
    constructor(user: User);
}
