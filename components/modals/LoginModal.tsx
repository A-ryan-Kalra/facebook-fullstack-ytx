import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import useLoginModal from "@/hooks/useLogin";
import useRegisterModal from "@/hooks/useRegister";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

function LoginModal() {
  const login = useLoginModal();
  const register = useRegisterModal();

  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    setFlag(false);
    login.onClose();
    register.onOpen();
  }, [login, register, isLoading]);

  const router = useRouter();

  const onSubmit = useCallback(async () => {
    try {
      setIsloading(true);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      // console.log(result);
      if (result?.status !== 200) {
        setFlag(true);
        throw new Error("Invalid credentials");
      } else {
        toast.success("Signed in successfully");
        router.reload();
        setFlag(false);
      }
      login.onClose();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsloading(false);
      setEmail("");
      setPassword("");
    }
  }, [email, password, login]);

  const body = (
    <form className="flex  flex-col gap-5 px-5  py-2 ">
      <input
        type="email"
        className="h-[60px] focus:outline-none p-2 focus:ring-[2px] rounded-md ring-blue-500 focus:border-none border-zinc-600 border-2 bg-transparent text-white"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="h-[60px] focus:outline-none p-2 focus:ring-[2px] rounded-md ring-blue-500 focus:border-none border-zinc-600 border-2 bg-transparent text-white"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {flag && (
        <h1 className="text-red-500 text-center cursor-default">
          Email or Password entered wrong
        </h1>
      )}
    </form>
  );
  return (
    <Modal
      body={body}
      isOpen={login.isOpen}
      onClose={() => {
        login.onClose();
        setFlag(false);
      }}
      submit={onSubmit}
      toggle={onToggle}
      disabled={isLoading}
      label={login.isOpen ? "Login" : ""}
      type={login.isOpen ? "Sign in" : ""}
    />
  );
}

export default LoginModal;
