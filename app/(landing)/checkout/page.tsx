"use client";

import { useState } from "react";
import CartItem from "../components/checkout/cart-item";
import OrderInformation from "../components/checkout/order-information";
import { CustomerInfo, useCartStore } from "@/app/hooks/use-cart-store";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { push } = useRouter();
  const { setCustomerInfo } = useCartStore();
  const [formData, setFormData] = useState<CustomerInfo>({
    customerName: "",
    customerContact: null,
    customerAddress: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate full name
    if (!formData.customerName?.trim()) {
      newErrors.customerName = "Full name is required.";
    } else if (formData.customerName.length < 2) {
      newErrors.customerName = "Name is too short.";
    }

    // Validate WhatsApp number (general - digits only, 8-15 digits)
    const contactValue = formData.customerContact
      ? String(formData.customerContact)
      : "";
    if (!contactValue.trim()) {
      newErrors.customerContact = "WhatsApp number is required.";
    } else {
      const digitsOnly = contactValue.replace(/\D/g, "");
      if (digitsOnly.length < 8) {
        newErrors.customerContact =
          "Phone number is too short (minimum 8 digits).";
      } else if (digitsOnly.length > 15) {
        newErrors.customerContact =
          "Phone number is too long (maximum 15 digits).";
      }
    }

    // Validate address
    if (!formData.customerAddress?.trim()) {
      newErrors.customerAddress = "Shipping address is required.";
    } else if (formData.customerAddress.length < 10) {
      newErrors.customerAddress =
        "Address is too short (minimum 10 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) {
      return;
    }

    setCustomerInfo(formData);
    push("/payment");
  };

  return (
    <main className="bg-gray-100 min-h-screen pt-16 md:pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-16 lg:py-20">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8 md:mb-11">
          Checkout Now
        </h1>

        {/* Grid: Stacked on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14">
          <OrderInformation
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
          <CartItem handlePayment={handlePayment} />
        </div>
      </div>
    </main>
  );
};

export default Checkout;
