import React from 'react';
import ProductCard from '../reusable/ProductCard';

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

const products = [
      {
            name: "Full slave cotton high quality fabric Black hoodie",
            price: 99,
            feedback: 4.5,
            reviews: "20",
            colors: productColors,
            type: "New"
      },
      {
            name: "Tunisia Hoodie",
            price: 199,
            feedback: 5,
            reviews: "20",
            colors: productColors,
            type: "New"
      },
      {
            name: "Winter Hoodie",
            price: 150,
            feedback: 4,
            reviews: "20",
            colors: productColors,
            type: "New"
      },
      {
            name: "Summer Hoodie",
            price: 50,
            feedback: 3,
            reviews: "50",
            colors: productColors,
            type: "new"
      },
]

const Features = () => {
      return (
            <div className='container mx-auto'>
                  <div className='py-[100px] mt-[100px] text-center'>
                        {/* title area */}
                        <div className='section_title'>
                              <h1>Featured Products</h1>
                        </div>
                        {/* card container */}
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-stretch gap-8 justify-items-center mt-[100px] px-4 md:px-12'>
                              {
                                    products.map((product, i) => (
                                          <ProductCard key={i} name={product.name} feedback={product.feedback} price={product.price} reviews={product.reviews} colors={product.colors} type={product.type} />
                                    ))
                              }
                        </div>
                  </div>
            </div>
      );
};

export default Features;