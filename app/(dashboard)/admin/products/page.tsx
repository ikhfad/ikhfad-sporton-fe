"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import ProductTable from "../../components/products/product-table";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductModal from "../../components/products/product-modal";
import { Product } from "@/app/types";
import { deleteProduct, getAllProducts } from "@/app/services/product.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const ProductManagement = () => {
  const isMounted = useRef(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDeleteId, setProductToDeleteId] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getAllProducts();

      if (isMounted.current && data) {
        setTimeout(() => {
          if (isMounted.current) {
            setProducts(data);
          }
        }, 0);
      }
    } catch (error) {
      if (isMounted.current) {
        console.error("Failed to fetch products", error);
      }
    }
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProductToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDeleteId) return;

    try {
      await deleteProduct(productToDeleteId);
      fetchProducts();
      toast.success("Product deleted successfully");
      setIsDeleteModalOpen(false);
      setProductToDeleteId("");
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchProducts();

    return () => {
      isMounted.current = false;
    };
  }, [fetchProducts]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
        <div>
          <h1 className="font-bold text-xl md:text-2xl">Product Management</h1>
          <p className="opacity-50 text-sm md:text-base">
            Manage your inventory, prices and stock.
          </p>
        </div>
        <Button
          className="rounded-lg w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus size={18} className="md:w-6 md:h-6" />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductModal
        product={selectedProduct}
        onSuccess={fetchProducts}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ProductManagement;
