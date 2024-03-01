"use client";
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import { fetchPromotion } from "@/lib/features/promotion/promotionSlice";
import { fetchProducts } from "@/lib/features/products/productsSlice";
import { clearTheCart, promotionDiscount } from "@/lib/features/cart/cartSlice";
import setOrder from "@/lib/setOrder";
import useAuthState from "../provider/AuthProvider";
import PurchaseDialog from "../reusable/PurchaseDialog";

const CartProducts = () => {
      const cartItems = useSelector(state => state.cart);
      const promotion = useSelector(state => state.promotion.promotionInfo)
      const [inputPromotion, setInputPromotion] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const [orderSuccess, setOrderSuccess] = useState(false);
      const dispatch = useDispatch();
      const auth = useAuthState()

      useEffect(() => {
            dispatch(fetchProducts())
      }, [dispatch]);

      function handlePromotionApply() {
            dispatch(fetchPromotion(inputPromotion)).then((data) => {
                  dispatch(promotionDiscount(data.payload.percent))
            })
      }

      async function handlePlaceOrder() {
            setIsLoading(true);
            await setOrder({
                  products: cartItems.cartArray,
                  user_id: auth.uid,
                  user_name: auth.displayName,
                  user_email: auth.email,
                  grand_total: cartItems.cartTotal,
                  applied_promotion: promotion.code ? promotion.code : "Not-Applied"
            }).then(async () => {
                  console.log(cartItems.cartArray)
                  const IDs = cartItems.cartArray.map(item => {
                        return item.id
                  })
                  dispatch(clearTheCart(IDs)).then(() => {
                        setTimeout(() => setOrderSuccess(false), 4000);
                        setOrderSuccess(true);
                        setIsLoading(false);
                  }).catch(() => {
                        setIsLoading(false);
                  })
            }).catch(() => {
                  setIsLoading(false);
            })
      }

      return (
            <div className="flex-1 py-[50px]">
                  <div className="w-full space-y-3">
                        {
                              cartItems.cartArray.map((product) => (
                                    <CartProduct
                                          key={product.id}
                                          product={product}
                                    />
                              ))
                        }
                  </div>
                  {/* promotions and total */}
                  <div className="mt-[100px]">
                        {/* promotions */}
                        <div>
                              <h1 className="text-3xl font-semibold">Promotion Code:</h1>
                              <div className="flex items-center gap-4 mt-2">
                                    <input value={inputPromotion} onChange={(e) => setInputPromotion(e.target.value)} type="text" name="" id="" className="bg-white border border-gray-400 p-1 px-3 text-black" placeholder="Enter a code" />
                                    <button onClick={handlePromotionApply} className="order_btn text-sm">Apply</button>
                              </div>
                        </div>
                        {/* total */}
                        <div className="flex flex-wrap gap-4 mt-[50px]">
                              <div className="bg-primary px-3 flex items-center">
                                    <h5 className="pr-2">Total to pay:</h5>
                                    <div className="py-3 pl-2 border-l border-white">{`${cartItems.cartTotal} DT`}</div>
                              </div>
                              {/* order btn */}
                              <button disabled={isLoading} onClick={handlePlaceOrder} className="order_btn text-sm bg-white text-primary">{isLoading ? "loading..." : "Order Now"}</button>
                        </div>
                  </div>
                  {/* dialog */}
                  {
                        orderSuccess &&
                        <PurchaseDialog
                              name={auth.displayName}
                        />
                  }
            </div>
      );
};

export default CartProducts;