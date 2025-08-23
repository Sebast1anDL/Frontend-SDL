import Navbar from "@/components/Header/navbar";
import Footer from "@/components/Footer/footer";
import Banner from "@/components/Destacados/banner";
import FeaturedProducts from "@/components/Destacados/featured-products";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}