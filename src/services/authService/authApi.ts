"use server";

import axiosInstance from "@/src/libs/axios";
import { TcurrentUser } from "@/src/types/userType";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const signUpApi = async (payload: FieldValues) => {
  const { data } = await axiosInstance.post(`/auth/signup`, payload);
  return data;
};

export const loginApi = async (payload: FieldValues) => {
  const { data } = await axiosInstance.post(`/auth/login`, payload);
  if (data?.token) {
    cookies().set("token", `${data?.token}`);
  }
  return data;
};

export const LogOut = async () => {
  await cookies().delete("token");
};

export const getCurrentUser = () => {
  const token = cookies().get("token")?.value;
  let decoded: TcurrentUser | null = null;
  if (token) {
    decoded = jwtDecode(token as string);
  }
  return decoded;
};
