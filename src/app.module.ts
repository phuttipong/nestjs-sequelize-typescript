import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { UsersDDDModule } from './usersDDD/UsersDDDModule';

@Module({
    imports: [UsersModule, PostsModule, SharedModule, UsersDDDModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
