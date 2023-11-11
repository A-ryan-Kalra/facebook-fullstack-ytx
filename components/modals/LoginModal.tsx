import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import useLoginModal from "@/hooks/useLogin";
import useRegisterModal from "@/hooks/useRegister";
import { signIn } from "next-auth/react";

function LoginModal() {
  const login = useLoginModal();
  const register = useRegisterModal();

  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    login.onClose();
    register.onOpen();
  }, [login, register, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsloading(true);

      await signIn("credentials", {
        email,
        password,
      });

      login.onClose();
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, login]);

  const body = (
    <form className="flex  flex-col gap-5 px-5  py-3">
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
    </form>
  );
  return (
    <Modal
      body={body}
      isOpen={login.isOpen}
      onClose={login.onClose}
      submit={onSubmit}
      toggle={onToggle}
    />
  );
}

export default LoginModal;
