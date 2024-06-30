import http from "../api";
import type { APIResponse } from "../types";
import type { User, InputCreateUser, InputUpdateSchool } from "./types";

async function getUser() {
  return await http.get<APIResponse<User[]>>("register");
}

async function createUser(input: InputCreateUser) {
  return await http.post<APIResponse<User>>("register", input, {headers: {}});
}

// async function deleteSchool(id: number) {
//   return await http.delete<APIResponse<boolean>>(`school/${id}`);
// }

export default {
  getUser,
  createUser,
};