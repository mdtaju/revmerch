import CardContainer from "./CardContainer";
import Sidebar from "./Sidebar";

const productColors = [
      {
            name: "black",
            color: "#1C1C1C"
      },
      {
            name: "purple",
            color: "#803B90"
      },
      {
            name: "red",
            color: "#E0342C"
      },
      {
            name: "orange",
            color: "#EE632F"
      },
      {
            name: "cyan",
            color: "#2084BD"
      },
      {
            name: "green",
            color: "#73B144"
      },
      {
            name: "orange",
            color: "#EE632F"
      },
      {
            name: "cyan",
            color: "#2084BD"
      },
      {
            name: "green",
            color: "#73B144"
      },
]

const products = [
      {
            name: "Full slave cotton high quality fabric Black hoodie",
            price: 99,
            feedback: 4.5,
            reviews: "20",
            colors: productColors,
            type: "New"
      },
      {
            name: "Tunisia Hoodie",
            price: 199,
            feedback: 5,
            reviews: "20",
            colors: productColors,
            type: "New"
      },
      {
            name: "Winter Hoodie",
            price: 150,
            feedback: 4,
            reviews: "20",
            colors: productColors,
            type: "New"
      },
      {
            name: "Summer Hoodie",
            price: 50,
            feedback: 3,
            reviews: "50",
            colors: productColors,
            type: "new"
      },
]

const ShowRoom = () => {
      return (
            <section className="container mx-auto py-[100px]">
                  <div className="flex flex-col lg:flex-row items-start gap-4">
                        <Sidebar />
                        <CardContainer
                              products={products}
                        />
                  </div>
            </section>
      );
};

export default ShowRoom;