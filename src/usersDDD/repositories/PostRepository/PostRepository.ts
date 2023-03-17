import { Inject, Injectable, Scope } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Results } from '../../libs/core/logic';
import { Post } from '../../domains/Post';
import { PostDDDRow } from './PostDDDRow';

@Injectable({ scope: Scope.REQUEST })
export class PostRepository {
    constructor(@Inject('TRANSACTION') public transaction: Transaction) {}

    async save(post: Post) {
        try {
            console.log('save post with tx id: %O', this.transaction);
            const postDDDRow = new PostDDDRow();
            postDDDRow.title = post.title;
            postDDDRow.createdBy = post.owner.id;

            const newRow = await postDDDRow.save({
                transaction: this.transaction,
            });

            post.id = newRow.id;
            post.createdAt = newRow.createdAt;
            post.updatedAt = newRow.updatedAt;
            post.deletedAt = newRow.deletedAt;
            return Results.ok(post);
        } catch (error) {
            return Results.fail(error);
        }
    }
}
