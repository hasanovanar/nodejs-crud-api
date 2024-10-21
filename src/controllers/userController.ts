import { IncomingMessage, ServerResponse } from "http";
import {
  getAllUsersFromDb,
  getUserByIdFromDb,
  addUserToDb,
  updateUserInDb,
  deleteUserFromDb,
} from "../models/userModel";
import { v4 as uuidv4, validate as validateUuid } from "uuid";

export const getUsers = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = getAllUsersFromDb();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        message: "An unexpected error occurred. Please try again later.",
      })
    );
  }
};

export const getUserById = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string
) => {
  try {
    if (!validateUuid(userId)) {
      res.statusCode = 400;      
      res.end(
        JSON.stringify({
          message: "Invalid userId",
        })
      );
      return;
    }

    const user = getUserByIdFromDb(userId);
    if (!user) {
      res.statusCode = 404;      
      res.end(
        JSON.stringify({
          message: "User not found",
        })
      );
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (error) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        message: "An unexpected error occurred. Please try again later.",
      })
    );
  }
};

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = "";

  req.on("data", (chunk) => (body += chunk));

  req.on("end", () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);

      if (!username || typeof age !== "number" || !Array.isArray(hobbies)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "Invalid or missing data" }));
        return;
      }

      try {
        const newUser = addUserToDb(username, age, hobbies);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));
      } catch (error) {
        res.statusCode = 500;
        res.end(
          JSON.stringify({
            message: "An unexpected error occurred. Please try again later.",
          })
        );
      }
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Invalid request body" }));
    }
  });
};

export const updateUser = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string
) => {
  if (!validateUuid(userId)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: "Invalid userId" }));
    return;
  }

  let body = "";

  req.on("data", (chunk) => (body += chunk));

  req.on("end", () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);

      const updatedUser = updateUserInDb(userId, username, age, hobbies);
      if (!updatedUser) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "User not found" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedUser));
    } catch (error) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          message: "An unexpected error occurred. Please try again later.",
        })
      );
    }
  });
};

export const deleteUser = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string
) => {
  if (!validateUuid(userId)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: "Invalid userId" }));
    return;
  }

  try {
    const success = deleteUserFromDb(userId);

    if (!success) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }

    res.statusCode = 204;
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        message: "An unexpected error occurred. Please try again later.",
      })
    );
  }
};
