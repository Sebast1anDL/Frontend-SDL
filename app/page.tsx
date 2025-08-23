import Navbar from "@/components/Header/navbar";
import Footer from "@/components/Footer/footer";
import Banner from "@/components/Banners/banner";
import FeaturedProducts from "@/components/Destacados/featured-products";
import BannerCategory from "@/components/Banners/banner-category";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <FeaturedProducts />
      <BannerCategory />
      <Footer />
    </main>
  );
}