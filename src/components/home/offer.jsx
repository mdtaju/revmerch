import Delivery from "/public/assets/images/offer/fast_delivery.svg";
import Quality from "/public/assets/images/offer/top_quality.svg";
import Customer from "/public/assets/images/offer/customer_service.svg";
import ReturnPolicy from "/public/assets/images/offer/return.svg";
import Unique from "/public/assets/images/offer/unique.svg";
import Community from "/public/assets/images/offer/big_community.svg";
import Image from 'next/image';

const offers = [
      {
            title: <h3>Fast <span className='text-primary'>Delivery</span> all across the country</h3>,
            Img: Delivery
      },
      {
            title: <h3><span className='text-primary'>High</span> Products Quality and Design</h3>,
            Img: Quality
      },
      {
            title: <h3>Customer Service <span className='text-primary'>12/24</span> hours</h3>,
            Img: Customer
      },
      {
            title: <h3><span className='text-primary'>Return</span> Policy and refund if needed</h3>,
            Img: ReturnPolicy
      },
      {
            title: <h3><span className='text-primary'>Unique</span> Products that we make from <span className='text-primary'>scratch</span></h3>,
            Img: Unique
      },
      {
            title: <h3><span className='text-primary'>Big</span> and <span className='text-primary'>Amazing</span> Community to join</h3>,
            Img: Community
      },
]

const Offer = () => {
      return (
            <section className='container mx-auto py-[100px] px-4 md:px-0'>
                  {/* title */}
                  <div className='w-fit mx-auto text-center section_title'>
                        <h1>What we offer?</h1>
                  </div>
                  {/* content */}
                  <div className='w-full max-w-[1035px] mx-auto mt-[100px] '>
                        <ul className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center '>
                              {
                                    offers.map((offer, i) => (
                                          <li key={i} className='w-full max-w-[500px] bg-[#D9D9D9] rounded-[38px] px-8 md:px-16 py-1 mb-20 text-3xl text-black relative'>
                                                {offer.title}
                                                {/* image area */}
                                                <div className={`absolute grid place-items-center top-[-76px] md:top-[-55%] h-[80px] w-[80px] md:w-auto  md:h-[140px] ${i % 2 === 0 ? "left-[6%] md:left-[-13%]" : "right-[6%] md:right-[-13%]"} ${i === 0 ? "md:left-[-24%]" : ""}`}>
                                                      <Image
                                                            src={offer.Img}
                                                            alt={"offer"}
                                                            className=''
                                                      />
                                                </div>
                                          </li>
                                    ))
                              }
                        </ul>
                  </div>
            </section>
      );
};

export default Offer;