import { Result, Results } from './Result';

export async function useResultSandbox<TValue, TError extends Error>(
  fn: (run: <T>(inner: () => Promise<Result<T, TError>>) => Promise<T>) => Promise<TValue>,
): Promise<Result<TValue, TError>> {
  try {
    return Results.ok(
      await fn(async (inner) => {
        const result = await inner();
        if (result.isFailure()) {
          throw result.error();
        }
        return result.value();
      }),
    );
  } catch (err) {
    return Results.fail(err as TError);
  }
}
