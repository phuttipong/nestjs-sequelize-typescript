import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { Post } from './../posts/post.entity';
import { ConfigService } from './../shared/config/config.service';
import { UserDDDRow } from '../usersDDD/repositories/UserRepository/UserDDDRow';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User, Post, UserDDDRow]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
