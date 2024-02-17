import { karla } from "@/utils/fonts.config";

const priceRange = [
      {
            title: "0 TD - 100 TD",
            range: {
                  min: 0,
                  max: 100
            }
      },
      {
            title: "101 TD - 200 TD",
            range: {
                  min: 101,
                  max: 200
            }
      },
      {
            title: "201 TD - 300 TD",
            range: {
                  min: 201,
                  max: 300
            }
      },
      {
            title: "301 TD - 400 TD",
            range: {
                  min: 301,
                  max: 400
            }
      },
]

const Sidebar = () => {
      return (
            <div className={`w-full lg:w-[250px] ${karla.className}`}>
                  <div className="text-center lg:text-left mb-8 lg:mb-0">
                        <h4 className="text-2xl font-medium text-primary">Price Range</h4>
                        <ul className="px-2 mt-2 space-y-2 flex flex-col items-center lg:items-start">
                              {
                                    priceRange.map((price, i) => (
                                          <li key={i} className="w-fit">
                                                <label htmlFor={`price-${price.range.min}-${price.range.max}`} className="filter_items">
                                                      <input type="checkbox" name="" id={`price-${price.range.min}-${price.range.max}`} className="min-w-[18px] min-h-[18px]" />
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