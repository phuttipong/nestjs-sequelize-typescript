import { User } from './User';

export class CreatePostInput {
    userEmail: string;
    title: string;
}

export class Post {
    public id: string;
    public title: string;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
    public owner: User;
}
