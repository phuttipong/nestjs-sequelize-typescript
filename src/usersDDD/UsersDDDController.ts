import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateUser } from './usecases/CreateUser';
import { UserDto } from './dto/User.dto';
import { CreateUserDto } from './dto/CreateUser.dto';
import { CreateUserError } from './domains/Errors';

@Controller('usersDDD')
@ApiTags('usersDDD')
export class UsersDDDController {
    constructor(private readonly createUser: CreateUser) {}

    @Post('register')
    @ApiOkResponse({ type: UserDto })
    async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        const createUserResult = await this.createUser.execute({
            email: createUserDto.email,
            lastname: createUserDto.lastName,
            name: createUserDto.firstName,
        });

        if (createUserResult.isSuccess()) {
            return new UserDto(createUserResult.value());
        } else {
            console.log(
                'UsersDDDController error: %O',
                createUserResult.error(),
            );
            switch (createUserResult.constructor) {
                case CreateUserError.UsernameTakenError:
                    throw new HttpException(
                        `User with email '${createUserDto.email}' already exists`,
                        HttpStatus.CONFLICT,
                    );
                default:
                    throw new HttpException(
                        createUserResult.error(),
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
            }
        }
    }
}
