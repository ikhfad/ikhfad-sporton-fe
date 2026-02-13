import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category, Product } from "@/app/types";
import { getAllCategories } from "@/app/services/category.service";
import { createProduct, updateProduct } from "@/app/services/product.service";
import { toast } from "react-toastify";
import { getImageUrl } from "@/app/lib/api";
import { toIDRDisplay, toNumeric } from "@/app/utils/price-formatter";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product?: Product | null;
};

type ProductFormData = {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string;
};

const ProductModal = ({
  isOpen,
  onClose,
  onSuccess,
  product,
}: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    categoryId: "",
    description: "",
  });
  const isEditMode = !!product;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required.";

    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a valid positive number.";
    }

    if (!formData.stock) {
      newErrors.stock = "Stock is required.";
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Stock cannot be negative.";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a category.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!isEditMode && !imageFile) {
      newErrors.image = "Product image is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      data.append("category", formData.categoryId);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await updateProduct(product._id, data);
      } else {
        await createProduct(data);
      }

      // Reset Form Data
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);

      toast.success(
        isEditMode
          ? "Product updated successfully!"
          : "Product created successfully!",
      );

      onSuccess?.();
      onClose?.();
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

  useEffect(() => {
    setErrors({});
    if (isEditMode && isOpen) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category._id,
        stock: product.stock,
      });
      setImagePreview(product.imageUrl ? getImageUrl(product.imageUrl) : null);
    } else if (isOpen) {
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isEditMode, isOpen, product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = toNumeric(value);
    setFormData((prev) => ({ ...prev, price: numericValue }));

    if (errors.price) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.price;
        return newErrors;
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit}>
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
                Product Name
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
                placeholder="e.g. Running Shoes"
              />
              {errors.name && (
                <span className="text-xs text-red-500 mt-1">{errors.name}</span>
              )}
            </div>
            <div className="flex gap-4">
              <div className="input-group-admin">
                <label
                  htmlFor="price"
                  className={errors.price ? "text-red-500" : ""}
                >
                  Price (IDR)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="price"
                  id="price"
                  className={
                    errors.price ? "border-red-500! ring-1 ring-red-500!" : ""
                  }
                  value={toIDRDisplay(formData.price)}
                  onChange={handlePriceChange}
                  placeholder="Rp 0"
                />
                {errors.price && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.price}
                  </span>
                )}
              </div>
              <div className="input-group-admin">
                <label
                  htmlFor="stock"
                  className={errors.stock ? "text-red-500" : ""}
                >
                  Stock
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="stock"
                  id="stock"
                  className={
                    errors.stock ? "border-red-500! ring-1 ring-red-500!" : ""
                  }
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e.g. 120"
                />
                {errors.stock && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.stock}
                  </span>
                )}
              </div>
            </div>
            <div className="input-group-admin">
              <label
                htmlFor="categoryId"
                className={errors.categoryId ? "text-red-500" : ""}
              >
                Category
              </label>
              <select
                name="categoryId"
                id="categoryId"
                className={`w-full p-2 border rounded-lg outline-none transition-all ${
                  errors.categoryId
                    ? "border-red-500! ring-1 ring-red-500!"
                    : "border-gray-300 focus:border-primary"
                }`}
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.categoryId}
                </span>
              )}
            </div>
          </div>
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
              errors.description ? "border-red-500! ring-1 ring-red-500!" : ""
            }
            rows={7}
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Details..."
          ></textarea>
          {errors.description && (
            <span className="text-xs text-red-500 mt-1">
              {errors.description}
            </span>
          )}
        </div>
        <Button
          className="ml-auto mt-3 rounded-lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
          type="submit"
        >
          {isEditMode ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ProductModal;
