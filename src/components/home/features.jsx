"use client";
import { useEffect } from "react";
import ProductCard from '../reusable/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/lib/features/products/productsSlice';

const Features = () => {
      const products = useSelector(state => state.products.productsArray);
      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(fetchProducts());
      }, [dispatch]);
      return (
            <section className='container mx-auto'>
                  <div className='py-[100px] mt-[100px] text-center'>
                        {/* title area */}
                        <div className='section_title'>
                              <h1>Featured Products</h1>
                        </div>
                        {/* card container */}
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-stretch gap-8 justify-items-center mt-[100px] px-4 md:px-12'>
                              {
                                    products.map((product, i) => (
                                          <ProductCard
                                                key={i}
                                                product={product}
                                          />
                                    ))
                              }
                        </div>
                  </div>
            </section>
      );
};

export default Features;