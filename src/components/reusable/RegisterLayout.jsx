import Image from "next/image";
import RegisterImage from "/public/assets/images/register.png";
import { karla } from "@/utils/fonts.config";

const RegisterLayout = ({ children }) => {
      return (
            <div className={`py-[100px] w-full max-w-[1100px] mx-auto px-4 md:px-0 ${karla.className}`}>
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                        {/* content area start */}
                        <div className="w-full h-fit md:w-[500px] relative text-center md:text-left">
                              <h1 className="text-4xl sm:text-6xl leading-[75px] text-[#E32D2D] font-extrabold">
                                    Welcome to our community
                              </h1>
                              <p className="text-[16px] font-light mt-[20px]">Start your new journey with us and join our community </p>

                              <button className="register_btn mt-[300px] md:mt-[150px]" style={{ filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))" }} >
                                    Explore our community
                              </button>

                              {/* image area */}
                              <div className="absolute right-[30%] bottom-[100px] sm:bottom-[70px] md:right-[-22%] md:bottom-[2%] register_img_shadow">
                                    <Image
                                          src={RegisterImage}
                                          alt="register"
                                          className="register_animation"
                                    />
                              </div>
                        </div>
                        {/* content area end */}

                        {/* form area start */}
                        <div className="w-full max-w-[360px] mx-auto md:mx-0 mt-8 md:mt-0">
                              {children}
                        </div>
                        {/* form area end */}
                  </div>
            </div>
      );
};

export default RegisterLayout;