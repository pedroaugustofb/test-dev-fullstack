import base from "../base.api";
import { CreateUserDto } from "./dtos/create-user.dto";
import LoginDto from "./dtos/login.dto";

const auth = {
  login: async (data: LoginDto) => base.post("/auth/login", data),
  register: async (data: CreateUserDto) => base.post("/users/register", data),
};

export default auth;
