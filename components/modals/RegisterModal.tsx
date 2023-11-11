import React, { useCallback, useState } from "react";
import useRegisterModal from "@/hooks/useRegister";
import Modal from "../Modal";
import useLoginModal from "@/hooks/useLogin";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

function RegisterModal() {
  const register = useRegisterModal();
  const login = useLoginModal();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    register.onClose();
    login.onOpen();
  }, [login, register, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsloading(true);

      await axios.post("/api/register", {
        name,
        username,
        password,
        email,
      });

      setIsloading(false);

      toast.success("Account created.");

      signIn("credentials", {
        email,
        password,
        // redirect: false,
      });

      setName("");
      setEmail("");
      setUsername("");
      setPassword("");

      register.onClose();
    } catch (error) {
      toast.error("Something went wrong");

      console.log(error);
    } finally {
      setIsloading(false);
    }
  }, [username, name, email, password, register]);

  const body = (
    <form className="flex  flex-col gap-5 px-5  py-3">
      <input
        type="text"
        className="h-[60px] focus:outline-none p-2 focus:ring-[2px] rounded-md ring-blue-500 focus:border-none border-zinc-600 border-2 bg-transparent text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        className="h-[60px] focus:outline-none p-2 focus:ring-[2px] rounded-md ring-blue-500 focus:border-none border-zinc-600 border-2 bg-transparent text-white"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="h-[60px] focus:outline-none p-2 focus:ring-[2px] rounded-md ring-blue-500 focus:border-none border-zinc-600 border-2 bg-transparent text-white"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
      toggle={onToggle}
      isOpen={register.isOpen}
      onClose={register.onClose}
      submit={onSubmit}
      disabled={isLoading}
    />
  );
}

export default RegisterModal;
