import HeroImage from "/public/assets/images/hero_hoodie.svg";
import Image from 'next/image';

const Hero = () => {
      return (
            <div className='container mx-auto'>
                  <div className='w-full px-4 py-[100px] md:px-0'>
                        <div className='flex flex-col-reverse md:flex-row items-center justify-between gap-6'>
                              {/* info area */}
                              <div className='text-center md:text-left'>
                                    <div className='text-5xl font-semibold space-y-4 mb-12'>
                                          <h2 className="leading-[3.5rem] sm:leading-[1]">Elevate Your Style</h2>
                                          <h2>with our</h2>
                                          <h2 className="leading-[4rem] sm:leading-[1]"><span className='text-primary'>High</span> Quality <span className='text-primary'>Products</span></h2>
                                    </div>
                                    <button className='order_btn'>Order Now</button>
                              </div>
                              {/* image */}
                              <div className='w-full md:w-[412px] h-auto mx-auto md:ml-auto md:mr-0'>
                                    <Image
                                          src={HeroImage}
                                          alt="hoodie"
                                          className='mx-auto'
                                          priority
                                    />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Hero;