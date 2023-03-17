import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { CreatePostInput, Post } from '../domains/Post';
import { PostRepository } from '../repositories/PostRepository';
import { CreatePostError, CreateUserError } from '../domains/Errors';

@Injectable()
export class CreatePost {
    constructor(
        private userRepository: UserRepository,
        private postRepository: PostRepository,
    ) {}

    // This method control transaction manually
    // see https://sequelize.org/docs/v6/other-topics/transactions/
    async execute(input: CreatePostInput) {
        let findUserResult = await this.userRepository.findOneByEmail(
            input.userEmail,
        );
        if (findUserResult.isFailure()) {
            console.log('Error on finding user: %O', findUserResult.error());
            return new CreatePostError.UserNotFoundError(input.userEmail);
        }

        console.log('Found user of email: %s', input.userEmail);
        // todo: better with to control user-post relation is by constructor or factory class
        const post = new Post();
        post.title = input.title;
        post.owner = findUserResult.value();

        const saveResult = await this.postRepository.save(post);

        if (saveResult.isSuccess()) {
            this.postRepository.transaction.commit();
            console.log('CreatePost committed');
            return saveResult;
        }

        // If the execution reaches this line, saveResult is failedResult
        // We rollback the transaction.
        await this.postRepository.transaction.rollback();
        console.log('CreatePost rollback');
        return saveResult;
    }
}
