export type Success<T> = { success: true; data: T };
export type Failure<E> = { success: false; error: E };

export type Result<T, E> = Success<T> | Failure<E>;

export function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
  return result.success === true;
}

export function isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
  return result.success === false;
}
