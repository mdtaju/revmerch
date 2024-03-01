import ProductView from "@/components/productView/ProductView";

const ProductPage = ({ params }) => {
      const getProductId = params?.productId.split("-").pop();
      return (
            <main>
                  <ProductView
                        id={getProductId}
                  />
            </main>
      );
};

export default ProductPage;