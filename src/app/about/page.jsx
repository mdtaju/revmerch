import Image from "next/image";
import Map from "/public/assets/images/map.png";


const About = () => {
      return (
            <main>
                  <section className="container mx-auto py-[100px] px-4 md:px-0">
                        <div className="bg-primary w-full p-4 md:p-8 rounded-[30px] md:rounded-[62px] grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* map */}
                              <div className="">
                                    <Image
                                          src={Map}
                                          alt="address"
                                          className="rounded-[37px]"
                                    />
                              </div>
                              {/* info */}
                              <div className="space-y-6 text-2xl font-bold">
                                    <p>4 Street ibn fares,Sousse,Tunisia</p>
                                    <p>+216 99999999</p>
                                    <p>Instagram Page here</p>
                                    <p>Tiktok Page here</p>
                                    <p>Email here</p>
                              </div>
                        </div>
                  </section>
            </main>
      );
};

export default About;