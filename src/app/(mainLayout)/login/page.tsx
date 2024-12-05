"use client";

import Link from "next/link";
import img from "@/src/assets/loginImage.jpg";
import { HiMiniXMark } from "react-icons/hi2";
import Image from "next/image";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Button from "@/src/components/UI/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import MyInput from "@/src/components/UI/MyInput";
import { LogInScheme } from "@/src/Schemas/AuthSchemas";
import authService from "@/src/services/authService/authService";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const {
    mutate: loginMutate,
    isPending,
    isSuccess,
    data,
  } = authService.login();
  const methods = useForm({
    resolver: zodResolver(LogInScheme),
    defaultValues: {
      email: "admin@gmail.com",
      password: "si2002",
    },
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    if (data?.success) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  const onSubmit = async (formData: FieldValues) => {
    await loginMutate(formData);
  };
  
  return (
    <div className="fixed inset-0 z-40 bg-black/65 flex justify-center items-center">
      <div className="w-5/6 sm:w-2/3 bg-white opacity-100 z-50 rounded-xl p-6">
        <div className="text-end">
          <Link href={"/"}>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <HiMiniXMark className="size-6" />
            </button>
          </Link>
        </div>
        <div className="flex items-center h-full">
          <div className="w-1/2 hidden lg:block">
            <Image
              src={img}
              alt="Login Image"
              width={500}
              height={500}
              className="rounded-xl"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <h3 className="text-2xl font-bold text-orange-600 text-center mb-10">
              Login
            </h3>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <MyInput label="email" type="email" />
                <MyInput label="password" type="password" />
                <Button loading={isPending} type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
