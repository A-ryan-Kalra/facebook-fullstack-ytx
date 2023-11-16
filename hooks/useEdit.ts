import { atom, useAtom } from "jotai";

const isOpenAtom = atom(false);

const useEditModal = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return {
    isOpen,
    onClose,
    onOpen,
  };
};

export default useEditModal;
