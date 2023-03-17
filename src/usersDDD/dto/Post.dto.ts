import { ApiProperty } from '@nestjs/swagger';
import { User } from '../domains/User';
import { Post } from '../domains/Post';

export class PostDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly owner: string;

    constructor(post: Post) {
        this.id = post.id;
        this.owner = post.owner.email;
        this.title = post.title;
    }
}
