import { ReturnUserDto } from "src/users/dto/return-user.dto";
export interface ReturnLogin {
    user: ReturnUserDto;
    accessToken: string;
}
