import Navbar from "@/components/Header/navbar";
import Footer from "@/components/Footer/footer";
import Banner from "@/components/Banners/banner";
import FeaturedProducts from "@/components/Destacados/featured-products";
import BannerCategory from "@/components/Banners/banner-category";
import FeaturedXiaomiBanner from "@/components/Destacados/featured-xiaomi-banner";
import FeaturedNextRelease from "@/components/Destacados/featured-next-release";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <FeaturedProducts />
      <BannerCategory />
      <FeaturedXiaomiBanner />
      <FeaturedNextRelease />
      <Footer />
    </main>
  );
}