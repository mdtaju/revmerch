"use client";
import { useState, useEffect } from 'react';
import ColorSelectBtn from '../reusable/Color';
import useAuthState from '../provider/AuthProvider';
import setOrder from '@/lib/setOrder';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const InfoArea = ({ productId, productName, colors, price, sizes, children, Img }) => {
      const [selectedColor, setSelectedColor] = useState("");
      const [selectedSize, setSelectedSize] = useState("");
      const [loading, setLoading] = useState(false);
      const [isAddedToCart, setIsAddedToCart] = useState(false);
      const auth = useAuthState();
      const cartItems = useSelector(state => state.cart.cartArray);
      const dispatch = useDispatch();
      // console.log(auth)

      useEffect(() => {
            if (cartItems) {
                  const getItem = cartItems.find((item) => item.product_id === productId);
                  if (getItem) {
                        setIsAddedToCart(getItem.id);
                  } else {
                        setIsAddedToCart(false);
                  }
            }
      }, [cartItems, productId]);

      function handleColorSelect(color) {
            setSelectedColor(color);
      }

      function handleSizeSelect(size) {
            setSelectedSize(size)
      }

      async function placeOrder() {
            if (!auth) {
                  return alert("To add product to cart. Please, log in to your account first.")
            }
            setLoading(true);
            // const res = await setOrder({
            //       productId,
            //       productName,
            //       color: selectedColor,
            //       size: selectedSize,
            //       price: price,
            //       customer_id: auth.uid,
            //       customer_name: auth.displayName,
            //       customer_email: auth.email
            // });
            if (!isAddedToCart) {
                  dispatch(addToCart({
                        product_id: productId,
                        color: selectedColor,
                        user_id: auth.uid,
                        quantity: 1,
                        product_price: price,
                        total_price: price,
                        product_name: productName,
                        product_image: Img,
                        size: selectedSize,
                  })).then((data) => {
                        setIsAddedToCart(data.payload.id);
                        setLoading(false);
                  }).catch(() => {
                        setLoading(false);
                  })
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
                                          onClick={() => handleColorSelect(color.color)}
                                          border={true}
                                    />
                              ))
                        }
                  </ul>
                  <button onClick={placeOrder} disabled={loading} className='order_btn'>
                        {loading ? "loading..." : "Add to cart"}
                  </button>
            </div>
      );
};

export default InfoArea;