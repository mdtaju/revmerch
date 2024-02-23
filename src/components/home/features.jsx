"use client";
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../reusable/ProductCard';
import getProducts from '@/lib/getProducts';

const Features = () => {
      const { data = [] } = useQuery({ queryKey: ["products"], queryFn: async () => await getProducts() });
      console.log(data)
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
                                    data.map((product, i) => (
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