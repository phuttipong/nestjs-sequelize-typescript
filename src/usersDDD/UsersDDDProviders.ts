import { Sequelize } from 'sequelize-typescript';
import { Scope } from '@nestjs/common';

export const usersDDDProviders = [
    {
        provide: 'TRANSACTION',
        useFactory: (sequelizeProvider: Sequelize) => {
            return sequelizeProvider.transaction();
        },
        scope: Scope.REQUEST,
        inject: ['SEQUELIZE'],
    },
];
