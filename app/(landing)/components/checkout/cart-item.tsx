import { cardList } from "../ui/cart-popup";
import Image from "next/image";
import Button from "../ui/button";
import priceFormatter from "@/app/utils/price-formatter";
import { FiCreditCard, FiTrash2 } from "react-icons/fi";

const CartItem = () => {
  const totalPrice = cardList.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="bg-white">
      <div className="px-5 py-4 border-b border-gray-200">
        <h2 className="font-bold text-lg">Card Items</h2>
      </div>
      <div className="overflow-auto max-h-75">
        {cardList.map((item, index) => (
          <div className="border-b border-gray-200 p-4 flex gap-3" key={index}>
            <div className="bg-primary-light aspect-square w-16 flex justify-center">
              <Image
                src={`/images/products/${item.imgUrl}`}
                width={63}
                height={63}
                alt={item.name}
                className="aspect-square object-contain"
              />
            </div>
            <div className="self-center">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="flex-gap-3 font-medium text-xs">
                <div>{item.qty}x</div>
                <div className="text-primary">{priceFormatter(item.price)}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="small"
              className="w-7 h-7 p-0! self-center ml-auto"
            >
              <FiTrash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold">
          <div className="text-sm">Total</div>
          <div className="text-primary text-xs">
            {priceFormatter(totalPrice)}
          </div>
        </div>
        <Button variant="dark" className="w-full mt-4">
          Proceed to Payment <FiCreditCard size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
