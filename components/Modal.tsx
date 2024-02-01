import useEditModal from "@/hooks/useEdit";
import useLoginModal from "@/hooks/useLogin";
import { Icon } from "@iconify/react";
import { useAtom } from "jotai";
import { ReactElement, useCallback } from "react";
import { uploadAtom } from "./ImageUpload";

interface ModalProps {
  body?: ReactElement;
  isOpen: boolean;
  onClose: () => void;
  submit: () => void;
  toggle?: () => void;
  type?: string;
  label?: string;
  disabled?: boolean;
}

function Modal({
  body,
  isOpen,
  toggle,
  onClose,
  submit,
  disabled,
  label,
  type,
}: ModalProps) {
  const login = useLoginModal();
  const editModal = useEditModal();
  const loading = useAtom(uploadAtom);
  // console.log(loading[0]);
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    submit();
  }, [disabled, submit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bg-black/20  inset-0 z-50">
      <div className="max-h-[700px] w-screen relative overflow-y-auto top-[27%] flex-col flex m-auto translate-y-[-27%]  px-10 py-5 gap-3 rounded-xl shadow-md bg-black max-w-lg md:w-3/6 md:h-auto">
        <div className="flex justify-between items-center p-2">
          <h1 className="text-white text-[30px] font-semibold">{label}</h1>
          <Icon
            icon="jam:close"
            width={40}
            className="text-white cursor-pointer rounded-full hover:bg-white/30 transition duration-100"
            onClick={handleClose}
          />
        </div>
        {body}
        <div
          className="px-5 w-full flex  flex-col gap-5"
          onClick={handleSubmit}
        >
          <button
            className="disabled:cursor-not-allowed text-xl font-semibold hover:bg-white/80 bg-white rounded-full px-5 py-3  disabled:bg-neutral-500"
            disabled={disabled || (loading[0] as unknown as boolean)}
          >
            {type}
          </button>
        </div>
        {!editModal.isOpen && (
          <h2 className="text-zinc-400 text-center">
            {!login.isOpen
              ? "Already have an account?"
              : "First time using myhub?"}
            <span
              className="text-white hover:underline cursor-pointer ml-1"
              onClick={toggle}
            >
              {!login.isOpen ? "Sign in" : "Create an account"}
            </span>
          </h2>
        )}
      </div>
    </div>
  );
}

export default Modal;
