import CardWithHeader from "../ui/card-with-header";
import { CustomerInfo } from "@/app/hooks/use-cart-store";

type TOrderInformation = {
  formData: CustomerInfo;
  setFormData: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const OrderInformation = ({
  formData,
  setFormData,
  errors,
  setErrors,
}: TOrderInformation) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  return (
    <CardWithHeader title="Order Information">
      <div className="p-4 md:p-5">
        <div className="input-group">
          <label
            htmlFor="customerName"
            className={errors.customerName ? "text-red-500" : ""}
          >
            {errors.customerName ? (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.customerName}
              </span>
            ) : (
              "Full Name"
            )}
          </label>
          <input
            type="text"
            placeholder="Type your full name"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className={
              errors.customerName
                ? "border-red-500! ring-1 ring-red-500!"
                : ""
            }
          />
        </div>
        <div className="input-group">
          <label
            htmlFor="customerContact"
            className={errors.customerContact ? "text-red-500" : ""}
          >
            {errors.customerContact ? (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.customerContact}
              </span>
            ) : (
              "WhatsApp Number"
            )}
          </label>
          <input
            type="tel"
            placeholder="Type your WhatsApp number"
            id="customerContact"
            name="customerContact"
            value={
              formData.customerContact ? String(formData.customerContact) : ""
            }
            onChange={handleInputChange}
            className={
              errors.customerContact
                ? "border-red-500! ring-1 ring-red-500!"
                : ""
            }
          />
        </div>
        <div className="input-group">
          <label
            htmlFor="customerAddress"
            className={errors.customerAddress ? "text-red-500" : ""}
          >
            {errors.customerAddress ? (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.customerAddress}
              </span>
            ) : (
              "Shipping Address"
            )}
          </label>
          <textarea
            placeholder="Type your shipping address"
            id="customerAddress"
            name="customerAddress"
            rows={5}
            value={formData.customerAddress}
            onChange={handleInputChange}
            className={`resize-none ${
              errors.customerAddress
                ? "border-red-500! ring-1 ring-red-500!"
                : ""
            }`}
          />
        </div>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;
