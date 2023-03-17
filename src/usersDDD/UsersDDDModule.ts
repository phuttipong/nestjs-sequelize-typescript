import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersDDDProviders } from './UsersDDDProviders';
import { CreateUser } from './usecases/CreateUser';
import { UsersDDDController } from './UsersDDDController';
import { UserRepository } from './repositories/UserRepository';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersDDDController],
    providers: [CreateUser, UserRepository, ...usersDDDProviders],
    exports: [],
})
export class UsersDDDModule {}
