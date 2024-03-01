"use client";
import { useState, useEffect } from 'react';
import CardContainer from "./CardContainer";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/products/productsSlice";

const Products = () => {
      const products = useSelector(state => state.products.productsArray);
      const [allProducts, setAllProducts] = useState([]);
      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(fetchProducts());
      }, [dispatch]);

      useEffect(() => {
            if (products) {
                  setAllProducts(products)
            }
      }, [products])

      return (
            <section className="container mx-auto py-[100px]">
                  <div className="flex flex-col lg:flex-row items-start gap-4">
                        <Sidebar setAllProducts={setAllProducts} />
                        <CardContainer
                              products={allProducts}
                        />
                  </div>
            </section>
      );
};

export default Products;