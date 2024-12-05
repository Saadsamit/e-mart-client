import { userRole, userStatus } from "@/src/const/user";

export type TcurrentUser = {
  userId: string;
  email: string;
  role: keyof typeof userRole;
};

export type TUser = {
  name: string;
  picture: string;
  status: keyof typeof userStatus;
  following: string[];
} & TcurrentUser;
