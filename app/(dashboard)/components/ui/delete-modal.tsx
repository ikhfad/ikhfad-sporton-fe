import Button from "@/app/(landing)/components/ui/button";
import Modal from "./modal";

type TDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({ isOpen, onClose, onConfirm }: TDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Item">
      <p className="text-center">
        Are you sure you want to <span className="text-red-500">delete</span>{" "}
        this item? If you click &quot;
        <span className="text-red-500">YES, DELETE IT!</span>&quot;, it will
        permanently <span className="text-red-500">removed</span>.
      </p>
      <div className="flex gap-5 mt-5">
        <Button className="w-full rounded-md" onClick={onConfirm}>
          YES, DELETE IT!
        </Button>
        <Button variant="ghost" className="w-full rounded-md" onClick={onClose}>
          CANCEL
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
