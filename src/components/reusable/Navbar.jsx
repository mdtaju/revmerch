"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuthState from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '@/lib/features/cart/cartSlice';

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
      const cartItems = useSelector(state => state.cart.cartArray);
      const dispatch = useDispatch();
      const authState = useAuthState();

      const router = useRouter();

      useEffect(() => {
            if (authState?.uid) {
                  dispatch(fetchCartItems(authState?.uid));
            }
      }, [authState?.uid, dispatch]);

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
            authContent = <><li onClick={handleSignOut} className={`cursor-pointer hover:text-primary hover:underline common_transition`}>
                  Signout
            </li>
            </>
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
                                    <li className={`cursor-pointer hover:text-primary hover:underline common_transition relative ${pathname === "/cart" ? "active_nav" : ""}`}>
                                          <Link href={"/cart"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                                <span className='absolute -top-[8px] -right-[12px] bg-primary text-white text-xs font-light w-[20px] h-[20px] rounded-full grid place-items-center'>{cartItems.length}</span>
                                          </Link>
                                    </li>
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
                                                <li onClick={navHandler} className={`cursor-pointer hover:text-primary hover:underline common_transition relative ${pathname === "/cart" ? "active_nav" : ""}`}>
                                                      <Link href={"/cart"}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                            </svg>
                                                            <span className='absolute -top-[8px] -right-[12px] bg-primary text-white text-xs font-light w-[20px] h-[20px] rounded-full grid place-items-center'>10</span>
                                                      </Link>
                                                </li>
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