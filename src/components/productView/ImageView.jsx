"use client";
import Image from "next/image";
import { useState } from "react";

const ImageView = ({ productImages }) => {
      const [currentImg, setCurrentImg] = useState(productImages[0]);
      const [othersImg, setOthersImg] = useState(productImages.slice(1, 3));

      function selectImg(product, index) {
            setOthersImg((prevImages) => {
                  const getOthersImg = prevImages.filter((Img, i) => i !== index);
                  return [currentImg, ...getOthersImg]
            })
            setCurrentImg(product);
      }
      return (
            <div className="w-full flex flex-col items-center md:items-start">
                  {/* large img */}
                  <div className="w-[300px] sm:max-w-[412px] h-[300px] sm:h-[412px] relative">
                        <Image
                              src={currentImg}
                              alt="hoodie"
                              className="w-full h-full absolute object-contain object-top"
                        />
                  </div>
                  {/* others images */}
                  <div className="w-[290px] h-[150px] p-4 bg-[#3C3C3C] rounded-[38px] mt-8 flex items-center justify-between">
                        {
                              othersImg.map((product, i) => (
                                    <div
                                          key={i}
                                          className="w-[122px] h-[122px] relative cursor-pointer"
                                          onClick={() => selectImg(product, i)}
                                    >
                                          <Image
                                                src={product}
                                                alt="hoodie"
                                                className="absolute w-full h-full object-contain object-center"
                                          />
                                    </div>
                              ))
                        }
                  </div>
            </div>
      );
};

export default ImageView;