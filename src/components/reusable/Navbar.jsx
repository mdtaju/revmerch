"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuthState from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase.config';

const navlinks = [
      {
            name: "Showroom",
            path: "/showroom"
      },
      {
            name: "About us",
            path: "/about"
      },
]

const Navbar = () => {
      const pathname = usePathname();
      const [navActive, setNavActive] = useState(false);
      const authState = useAuthState();
      const router = useRouter();

      function navHandler() {
            setNavActive((prevState) => !prevState);
      }

      function handleSignOut() {
            signOut(auth).then(() => {
                  navHandler();
                  router.push("/")
            })
      }

      let authContent;
      if (authState) {
            authContent = <li onClick={handleSignOut} className={`cursor-pointer hover:text-primary hover:underline common_transition`}>
                  Signout
            </li>
      } else {
            authContent = <>
                  <li onClick={navHandler} className={`cursor-pointer hover:text-primary hover:underline common_transition ${pathname === "/signin" ? "active_nav" : ""}`}>
                        <Link href={"/signin"}>
                              Signin
                        </Link>
                  </li>
                  <li onClick={navHandler} className={`cursor-pointer hover:text-primary hover:underline common_transition ${pathname === "/register" ? "active_nav" : ""}`}>
                        <Link href={"/register"}>
                              Register
                        </Link>
                  </li>
            </>
      }
      return (
            <div className='container mx-auto pt-0 md:pt-12'>
                  {/* desktop navbar start */}
                  <div className='hidden md:flex items-center justify-between'>
                        {/* logo */}
                        <Link href={"/"}>
                              <h2 className='text-4xl'><span className='text-primary'>rev</span>Merch</h2>
                        </Link>

                        {/* nav links */}
                        <nav>
                              <ul className='flex items-center text-lg gap-4'>
                                    {
                                          navlinks.map((item, i) => (
                                                <li key={i} className={`cursor-pointer hover:text-primary hover:underline common_transition ${pathname === item.path ? "active_nav" : ""}`}>
                                                      <Link href={item.path}>
                                                            {item.name}
                                                      </Link>
                                                </li>
                                          ))
                                    }
                                    {
                                          authContent
                                    }
                              </ul>
                        </nav>
                  </div>
                  {/* desktop navbar end */}

                  {/* mobile nav start */}
                  <div className='block md:hidden'>
                        <div className='p-4 flex items-center justify-between'>
                              {/* logo */}
                              <Link href={"/"}>
                                    <h2 className=' text-4xl'><span className='text-primary'>rev</span>Merch</h2>
                              </Link>

                              {/* menu button */}
                              <button onClick={navHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                              </button>

                              {/* menu lists */}
                              <div className={`fixed top-0 -left-[100%] w-full max-w-[430px] h-full bg-[#1e1e1e] bg-opacity-80 z-10 p-4 transition-all duration-300 ${navActive ? "left-[0%]" : ""}`}>
                                    {/* close button */}
                                    <div className='w-full text-right'>
                                          <button onClick={navHandler}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                          </button>
                                    </div>
                                    {/* lists */}
                                    <nav className='p-4'>
                                          <ul className='flex flex-col gap-4 text-xl '>
                                                {
                                                      navlinks.map((item, i) => (
                                                            <li onClick={navHandler} key={i} className={`cursor-pointer  common_transition ${pathname === item.path ? "active_nav" : ""}`}>
                                                                  <Link href={item.path}>
                                                                        {item.name}
                                                                  </Link>
                                                            </li>
                                                      ))
                                                }
                                                {authContent}
                                          </ul>
                                    </nav>
                              </div>
                        </div>
                  </div>
                  {/* mobile nav end */}
            </div>
      );
};

export default Navbar;