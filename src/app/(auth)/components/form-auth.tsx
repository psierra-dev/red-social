"use client";
import AuthButton from "@/app/(auth)/components/auth-button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {usePathname, useRouter} from "next/navigation";
import {formAuthSchema} from "@/app/schema/zod";
import Link from "next/link";
import {useState} from "react";
import Loader from "@/app/components/loader";
import errorSupabase from "@/app/utils/error-supabase";
import {createClient} from "@/app/utils/supabase/client";
import InputOne from "@/app/components/input";
import AuthService from "@/app/services/auth";

type FormData = z.infer<typeof formAuthSchema>;

const FormAuth = () => {
  const pathname = usePathname();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(formAuthSchema),
  });

  const [statu, setStatu] = useState<
    "typing" | "loading" | "error" | "success"
  >("typing");
  const [errorStatus, setErrorStatus] = useState<{
    code: number;
    message: string;
  }>({code: 0, message: ""});

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const supabase = createClient();
    const authService = new AuthService(supabase);
    setStatu("loading");

    if (pathname === "/register") {
      const {error} = await authService.register(data);

      if (error === null) {
        reset();
        setStatu("success");
        router.push("/login");
        return;
      }

      handleError(error);

      return;
    }

    const {error} = await authService.login(data);

    if (error === null) {
      setStatu("success");
      router.push("/single_sign_on");
      return;
    }

    handleError(error);
  };

  const handleError = (error: any) => {
    setErrorStatus({code: error.status!, message: error.message});
    setStatu("error");
  };

  return (
    <div className="flex flex-col   rounded-xl  w-full max-w-[450px] p-2  m-2 gap-4">
      <div className=" w-full flex flex-col gap-2">
        <h2 className="text-lg ">
          {pathname === "/login" ? "Iniciar sesion" : "Crear cuenta"}
        </h2>

        <p className="text-neutral-500 text-xs">Bienvenido de nuevo</p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {pathname !== "/login" && (
          <>
            <InputOne
              variant="fullname"
              type="text"
              label=""
              name="fullName"
              register={register}
              required
              error={errors.fullName}
              text={watch("fullName")!}
            />
            <InputOne
              variant="user"
              type="text"
              label="Escriba su usuario"
              name="usuario"
              register={register}
              required
              error={errors.usuario}
              text={watch("usuario")!}
            />
          </>
        )}
        <InputOne
          variant="email"
          type="email"
          placeholder="psierra@gmail.com"
          name="email"
          register={register}
          required
          error={errors.email}
          text={watch("email")!}
          value="testdev1385@gmail.com"
        />
        <InputOne
          variant="password"
          type="password"
          placeholder="*****"
          name="password"
          register={register}
          required
          error={errors.password}
          text={watch("password")!}
          value="13853211ps@"
        />

        <div className="w-full">
          <button
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-full h-[52px] px-2 mb-1 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 text-white flex justify-center items-center text-sm"
            disabled={statu === "loading"}
          >
            {statu === "loading" ? (
              <Loader w="6" h="6" color="white" />
            ) : pathname === "/login" ? (
              "Entrar"
            ) : (
              "Registrate"
            )}
          </button>
          {statu === "error" && (
            <p className="text-xs text-center font-thin text-red-400">
              {errorSupabase(errorStatus.message)}
            </p>
          )}

          {statu === "success" && pathname === "/register" && (
            <p className="text-xs font-thin text-green-400">
              Se registro correctamente
            </p>
          )}
        </div>
      </form>
      {<AuthButton />}
      <div className=" flex justify-center">
        <p className="text-xs font-thin">
          {pathname === "/login" ? "No tienes cuenta?" : "Ya tienes cuenta?"}
          <Link href={pathname === "/login" ? "/register" : "/login"}>
            <span className=" text-sky-500 ml-2">
              {pathname === "/login" ? "Registrate" : "Iniciar sesion"}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormAuth;
