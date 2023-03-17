import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserInput, User } from '../domains/User';

@Injectable()
export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    // This method control transaction manually
    // see https://sequelize.org/docs/v6/other-topics/transactions/
    async execute(input: CreateUserInput) {
        // create entity and value objects
        // if business rule failed will throw domain errors
        let user = new User();
        user.email = input.email;
        user.name = input.name;
        user.lastname = input.lastname;

        // repository may throw domain errors in case we use persistent layer to control data validity. e.g. data uniqueness
        const saveResult = await this.userRepository.save(user);

        if (saveResult.isSuccess()) {
            this.userRepository.transaction.commit();
            console.log('CreateUser committed');
            return saveResult;
        }

        // If the execution reaches this line, saveResult is failedResult
        // We rollback the transaction.
        await this.userRepository.transaction.rollback();
        console.log('CreateUser rollback');
        return saveResult;
    }
}
