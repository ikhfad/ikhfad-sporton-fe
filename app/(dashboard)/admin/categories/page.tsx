"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import CategoryTable from "../../components/categories/category-table";
import CategoryModal from "../../components/categories/category-modal";
import { useRef, useState, useCallback, useEffect } from "react";
import { Category } from "@/app/types";
import {
  deleteCategory,
  getAllCategories,
} from "@/app/services/category.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const CategoryManagement = () => {
  const isMounted = useRef(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryToDeleteId, setCategoryToDeleteId] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getAllCategories();

      if (isMounted.current && data) {
        setTimeout(() => {
          if (isMounted.current) {
            setCategories(data);
          }
        }, 0);
      }
    } catch (error) {
      if (isMounted.current) {
        console.error("Failed to fetch categories", error);
      }
    }
  }, []);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategoryToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDeleteId) return;

    try {
      await deleteCategory(categoryToDeleteId);
      fetchCategories();
      toast.success("Category deleted successfully");
      setIsDeleteModalOpen(false);
      setCategoryToDeleteId("");
    } catch (error) {
      console.error("Failed to delete category", error);
      toast.error("Failed to delete category");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    isMounted.current = true;
    fetchCategories();

    return () => {
      isMounted.current = false;
    };
  }, [fetchCategories]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
        <div>
          <h1 className="font-bold text-xl md:text-2xl">Category Management</h1>
          <p className="opacity-50 text-sm md:text-base">
            Organize your products into categories.
          </p>
        </div>
        <Button
          className="rounded-lg w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus size={18} className="md:w-6 md:h-6" />
          <span className="hidden sm:inline">Add Category</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CategoryModal
        category={selectedCategory}
        onSuccess={fetchCategories}
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

export default CategoryManagement;
