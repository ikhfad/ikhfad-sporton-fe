import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import { Bank } from "@/app/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createBank, updateBank } from "@/app/services/bank.service";

type TBankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bank: Bank | null;
  onSuccess: () => void;
};

const BankInfoModal = ({
  isOpen,
  onClose,
  bank,
  onSuccess,
}: TBankInfoModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Bank>>({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  const isEditMode = !!bank;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.accountName?.trim()) {
      newErrors.accountName = "Account holder name is required.";
    } else if (formData.accountName.length < 3) {
      newErrors.accountName = "Name is too short.";
    }

    const accountNumberRegex = /^\d+$/;
    if (!formData.accountNumber?.trim()) {
      newErrors.accountNumber = "Account number is required.";
    } else if (!accountNumberRegex.test(formData.accountNumber)) {
      newErrors.accountNumber = "Account number must contain only digits.";
    } else if (
      formData.accountNumber.length < 8 ||
      formData.accountNumber.length > 18
    ) {
      newErrors.accountNumber =
        "Please enter a valid account number (8-18 digits).";
    }

    if (!formData.bankName) {
      newErrors.bankName = "Bank name is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setErrors({});
    if (isEditMode && isOpen) {
      setFormData({
        accountName: bank.accountName,
        accountNumber: bank.accountNumber,
        bankName: bank.bankName,
      });
    } else if (isOpen) {
      setFormData({
        accountName: "",
        accountNumber: "",
        bankName: "",
      });
    }
  }, [isEditMode, isOpen, bank]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (isEditMode) {
        await updateBank(bank._id, formData);
      } else {
        await createBank(formData as Bank);
      }

      setFormData({
        accountName: "",
        accountNumber: "",
        bankName: "",
      });

      toast.success(
        isEditMode
          ? "Bank info updated successfully!"
          : "Bank info created successfully!",
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
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Bank Account">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label
                htmlFor="bankName"
                className={errors.bankName ? "text-red-500" : ""}
              >
                {errors.bankName ? (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.bankName}
                  </span>
                ) : (
                  "Bank Name"
                )}
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                className={
                  errors.bankName ? "border-red-500! ring-1 ring-red-500!" : ""
                }
                value={formData.bankName}
                onChange={handleChange}
                placeholder="e.g. Mandiri, BCA, BRI"
              />
            </div>
            <div className="input-group-admin">
              <label
                htmlFor="accountNumber"
                className={errors.accountNumber ? "text-red-500" : ""}
              >
                {errors.accountNumber ? (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.accountNumber}
                  </span>
                ) : (
                  "Account Number"
                )}
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                className={
                  errors.accountNumber
                    ? "border-red-500! ring-1 ring-red-500!"
                    : ""
                }
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="17701635629485"
              />
            </div>
            <div className="input-group-admin">
              <label
                htmlFor="accountName"
                className={errors.accountName ? "text-red-500" : ""}
              >
                {errors.accountName ? (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.accountName}
                  </span>
                ) : (
                  "Account Name / Holder"
                )}
              </label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                className={
                  errors.accountName
                    ? "border-red-500! ring-1 ring-red-500!"
                    : ""
                }
                value={formData.accountName}
                onChange={handleChange}
                placeholder="Account holder name as registered on the account"
              />
            </div>
          </div>
          <Button
            className="ml-auto mt-3 rounded-lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            type="submit"
          >
            {isEditMode ? "Update Bank Info" : "Create Bank Info"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BankInfoModal;
