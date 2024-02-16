import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Offer from "@/components/home/offer";
import Subscription from "@/components/home/subscription";

export default function Home() {
  return <main>
    <Hero />
    <Features />
    <Subscription />
    <Offer />
  </main>;
}
