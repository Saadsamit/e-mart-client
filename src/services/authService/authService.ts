import toastTheme from "@/src/styles/toastTheme";
import { loginApi, signUpApi } from "./authApi";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

const login = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: FieldValues) => await loginApi(data),
    onSettled(data) {
      if (data?.success) {
        toast.success(data?.message, { ...toastTheme });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
    },
  });
};

const signUp = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: FieldValues) => await signUpApi(data),
    onSettled(data) {
      if (data?.success) {
        toast.success(data?.message, { ...toastTheme });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
    },
  });
};

const authService = {
  login,
  signUp,
};

export default authService;
