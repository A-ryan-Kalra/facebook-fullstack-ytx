import { atom, useAtom } from "jotai";

const isOpenAtom = atom(false);

const useLoginModal = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
};

export default useLoginModal;
