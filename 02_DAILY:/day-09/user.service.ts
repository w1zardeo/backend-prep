import { Result } from './result.js';
import { User } from './user.types.js';

export const users = new Map<string, User>();
export let currentId = 1;

users.set('1', { id: '1', name: 'Alice JS', email: 'alice@example.com' });
currentId++;

export function getUserById(id: string): Result<User, string> {
  const user = users.get(id);
  if (user) {
    return { success: true, data: user };
  }
  return { success: false, error: `User with id ${id} not found` };
}

export function incrementId(): string {
    return String(currentId++);
}
