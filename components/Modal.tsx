import { Icon } from "@iconify/react";
import { ReactElement, useCallback } from "react";

interface ModalProps {
  body?: ReactElement;
  isOpen: boolean;
  onClose: () => void;
  submit: () => void;
  toggle: () => void;
  disabled?: boolean;
}

function Modal({
  body,
  isOpen,
  toggle,
  onClose,
  submit,
  disabled,
}: ModalProps) {
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
      <div className="h-screen w-screen relative top-[27%] flex-col flex m-auto translate-y-[-27%]  px-10 py-5 gap-3 rounded-xl shadow-md bg-black max-w-3xl md:w-3/6 md:h-auto">
        <div className="flex justify-between items-center p-2">
          <h1 className="text-white text-[30px] font-semibold">Login</h1>
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
          <button className="text-xl font-semibold hover:bg-white/80 mt-10 bg-white rounded-full px-5 py-3  ">
            Sign in
          </button>
        </div>
        <h2 className="text-zinc-400 text-center">
          First time using Facebook?
          <span
            className="text-white hover:underline cursor-pointer ml-1"
            onClick={toggle}
          >
            Create an account
          </span>
        </h2>
      </div>
    </div>
  );
}

export default Modal;
