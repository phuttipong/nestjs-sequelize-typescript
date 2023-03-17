import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersDDDProviders } from './UsersDDDProviders';
import { CreateUser } from './usecases/CreateUser';
import { UsersDDDController } from './UsersDDDController';
import { UserRepository } from './repositories/UserRepository';
import { CreatePost } from './usecases/CreatePost';
import { PostRepository } from './repositories/PostRepository';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersDDDController],
    providers: [
        CreateUser,
        CreatePost,
        PostRepository,
        UserRepository,
        ...usersDDDProviders,
    ],
    exports: [],
})
export class UsersDDDModule {}
