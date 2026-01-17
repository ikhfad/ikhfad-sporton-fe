import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useState } from "react";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProductModal = ({ isOpen, onClose }: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <div className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50 aspect-square">
            <ImageUploadPreview
              value={imagePreview}
              label="Product Image"
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                name="productName"
                id="productName"
                placeholder="e.g. Running Shoes"
              />
            </div>
            <div className="flex gap-4">
              <div className="input-group-admin">
                <label htmlFor="price">Price (IDR)</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="e.g. 177013"
                />
              </div>
              <div className="input-group-admin">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  name="stock"
                  id="stock"
                  placeholder="e.g. 120"
                />
              </div>
            </div>
            <div className="input-group-admin">
              <label htmlFor="category">Category</label>
              <select name="category" id="category" defaultValue={""}>
                <option value="" disabled>
                  Select Category
                </option>
                <option value="running">Running</option>
                <option value="football">Football</option>
                <option value="tennis">Tennis</option>
                <option value="basketball">Basketball</option>
              </select>
            </div>
          </div>
        </div>
        <div className="input-group-admin">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={7}
            placeholder="Product Details..."
          ></textarea>
        </div>
        <Button className="ml-auto mt-3 rounded-lg">Create Product</Button>
      </div>
    </Modal>
  );
};

export default ProductModal;
