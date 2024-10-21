import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

let users: User[] = [];

export const getAllUsersFromDb = () => users;

export const getUserByIdFromDb = (id: string) =>
  users.find((user) => user.id === id);

export const addUserToDb = (
  username: string,
  age: number,
  hobbies: string[]
) => {
  const newUser: User = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);
  return newUser;
};

export const updateUserInDb = (
  id: string,
  username?: string,
  age?: number,
  hobbies?: string[]
) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const currentUser = users[userIndex];
    const updatedUser = {
      ...currentUser,
      ...(username !== undefined && { username }),
      ...(age !== undefined && { age }),
      ...(hobbies !== undefined && { hobbies }),
    };

    users[userIndex] = updatedUser;
    return updatedUser;
  }

  return null;
};

export const deleteUserFromDb = (id: string) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
};
