import { Header } from "@/components/header";
import { Coast } from "@/components/sections/coast";
import { Enquiry } from "@/components/sections/enquiry";
import { Film } from "@/components/sections/film";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Licence } from "@/components/sections/licence";
import { Reviews } from "@/components/sections/reviews";
import { Spaces } from "@/components/sections/spaces";
import { Statement } from "@/components/sections/statement";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Spaces />
        <Film />
        <Coast />
        <Licence />
        <Reviews />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
