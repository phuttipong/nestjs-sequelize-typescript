export class CreateUserInput {
    email: string;
    name: string;
    lastname: string;
}

export class User {
    public id: string;
    public name: string;
    public lastname: string;
    public email: string;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
}
