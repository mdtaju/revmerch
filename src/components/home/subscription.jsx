
const Subscription = () => {
      return (
            <section className='w-full max-w-[1990px] mx-auto bg-primary py-[80px] px-4'>
                  <div className='container mx-auto'>
                        <div className='flex items-center justify-between flex-col md:flex-row gap-8'>
                              {/* info */}
                              <div className='w-full md:w-[40%]'>
                                    <p className='text-3xl'>Subscribe to our newsletter for the latest news and win amazing gifts</p>
                              </div>
                              {/* mail input */}
                              <div className='w-full md:w-[40%]'>
                                    <div className='w-full flex items-center justify-between border-b border-gray-300'>
                                          <input type="email" className='w-[260px] sm:flex-1 bg-transparent py-2 outline-none text-gray-300 placeholder:text-gray-300 text-3xl font-normal' placeholder='Enter Email' />
                                          {/* up icon */}
                                          <button className='p-1'>
                                                <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M14.0625 9.63995C13.8875 9.63995 13.6833 9.55995 13.5667 9.35995L7.5 2.79995L1.43333 9.35995C1.2875 9.51995 1.1125 9.63995 0.937499 9.63995C0.704166 9.63995 0.529165 9.51995 0.383332 9.27995C0.0916652 8.83995 0.120832 8.19995 0.441666 7.79995L6.975 0.639946L7.03333 0.559947C7.0625 0.519947 7.09167 0.519947 7.09167 0.479947C7.12083 0.479947 7.12083 0.439946 7.15 0.439946C7.17917 0.439946 7.20833 0.399947 7.20833 0.399947C7.2375 0.399947 7.26667 0.359947 7.26667 0.359947C7.29583 0.359947 7.325 0.359946 7.325 0.319946H7.5875C7.61667 0.319946 7.64583 0.319947 7.64583 0.359947C7.675 0.359947 7.70417 0.399947 7.70417 0.399947C7.73333 0.399947 7.7625 0.439946 7.7625 0.439946C7.79167 0.439946 7.79167 0.479947 7.82083 0.479947C7.85 0.479947 7.85 0.519947 7.87917 0.559947C7.90833 0.599947 7.9375 0.599946 7.9375 0.639946L14.5583 7.79995C14.7333 7.99995 14.8208 8.27995 14.8208 8.55995C14.8208 8.79995 14.7625 9.07995 14.6167 9.23995C14.4708 9.51995 14.2667 9.63995 14.0625 9.63995Z" fill="white" />
                                                </svg>
                                          </button>
                                    </div>
                                    <label htmlFor="terms" className='flex items-center gap-1 cursor-pointer mt-2'>
                                          <input type="checkbox" name="" id="terms" className='cursor-pointer w-[16px] h-[16px] bg-transparent text-transparent border border-gray-200' />
                                          <span>I AGREE TO RECIVE EMAILS FROM REVMERCH.</span>
                                    </label>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default Subscription;