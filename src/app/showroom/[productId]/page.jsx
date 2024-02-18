import ProductView from "@/components/productView/ProductView";

const ProductPage = ({ params }) => {
      const getProductId = params?.productId.split("-").pop();
      return (
            <main>
                  <ProductView />
            </main>
      );
};

export default ProductPage;