import { IncomingMessage, ServerResponse } from "http";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/userController";
import { parse } from "url";

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;
  const parsedUrl = parse(url || "", true);
  const path = parsedUrl.pathname;

  if (path === "/api/users" && method === "GET") {
    getUsers(req, res);
  } else if (path?.startsWith("/api/users/") && method === "GET") {
    const userId = path.split("/")[3];
    getUserById(req, res, userId);
  } else if (path === "/api/users" && method === "POST") {
    createUser(req, res);
  } else if (path?.startsWith("/api/users/") && method === "PUT") {
    const userId = path.split("/")[3];
    updateUser(req, res, userId);
  } else if (path?.startsWith("/api/users/") && method === "DELETE") {
    const userId = path.split("/")[3];
    deleteUser(req, res, userId);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
}
