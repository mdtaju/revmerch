import { useState, useEffect } from "react";
import { karla } from "@/utils/fonts.config";
import { useSelector } from "react-redux";

const priceRange = [
      {
            title: "Under 100 TD",
      },
      {
            title: "Under 200 TD",
      },
      {
            title: "Under 300 TD",
      },
      {
            title: "Under 400 TD",
      },
]

const Sidebar = ({ setAllProducts }) => {
      const [range, setRange] = useState("");
      const products = useSelector(state => state.products.productsArray);

      function handleRangeChange(e) {
            const { value, checked } = e.target;
            setRange(value);
            let priceRange;
            switch (value) {
                  case "Under 100 TD":
                        priceRange = 100;
                        break;
                  case "Under 200 TD":
                        priceRange = 200;
                        break;
                  case "Under 300 TD":
                        priceRange = 300;
                        break;
                  case "Under 400 TD":
                        priceRange = 400;
                        break;
                  default:
                        priceRange = 400;
                        break;
            }
            const getProducts = products.filter(product => {
                  if (product.price <= priceRange) {
                        return true;
                  }
                  return false;
            });
            setAllProducts(getProducts)
      }
      return (
            <div className={`w-full lg:w-[250px] ${karla.className}`}>
                  <div className="text-center lg:text-left mb-8 lg:mb-0">
                        <h4 className="text-2xl font-medium text-primary">Price Range</h4>
                        <ul className="px-2 mt-2 space-y-2 flex flex-col items-center lg:items-start">
                              {
                                    priceRange.map((price, i) => (
                                          <li key={i} className="w-fit">
                                                <label htmlFor={price.title} className="filter_items">
                                                      <input
                                                            type="radio"
                                                            name="price-range"
                                                            id={price.title}
                                                            className="min-w-[18px] min-h-[18px]"
                                                            value={price.title}
                                                            checked={range === price.title}
                                                            onChange={handleRangeChange}
                                                      />
                                                      <span>{price.title}</span>
                                                </label>
                                          </li>
                                    ))
                              }
                        </ul>
                  </div>
            </div>
      );
};

export default Sidebar;