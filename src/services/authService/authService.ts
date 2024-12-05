import toastTheme from "@/src/styles/toastTheme";
import { loginApi } from "./authApi";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

const login = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: FieldValues) => await loginApi(data),
    onSettled(data) {
      console.log("data", data);
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
};

export default authService;
