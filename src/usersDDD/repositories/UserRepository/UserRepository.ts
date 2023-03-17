import { Inject, Injectable, Scope } from '@nestjs/common';
import { User } from '../../domains/User';
import { Transaction, UniqueConstraintError } from 'sequelize';
import { UserDDDRow } from './UserDDDRow';
import { CreateUserError } from '../../domains/Errors';
import { Results } from '../../libs/core/logic';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository {
    constructor(@Inject('TRANSACTION') public transaction: Transaction) {}

    async save(user: User) {
        try {
            console.log('save user with tx id: %O', this.transaction);
            const userDDDRow = new UserDDDRow();
            userDDDRow.firstName = user.name;
            userDDDRow.lastName = user.lastname;
            userDDDRow.email = user.email;

            const newRow = await userDDDRow.save({
                transaction: this.transaction,
            });

            user.id = newRow.id;
            user.createdAt = newRow.createdAt;
            user.updatedAt = newRow.updatedAt;
            user.deletedAt = newRow.deletedAt;
            return Results.ok(user);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                return new CreateUserError.UsernameTakenError(user.email);
            }
            return Results.fail(error);
        }
    }

    async findOneByEmail(email: string) {
        try {
            console.log('save user with tx id: %O', this.transaction);
            const findResult = await UserDDDRow.findOne<UserDDDRow>({
                where: { email },
            });

            const user = new User();
            user.id = findResult.id;
            user.email = findResult.email;
            user.name = findResult.firstName;
            user.lastname = findResult.lastName;
            user.createdAt = findResult.createdAt;
            user.updatedAt = findResult.updatedAt;
            user.deletedAt = findResult.deletedAt;

            return Results.ok(user);
        } catch (error) {
            return Results.fail(error);
        }
    }
}
