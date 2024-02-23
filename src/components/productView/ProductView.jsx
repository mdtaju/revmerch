"use client";
import { useEffect, useState } from "react";
import ImageView from "./ImageView";
import InfoArea from "./InfoArea";
import WhiteHoodie from "/public/assets/images/hero_hoodie.svg";
import WhiteHoodie1 from "/public/assets/images/hero_hoodie_1.png";
import WhiteHoodie2 from "/public/assets/images/hero_hoodie_2.png";
import { useQuery } from "@tanstack/react-query";
import getProducts from "@/lib/getProducts";
import Loading from "../reusable/Loading";

const productImages = [
      WhiteHoodie,
      WhiteHoodie1,
      WhiteHoodie2
]

const ProductView = ({ id }) => {
      const { data = [] } = useQuery({ queryKey: ["products"], queryFn: async () => await getProducts() });
      // console.log(data)
      const [product, setProduct] = useState({
            name: "",
            colors: [],
            price: "",
            sizes: [],
            images: []
      });
      const { name, colors, price, sizes, images } = product;

      useEffect(() => {
            if (data) {
                  const getProduct = data.find((data) => data.id === id);
                  if (getProduct) {
                        setProduct(getProduct);
                  }
            }
      }, [data, id]);

      if (product.name) {

            return (
                  <section className="container mx-auto py-[100px]">
                        <div className="w-full max-w-[1100px] mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 items-start">
                              {/* product view area */}
                              <ImageView
                                    productImages={images}
                              />

                              {/* product details area */}
                              <InfoArea productId={id} productName={name} price={price} colors={colors} sizes={sizes}>
                                    <h2 className='text-4xl'>{name}</h2>
                                    <h5 className='text-4xl'>{price} <span className='text-primary'>TD</span></h5>
                              </InfoArea>
                        </div>
                  </section>
            );
      } else {
            return <Loading />
      }

};

export default ProductView;