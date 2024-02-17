import ProductCard from "../reusable/ProductCard";

const CardContainer = ({ products = [] }) => {
      return (
            <div className="w-full lg:flex-1 lg:border-l border-white lg:pl-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-stretch gap-8 justify-items-center">
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
      );
};

export default CardContainer;