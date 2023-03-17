import {
    Table,
    Column,
    Model,
    Unique,
    IsEmail,
    DataType,
    CreatedAt,
} from 'sequelize-typescript';

export enum Action {
    create = 'create',
    update = 'update',
    delete = 'delete',
}

@Table({
    tableName: 'userDDD',
})
export class UserDDDRowRevision extends Model<UserDDDRowRevision> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column({ field: 'first_name' })
    firstName: string;

    @Column({ field: 'last_name' })
    lastName: string;

    @Column({
        type: DataType.ENUM(Action.create, Action.update, Action.delete),
    })
    action: Action;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;
}
