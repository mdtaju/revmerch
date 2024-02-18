"use client";
import { useState } from 'react';
import ColorSelectBtn from '../reusable/Color';

const sizes = ["S", "L", "X", "XL", "XXL"];
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
const InfoArea = ({ children }) => {
      const [selectedColor, setSelectedColor] = useState("");

      function handleColorSelect(color) {
            setSelectedColor(color);
      }
      return (
            <div className={`w-full py-[50px] space-y-8 font-bold`}>
                  {children}
                  {/* sizes */}
                  <ul className='flex flex-wrap items-center gap-4'>
                        {
                              sizes.map((size, i) => (
                                    <li key={i} className='w-[54px] h-[38px] bg-primary rounded grid place-items-center text-2xl cursor-pointer hover:brightness-110 common_transition'>{size}</li>
                              ))
                        }
                  </ul>
                  {/* colors */}
                  <ul className='flex flex-wrap items-center gap-4'>
                        {
                              productColors.map((color, i) => (
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
                  <button className='order_btn'>Order Now</button>
            </div>
      );
};

export default InfoArea;