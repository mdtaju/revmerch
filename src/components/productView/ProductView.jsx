import ImageView from "./ImageView";
import InfoArea from "./InfoArea";
import WhiteHoodie from "/public/assets/images/hero_hoodie.svg";
import WhiteHoodie1 from "/public/assets/images/hero_hoodie_1.png";
import WhiteHoodie2 from "/public/assets/images/hero_hoodie_2.png";

const productImages = [
      WhiteHoodie,
      WhiteHoodie1,
      WhiteHoodie2
]

const ProductView = () => {
      return (
            <section className="container mx-auto py-[100px]">
                  <div className="w-full max-w-[1100px] mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 items-start">
                        {/* product view area */}
                        <ImageView
                              productImages={productImages}
                        />

                        {/* product details area */}
                        <InfoArea>
                              <h2 className='text-4xl'>Product Name</h2>
                              <h5 className='text-4xl'>100 <span className='text-primary'>TD</span></h5>
                        </InfoArea>
                  </div>
            </section>
      );
};

export default ProductView;