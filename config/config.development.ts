import path from 'path';
import { Dialect } from 'sequelize/types';


export const config = {
    database: {
        dialect: 'sqlite' as Dialect,
        storage: path.join(__dirname, '..', 'db', 'app.sqlite'),
        logging: false,
    },
    jwtPrivateKey: 'jwtPrivateKey',
};
