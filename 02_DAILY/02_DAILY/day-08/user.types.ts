// Опис інтерфейсу User (як він є в нашій базі)
export interface User {
  id: string;
  name: string;
  email: string;
}

// Data Transfer Object: те, що приходить від клієнта (без ID)
export type CreateUserDto = Omit<User, 'id'>;

/**
 * Runtime Type Guard функція.
 * Дозволяє TypeScript безпечно зменшити (narrow) тип з unknown до CreateUserDto
 */
export function isCreateUserDto(data: unknown): data is CreateUserDto {
  // 1. Спочатку переконуємося, що data це взагалі об'єкт, і він не null
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  // 2. Тепер, коли ми знаємо що це об'єкт, можна перевірити специфічні поля.
  // Завдяки Record ми "пробиваємо" type safety, щоб доступитися до динамічних полів.
  const dto = data as Record<string, unknown>;

  // 3. Перевірка name (чи існує і чи є рядком)
  if (typeof dto.name !== 'string' || dto.name.trim() === '') {
    return false;
  }

  // 4. Перевірка email (чи існує і чи є рядком)
  if (typeof dto.email !== 'string' || dto.email.trim() === '') {
    return false;
  }

  // Якщо всі перевірки пройдено — ми на 100% впевнені, що це CreateUserDto!
  return true;
}
