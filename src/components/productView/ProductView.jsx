"use client";
import { useEffect, useState } from "react";
import ImageView from "./ImageView";
import InfoArea from "./InfoArea";
import Loading from "../reusable/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/products/productsSlice";

const ProductView = ({ id }) => {
      const products = useSelector(state => state.products.productsArray);
      const dispatch = useDispatch();

      const [product, setProduct] = useState({
            name: "",
            colors: [],
            price: "",
            sizes: [],
            images: []
      });
      const { name, colors, price, sizes, images } = product;

      useEffect(() => {
            dispatch(fetchProducts());
      }, [dispatch]);

      useEffect(() => {
            if (products) {
                  const getProduct = products.find((data) => data.id === id);
                  if (getProduct) {
                        setProduct(getProduct);
                  }
            }
      }, [products, id]);

      if (product.name) {

            return (
                  <section className="container mx-auto py-[100px]">
                        <div className="w-full max-w-[1100px] mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 items-start">
                              {/* product view area */}
                              <ImageView
                                    productImages={images}
                              />

                              {/* product details area */}
                              <InfoArea productId={id} productName={name} price={price} colors={colors} sizes={sizes} Img={images[0]}>
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