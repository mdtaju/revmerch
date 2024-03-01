import Image from 'next/legacy/image';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorSelectBtn from '../reusable/Color';
import { addColor, addSize, quantityDecrement, quantityIncrement, removeCartItem } from '@/lib/features/cart/cartSlice';

const CartProduct = ({ product }) => {
      const [allColors, setAllColors] = useState([]);
      const [sizes, setSizes] = useState([]);
      const products = useSelector(state => state.products.productsArray);
      const [selectedColor, setSelectedColor] = useState(product.color);
      const [selectedSize, setSelectedSize] = useState(product.size);
      const [quantity, setQuantity] = useState(1);
      const dispatch = useDispatch();

      function handleColorSelect(color) {
            dispatch(addColor({ id: product.id, color: color }));
            setSelectedColor(color);
      }

      function handleSizeSelect(size) {
            dispatch(addSize({ id: product.id, size: size }));
            setSelectedSize(size)
      }

      function handleQanIncrement() {
            setQuantity((qt) => qt + 1);
            dispatch(quantityIncrement({
                  quantity,
                  id: product.id
            }));
      }

      function handleQanDecrement() {
            setQuantity((qt) => {
                  if (qt === 1) {
                        return 1
                  } else {
                        return qt - 1
                  }
            });
            dispatch(quantityDecrement({
                  quantity,
                  id: product.id
            }))
      }

      function handleRemoveCartItem() {
            dispatch(removeCartItem(product.id))
      }

      useEffect(() => {
            if (products) {
                  const getProduct = products.find((item) => item.id === product.product_id);
                  if (getProduct) {
                        setAllColors(getProduct.colors);
                        setSizes(getProduct.sizes)
                  }
            }
      }, [product.product_id, products]);
      return (
            <div
                  className="flex flex-wrap gap-4 items-center p-4 border-b border-primary"
            >
                  {/* img */}
                  <div className="w-[150px] h-[150px] relative">
                        <Image
                              src={product.product_image}
                              alt={product.product_name}
                              layout="fill"
                              className="absolute object-contain object-center"
                        />
                  </div>
                  {/* info */}
                  <div className="w-[265px] h-[150px] pr-0 md:pr-4 border-[0px] md:border-r border-primary">
                        <h2 className="line-clamp-2 text-xl font-semibold">{product.product_name}</h2>
                        {/* color select */}
                        <div className='flex items-center gap-4 flex-wrap mt-4'>
                              {
                                    allColors.map((color, i) => (
                                          <ColorSelectBtn
                                                key={i}
                                                selectedColor={selectedColor}
                                                productColor={color}
                                                border={true}
                                                onClick={() => handleColorSelect(color.color)}
                                          />
                                    ))
                              }
                        </div>
                        {/* sizes */}
                        <ul className='flex flex-wrap items-center gap-4 mt-4'>
                              {
                                    sizes.map((size, i) => (
                                          <li onClick={() => handleSizeSelect(size)} key={i} className={`w-[44px] h-[28px] rounded grid place-items-center text-xl cursor-pointer hover:brightness-110 common_transition select-none ${size === selectedSize ? "bg-white text-primary" : "bg-primary text-white"}`}>{size}</li>
                                    ))
                              }
                        </ul>
                  </div>
                  {/* price calculation */}
                  <div className='flex flex-col gap-4'>
                        <p className='text-xl'>{`Price: ${product.product_price}DT`}</p>
                        <div className='flex bg-white items-center border border-gray-400 rounded-sm w-fit mx-auto'>
                              <button
                                    onClick={handleQanIncrement}
                                    className='text-black p-2 border-r border-gray-400'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                              </button>
                              <span className='text-black text-lg px-2'>{quantity}</span>
                              <button
                                    onClick={handleQanDecrement}
                                    className='text-black p-2 border-l border-gray-400'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                              </button>
                        </div>
                        {/* remove cart item */}
                        <button onClick={handleRemoveCartItem} className='order_btn text-sm'>Remove</button>
                  </div>
            </div>
      );
};

export default CartProduct;