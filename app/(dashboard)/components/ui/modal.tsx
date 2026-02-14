import { FiX } from "react-icons/fi";
import { useEffect } from "react";

type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: TModalProps) => {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden";
      root.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
      root.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
      root.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute w-full h-full bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-xl w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-7 py-3 border-b border-gray-200 shrink-0">
          <h3 className="font-semibold text-xl">{title}</h3>
          <button
            className="p-4 rounded-full hover:bg-gray-100 cursor-pointer"
            onClick={onClose}
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="p-7 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
