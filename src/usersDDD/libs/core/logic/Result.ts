interface SuccessResultBase<T> {
    value(): T;
}

interface FailureResultBase<E> {
    error(): Readonly<E>;
}

interface ResultBase<T, E> {
    isSuccess(): this is SuccessResultBase<T>;
    isFailure(): this is FailureResultBase<E>;
}

export class SuccessResult<T>
    implements SuccessResultBase<T>, ResultBase<T, never> {
    constructor(private readonly _value: T) {}

    public isSuccess(): this is SuccessResultBase<T> {
        return true;
    }

    public isFailure(): this is FailureResultBase<never> {
        return false;
    }

    public value(): T {
        return this._value;
    }
}

export class FailedResult<E>
    implements FailureResultBase<E>, ResultBase<never, E> {
    constructor(private readonly _error?: E) {}

    public isSuccess(): this is SuccessResultBase<never> {
        return false;
    }

    public isFailure(): this is FailureResultBase<E> {
        return true;
    }

    public error(): Readonly<E> {
        return this._error;
    }
}

export type Result<T, E> = SuccessResult<T> | FailedResult<E>;

export abstract class Results {
    public static ok<T>(value: T): SuccessResult<T> {
        return new SuccessResult(value);
    }

    public static void(): SuccessResult<void> {
        return Results.ok(undefined);
    }

    public static fail<E extends Error>(error: E): FailedResult<E> {
        return new FailedResult(error);
    }
}

export type SuccessFailedResult<T, E> = SuccessResult<T> | FailedResult<E>;
