"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import { useCallback, useEffect, useRef, useState } from "react";
import { Bank } from "@/app/types";
import { deleteBank, getAllBank } from "@/app/services/bank.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const BankInfoManagement = () => {
  const isMounted = useRef(true);
  const [bank, setBank] = useState<Bank[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [bankToDeleteId, setBankToDeleteId] = useState("");

  const fetchBank = useCallback(async () => {
    try {
      const data = await getAllBank();

      if (isMounted.current && data) {
        setTimeout(() => {
          if (isMounted.current) {
            setBank(data);
          }
        }, 0);
      }
    } catch (error) {
      if (isMounted.current) {
        console.error("Failed to fetch bank", error);
      }
    }
  }, []);

  const handleEdit = (bank: Bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBankToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bankToDeleteId) return;

    try {
      await deleteBank(bankToDeleteId);
      fetchBank();
      toast.success("Bank deleted successfully");
      setIsDeleteModalOpen(false);
      setBankToDeleteId("");
    } catch (error) {
      console.error("Failed to delete bank", error);
      toast.error("Failed to delete bank");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
  };

  useEffect(() => {
    isMounted.current = true;
    fetchBank();

    return () => {
      isMounted.current = false;
    };
  }, [fetchBank]);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Bank Information</h1>
          <p className="opacity-50">
            Manage destination accounts for customer transfers.
          </p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
          <FiPlus size={24} />
          Add Bank Account
        </Button>
      </div>
      <BankInfoList banks={bank} onEdit={handleEdit} onDelete={handleDelete} />
      <BankInfoModal
        bank={selectedBank}
        onSuccess={fetchBank}
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

export default BankInfoManagement;
