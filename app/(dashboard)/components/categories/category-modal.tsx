import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useState } from "react";

type TCategoriesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CategoriesModal = ({ isOpen, onClose }: TCategoriesModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Categories">
      <div className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50 aspect-square">
            <ImageUploadPreview
              value={imagePreview}
              label="Categories Image"
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="categoryName">Categories Name</label>
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                placeholder="e.g. Running"
              />
            </div>
            <div className="input-group-admin">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            placeholder="Categories Details..."
          ></textarea>
        </div>
          </div>
        </div>
        <Button className="ml-auto mt-3 rounded-lg">Create Categories</Button>
      </div>
    </Modal>
  );
};

export default CategoriesModal;
