import React from 'react';

const PurchaseDialog = ({ name, id, ...rest }) => {
      return (
            <div {...rest} className='fixed top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] w-[300px] h-auto bg-white shadow-lg rounded-md p-4'>
                  <div className='flex flex-col gap-4'>
                        <div className='text-green-600 mx-auto'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[40px] h-[40px]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                              </svg>
                        </div>
                        <h1 className='text-2xl font-semibold text-gray-800 text-center'>{`Thank you ${name}. Your order has been successfully processed.`}</h1>
                  </div>
            </div>
      );
};

export default PurchaseDialog;