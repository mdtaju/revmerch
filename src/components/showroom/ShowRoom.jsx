"use client";
import { useQuery } from "@tanstack/react-query";
import CardContainer from "./CardContainer";
import Sidebar from "./Sidebar";
import getProducts from "@/lib/getProducts";

const ShowRoom = () => {
      const { data = [] } = useQuery({ queryKey: ["products"], queryFn: async () => await getProducts() });

      return (
            <section className="container mx-auto py-[100px]">
                  <div className="flex flex-col lg:flex-row items-start gap-4">
                        <Sidebar />
                        <CardContainer
                              products={data}
                        />
                  </div>
            </section>
      );
};

export default ShowRoom;