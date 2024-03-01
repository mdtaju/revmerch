"use client";
import { useEffect } from 'react';
import CardContainer from "./CardContainer";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/products/productsSlice";

const ShowRoom = () => {
      const products = useSelector(state => state.products.productsArray);
      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(fetchProducts());
      }, [dispatch]);

      return (
            <section className="container mx-auto py-[100px]">
                  <div className="flex flex-col lg:flex-row items-start gap-4">
                        <Sidebar />
                        <CardContainer
                              products={products}
                        />
                  </div>
            </section>
      );
};

export default ShowRoom;