import Image from "next/image";
import Button from "../ui/button";
import priceFormatter from "@/app/utils/price-formatter";
import { FiAlertCircle, FiCreditCard, FiTrash2 } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";

type TCartItems = {
  handlePayment: () => void;
};

const CartItem = ({ handlePayment }: TCartItems) => {
  const { items, removeItem } = useCartStore();
  const isCartEmpty = items.length === 0;

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  return (
    <CardWithHeader title="Cart Items">
      {isCartEmpty ? (
        <div className="flex flex-col justify-center h-[calc(100%-186px)]">
          <div className="max-h-75 md:max-h-100">
            <div className="justify-center items-center w-full h-full py-6 text-center m-auto">
              <FiAlertCircle className="text-primary mx-auto mb-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <p>Your cart is empty</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-[calc(100%-186px)]">
          <div className="overflow-y-scroll max-h-75 md:max-h-100">
            {items.map((item) => (
              <div
                className="border-b border-gray-200 p-4 flex gap-3"
                key={item._id}
              >
                <div className="bg-primary-light aspect-square w-14 h-14 md:w-16 md:h-16 flex justify-center items-center shrink-0">
                  <Image
                    src={getImageUrl(item.imageUrl)}
                    width={52}
                    height={52}
                    alt={item.name}
                    className="aspect-square object-contain w-full h-full p-1"
                    loading="lazy"
                  />
                </div>
                <div className="self-center flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {item.name}
                  </div>
                  <div className="flex gap-2 md:gap-3 font-medium text-xs">
                    <div>{item.qty}x</div>
                    <div className="text-primary whitespace-nowrap">
                      {priceFormatter(item.price)}
                    </div>
                  </div>
                </div>
                <Button
                  size="small"
                  variant="ghost"
                  className="w-11 h-11 p-2! self-center shrink-0 min-h-11"
                  onClick={() => removeItem(item._id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <FiTrash2 size={18} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold">
          <div className="text-sm">Total</div>
          <div className="text-primary text-sm font-medium">
            {priceFormatter(totalPrice)}
          </div>
        </div>
        {isCartEmpty ? (
          <button
            className="inline-flex py-3 px-6 md:py-4 md:px-9 mt-4 w-full gap-2 justify-center items-center cursor-not-allowed rounded-lg bg-dark opacity-50 text-white"
            disabled
          >
            <FiCreditCard />
            Proceed to Payment
          </button>
        ) : (
          <Button
            variant="dark"
            className="w-full mt-4"
            onClick={handlePayment}
          >
            <FiCreditCard />
            Proceed to Payment
          </Button>
        )}
      </div>
    </CardWithHeader>
  );
};

export default CartItem;
