"use client";

import CardWithHeader from "../ui/card-with-header";
import priceFormatter from "@/app/utils/price-formatter";
import Button from "../ui/button";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import FileUpload from "../ui/file-upload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { transactionCheckout } from "@/app/services/transaction.service";
import { toast } from "react-toastify";

const PaymentSteps = () => {
  const { push } = useRouter();
  const { items, customerInfo, reset } = useCartStore();
  const [file, setFile] = useState<File | null>();
  const isCartEmpty = items.length === 0;

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const handleConfirmPayment = async () => {
    if (isCartEmpty) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!file) {
      toast.error("Please upload your payment receipt!");
      return;
    }

    if (!customerInfo) {
      toast.error(
        "Customer information is missing, please return to checkout page!",
      );
      push("/checkout");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("customerName", customerInfo.customerName);
      formData.append(
        "customerContact",
        customerInfo.customerContact!.toString(),
      );
      formData.append("customerAddress", customerInfo.customerAddress);
      formData.append("image", file);
      formData.append(
        "purchasedItems",
        JSON.stringify(
          items.map((item) => ({ productId: item._id, qty: item.qty })),
        ),
      );
      formData.append("totalPayment", totalPrice!.toString());

      const res = await transactionCheckout(formData);
      toast.success("Transaction created successfully!");
      reset();
      push(`/order-status/${res._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardWithHeader title="Payment Steps">
      <div className="p-5">
        <ol className="list-decimal text-xs pl-2 flex flex-col gap-4 mb-5">
          <li>
            Transfer the total amount of <b>{priceFormatter(totalPrice)}</b> to
            your preferred bank account listed under &apos;Payment Options&apos;
            (BCA, Mandiri, or BTPN).
          </li>
          <li>
            After completing the transfer, <b>keep the payment receipt</b> or a
            screenshot of the transfer confirmation. This will be needed for the
            next step.
          </li>
          <li>
            Upload the payment receipt/screenshot using the{" "}
            <b>&apos;Upload Receipt & Confirm&apos;</b> button below to validate
            your transaction.
          </li>
        </ol>
        {isCartEmpty ? (
          <div className="flex flex-col justify-center items-center w-full py-6 border border-dashed border-primary bg-primary-light">
            <div className="text-center my-5">
              <FiAlertCircle className="text-primary mx-auto mb-1" />
              <p className="text-xs">
                Please add items to your cart to proceed with payment
              </p>
            </div>
          </div>
        ) : (
          <FileUpload onFileSelect={setFile} />
        )}
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold">
          <div className="text-sm">Total</div>
          <div className="text-primary text-xs">
            {priceFormatter(totalPrice)}
          </div>
        </div>
        {isCartEmpty ? (
          <button
            className="inline-flex py-3 px-6 md:py-4 md:px-9 mt-4 w-full gap-2 justify-center items-center cursor-not-allowed rounded-lg bg-dark opacity-50 text-white"
            disabled
          >
            <FiCheckCircle />
            Upload Receipt & Confirm
          </button>
        ) : (
          <Button
            variant="dark"
            className="w-full mt-4"
            onClick={handleConfirmPayment}
          >
            <FiCheckCircle />
            Upload Receipt & Confirm
          </Button>
        )}
      </div>
    </CardWithHeader>
  );
};

export default PaymentSteps;
