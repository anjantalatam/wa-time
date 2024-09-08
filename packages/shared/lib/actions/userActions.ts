import { userStorage } from '@extension/storage';
import { User } from '@extension/storage/lib/types';

export async function addUser(user: User) {
  await userStorage.addUser(user);
  return user;
}

export async function findUserByName(name: string): Promise<User | null> {
  const users = await userStorage.get();
  const usersList = Object.values(users);

  return usersList.find(user => user.name === name) ?? null;
}

export async function deleteUserByPhone(phone: string) {
  await userStorage.deleteUser(phone);
}

export async function getAllUsers() {
  const users = await userStorage.get();
  const usersList = Object.values(users);
  return usersList;
}

export async function deleteAllUsers() {
  await userStorage.deleteStore();
}
