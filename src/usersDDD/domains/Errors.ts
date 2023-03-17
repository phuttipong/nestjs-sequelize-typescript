import { FailedResult } from '../libs/core/logic';
import DomainError from '../libs/core/domain/DomainError';

export namespace CreateUserError {
    export class UsernameTakenError extends FailedResult<DomainError> {
        public constructor(username: string) {
            const error = new DomainError(
                `The username "${username}" has already been taken.`,
            );
            super(error);
        }

        public static create(username: string): UsernameTakenError {
            return new UsernameTakenError(username);
        }
    }

    export class EmailInvalidError extends FailedResult<DomainError> {
        public constructor(email: string) {
            const error = new DomainError(`The email "${email}" is invalid.`);
            super(error);
        }

        public static create(email: string): EmailInvalidError {
            return new EmailInvalidError(email);
        }
    }
}

export namespace CreatePostError {
    export class UserNotFoundError extends FailedResult<DomainError> {
        public constructor(email: string) {
            const error = new DomainError(
                `Can not find user of email "${email}".`,
            );
            super(error);
        }

        public static create(username: string): UserNotFoundError {
            return new UserNotFoundError(username);
        }
    }
}
