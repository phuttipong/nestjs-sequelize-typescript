import { ApiProperty } from '@nestjs/swagger';
import { User } from '../domains/User';

export class UserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly lastName: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.name;
        this.lastName = user.lastname;
    }
}
