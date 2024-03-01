import Image from "next/image";
import DeliveryMan from "/public/assets/images/male_delivery.png";
import CryptoCurrency from "/public/assets/images/cryptocurrency.png";

const CartAddArea = () => {
      return (
            <div className="flex flex-col gap-12 w-full md:w-[370px] px-4">
                  {/* top img */}
                  <div className="w-full h-auto grid place-items-center">
                        <Image
                              src={DeliveryMan}
                              alt="delivery_man"
                        />
                  </div>
                  {/* text */}
                  <h2 className="text-3xl font-semibold text-center">WE OFFER A FREE DELIEVERY ALL ACROSS THE COUNTRY WITH PAYMENT AT DOORSTEP </h2>
                  {/* bottom img */}
                  <div className="w-full h-auto grid place-items-center">
                        <Image
                              src={CryptoCurrency}
                              alt="CryptoCurrency"
                        />
                  </div>
            </div>
      );
};

export default CartAddArea;