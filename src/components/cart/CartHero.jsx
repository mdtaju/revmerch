import CartProducts from './CartProducts';
import CartAddArea from './CartAddArea';

const CartHero = () => {
      return (
            <div className='container mx-auto py-[100px]'>
                  <div className='px-4 sm:px-0 flex flex-col items-start gap-4'>
                        {/* top-bar */}
                        <div className='px-4 h-auto sm:h-[50px] text-4xl font-semibold text-primary bg-white rounded-sm sm:rounded-full grid place-items-center'>
                              <span>Your Shopping Cart:</span>
                        </div>
                        {/* products and add container */}
                        <div className='w-full flex flex-col-reverse md:flex-row items-start gap-4 justify-between'>
                              {/* products */}
                              <CartProducts />
                              {/* add part */}
                              <CartAddArea />
                        </div>
                  </div>
            </div>
      );
};

export default CartHero;