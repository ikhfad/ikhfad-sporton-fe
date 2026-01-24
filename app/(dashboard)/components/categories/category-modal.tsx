import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { toast } from "react-toastify";
import {
  createCategory,
  updateCategory,
} from "@/app/services/category.service";

type TCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: Category | null;
};

type CategoryFormData = {
  name: string;
  description: string;
};

const CategoryModal = ({
  isOpen,
  onClose,
  onSuccess,
  category,
}: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });
  const isEditMode = !!category;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Category name is required.";

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!isEditMode && !imageFile) {
      newErrors.image = "Category image is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setErrors({});
    if (isEditMode && isOpen) {
      setFormData({
        name: category.name,
        description: category.description,
      });
      setImagePreview(
        category.imageUrl ? getImageUrl(category.imageUrl) : null,
      );
    } else if (isOpen) {
      setFormData({
        name: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isEditMode, isOpen, category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    setErrors((prev) => {
      if (!prev[id]) return prev;
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await updateCategory(category._id, data);
      } else {
        await createCategory(data);
      }

      // Reset Form Data
      setFormData({
        name: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);

      toast.success(
        isEditMode
          ? "Category updated successfully!"
          : "Category created successfully!",
      );

      onSuccess?.();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error("Something went wrong, please try again later.");
        toast.error("Something went wrong, please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Category" : "Add New Category"}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex gap-7">
            <div className="min-w-50 aspect-square">
              <ImageUploadPreview
                value={imagePreview}
                className={`${errors.image ? "border-red-500! ring-2 ring-red-500! bg-red-500/15! rounded-lg" : ""}`}
                alt={`${formData.name} Image`}
                onChange={(file) => {
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));

                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.image;
                    return newErrors;
                  });
                }}
              />
              {errors.image && (
                <span className="text-xs text-red-500">{errors.image}</span>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="input-group-admin">
                <label
                  htmlFor="name"
                  className={errors.name ? "text-red-500" : ""}
                >
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={
                    errors.name ? "border-red-500! ring-1 ring-red-500!" : ""
                  }
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Running"
                />
                {errors.name && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="input-group-admin">
                <label
                  htmlFor="description"
                  className={errors.description ? "text-red-500" : ""}
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  className={
                    errors.description
                      ? "border-red-500! ring-1 ring-red-500!"
                      : ""
                  }
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Category Details..."
                ></textarea>
                {errors.description && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            className="ml-auto mt-3 rounded-lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            type="submit"
          >
            {isEditMode ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryModal;
