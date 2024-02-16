import Logo from "../../../public/assets/images/revmerch_logo.svg";
import Image from 'next/image';
import { jost, poppins } from '@/utils/fonts.config';
import ScrollToTop from './ScrollToTop';

const Footer = () => {

      return (
            <footer className={`w-full max-w-[1100px] mx-auto py-[100px] mt-[100px] ${jost.className}`}>
                  <div className='px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[200px] relative'>
                        {/* info area */}
                        <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
                              {/* logo */}
                              <div className='min-w-[130px] min-h-[35px]'>
                                    <Image
                                          src={Logo}
                                          alt='revmerch'
                                    />
                              </div>
                              {/* info */}
                              <div className='flex flex-col items-start gap-[100px] text-center md:text-start'>
                                    <p className='text-2xl mt-[-5px]'>123 Market St. #22B
                                          Charlottesville, California 44635</p>
                                    <div className='w-full text-xs flex flex-col gap-4 items-center md:items-start underline'>
                                          <span>(216) 99999999</span>
                                          <span>contact@lift.agency</span>
                                    </div>
                              </div>
                        </div>

                        {/* links */}
                        <div className={`${poppins.className} space-y-[50px] md:space-y-[150px] mt-[50px] md:mt-0`}>
                              <div className='flex flex-col sm:flex-row items-center sm:items-start gap-[50px] sm:gap-[100px] opacity-75'>
                                    {/* nav links */}
                                    <ul className='footer_links'>
                                          <li className='footer_link'>About</li>
                                          <li className='footer_link'>Partners</li>
                                          <li className='footer_link'>Contact</li>
                                    </ul>
                                    {/* social links */}
                                    <ul className='footer_links'>
                                          <li className='footer_link'>Facebook</li>
                                          <li className='footer_link'>Instagram</li>
                                          <li className='footer_link'>TikTok</li>
                                    </ul>
                              </div>
                              <p className='text-xs opacity-65 text-center md:text-left'>© 2024 RevMerch. All rights reserved.</p>
                        </div>

                        {/* scroll to top */}
                        <div className='absolute right-4 top-[-60px] sm:top-[-100px] md:top-[-25px]'>
                              <ScrollToTop />
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;