import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import Button from "./button";
import { FiArrowRight, FiTrash2, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";

type CartPopupProps = {
  onClose?: () => void;
};

const CartPopup = ({ onClose }: CartPopupProps) => {
  const { push } = useRouter();
  const { items, removeItem } = useCartStore();

  const handleCheckout = () => {
    if (onClose) onClose();
    push("/checkout");
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  return (
    <div className="absolute bg-white right-0 top-17.5 shadow-xl border border-gray-200 w-90 max-w-[calc(100vw-2rem)] shadow-black/10 z-70 lg:rounded-lg rounded-md mr-2.5">
      <div className="p-4 border-b border-gray-200 font-bold text-center flex justify-between items-center">
        <span>Shopping Cart</span>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-gray-100"
            aria-label="Close cart"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
      <div className="overflow-y-auto max-h-87.5">
        {items.length ? (
          items.map((item, index) => (
            <div
              className="border-b border-gray-200 p-4 flex gap-3"
              key={index}
            >
              <div className="bg-primary-light aspect-square w-16 flex justify-center shrink-0">
                <Image
                  src={getImageUrl(item.imageUrl)}
                  width={63}
                  height={63}
                  alt={item.name}
                  className="aspect-square object-contain"
                />
              </div>
              <div className="self-center flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{item.name}</div>
                <div className="flex gap-3 font-medium text-xs">
                  <div>{item.qty}x</div>
                  <div className="text-primary whitespace-nowrap">
                    {priceFormatter(item.price)}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="small"
                className="w-7 h-7 p-0! self-center shrink-0"
                onClick={() => removeItem(item._id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                <FiTrash2 size={16} />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center opacity-70 py-8 px-4">
            Your shopping cart is empty
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold">
          <div className="text-sm">Total</div>
          <div className="text-primary text-sm font-medium">
            {priceFormatter(totalPrice)}
          </div>
        </div>
        <Button
          variant="dark"
          size="small"
          className="w-full mt-4"
          onClick={handleCheckout}
        >
          Checkout Now <FiArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default CartPopup;
