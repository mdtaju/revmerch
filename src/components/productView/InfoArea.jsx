"use client";
import { useState } from 'react';
import ColorSelectBtn from '../reusable/Color';
import useAuthState from '../provider/AuthProvider';
import setOrder from '@/lib/setOrder';


const productColors = [
      {
            name: "black",
            color: "#1C1C1C"
      },
      {
            name: "purple",
            color: "#803B90"
      },
      {
            name: "red",
            color: "#E0342C"
      },
      {
            name: "orange",
            color: "#EE632F"
      },
      {
            name: "cyan",
            color: "#2084BD"
      },
      {
            name: "green",
            color: "#73B144"
      },
]

const InfoArea = ({ productId, productName, colors, price, sizes, children }) => {
      const [selectedColor, setSelectedColor] = useState("");
      const [selectedSize, setSelectedSize] = useState("");
      const [loading, setLoading] = useState(false);
      const auth = useAuthState();
      // console.log(auth)

      function handleColorSelect(color) {
            setSelectedColor(color);
      }

      function handleSizeSelect(size) {
            setSelectedSize(size)
      }

      async function placeOrder() {
            if (!auth) {
                  return alert("To place an order. Please, log in to your account first.")
            }
            if (!selectedColor || !selectedSize) {
                  return alert("Please select the size and color.")
            }
            setLoading(true);
            const res = await setOrder({
                  productId,
                  productName,
                  color: selectedColor,
                  size: selectedSize,
                  price: price,
                  customer_id: auth.uid,
                  customer_name: auth.displayName,
                  customer_email: auth.email
            });
            if (res) {
                  setLoading(false);
                  return alert("Thank you. Your order has been successfully placed.")
            } else {
                  setLoading(false);
                  return alert("Something went wrong. Please, try again.")
            }
      }
      return (
            <div className={`w-full py-[50px] space-y-8 font-bold`}>
                  {children}
                  {/* sizes */}
                  <ul className='flex flex-wrap items-center gap-4'>
                        {
                              sizes.map((size, i) => (
                                    <li onClick={() => handleSizeSelect(size)} key={i} className={`w-[54px] h-[38px] rounded grid place-items-center text-2xl cursor-pointer hover:brightness-110 common_transition select-none ${size === selectedSize ? "bg-white text-primary" : "bg-primary text-white"}`}>{size}</li>
                              ))
                        }
                  </ul>
                  {/* colors */}
                  <ul className='flex flex-wrap items-center gap-4'>
                        {
                              colors.map((color, i) => (
                                    <ColorSelectBtn
                                          key={i}
                                          productColor={color}
                                          selectedColor={selectedColor}
                                          onClick={() => handleColorSelect(color.name)}
                                          border={true}
                                    />
                              ))
                        }
                  </ul>
                  <button onClick={placeOrder} disabled={loading} className='order_btn'>
                        {loading ? "loading..." : "Order Now"}
                  </button>
            </div>
      );
};

export default InfoArea;