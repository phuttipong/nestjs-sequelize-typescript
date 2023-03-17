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
import { CreatePostError, CreateUserError } from './domains/Errors';
import { PostDto } from './dto/Post.dto';
import { CreatePostDto } from './dto/CreatePost.dto';
import { CreatePost } from './usecases/CreatePost';

@Controller('usersDDD')
@ApiTags('usersDDD')
export class UsersDDDController {
    constructor(
        private readonly createUser: CreateUser,
        private readonly createPost: CreatePost,
    ) {}

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

    @Post('post')
    @ApiOkResponse({ type: PostDto })
    async post(@Body() createPostDto: CreatePostDto): Promise<PostDto> {
        const createPostResult = await this.createPost.execute({
            userEmail: createPostDto.email,
            title: createPostDto.title,
        });

        if (createPostResult.isSuccess()) {
            return new PostDto(createPostResult.value());
        } else {
            console.log(
                'UsersDDDController error: %O',
                createPostResult.error(),
            );
            switch (createPostResult.constructor) {
                case CreatePostError.UserNotFoundError:
                    throw new HttpException(
                        'User with given email not found',
                        HttpStatus.NOT_FOUND,
                    );
                default:
                    throw new HttpException(
                        createPostResult.error(),
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
            }
        }
    }
}
