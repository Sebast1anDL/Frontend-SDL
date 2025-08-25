"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useGetBannerProducts } from "@/api/useGetBannerProducts";

// Fallback data en caso de error o carga
const FallbackBannerData = [
  { id: 1, type: "samsung", link: "#", img: "/samsung-banner.webp" },
  { id: 2, type: "lenovo", link: "#", img: "/lenovo-banner.jpg" },
  { id: 3, type: "iphone", link: "#", img: "/iphone-banner.webp" },
  { id: 4, type: "asus", link: "#", img: "/asus-banner.webp" },
];

const Banner = () => {
  const router = useRouter();
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const { result: bannerProducts, loading, error } = useGetBannerProducts();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleItemClick = (product: any) => {
    if (product?.slug) {
      router.push(`/product/${product.slug}`);
    }
  };

  // Si está cargando, mostrar skeleton
  if (loading) {
    return (
      <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
        <div className="w-full">
          <div className="animate-pulse">
            <div className="relative h-48 md:h-64 lg:h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // Usar datos dinámicos o fallback
  const bannerData = bannerProducts.length > 0 ? bannerProducts : FallbackBannerData.map(item => ({
    type: item.type,
    product: null,
    img: item.img
  }));

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {bannerData.map((item, index) => (
            <CarouselItem key={index}>
              <div
                className="relative h-48 md:h-64 lg:h-80 cursor-pointer group overflow-hidden rounded-lg shadow-lg"
                onClick={() => handleItemClick(item.product)}
              >
                <Image
                  src={item.img}
                  alt={item.product?.productName || `Banner ${item.type}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  {item.product ? (
                    <>
                      <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-2xl mb-2">
                        {item.product.productName}
                      </h2>
                      <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="inline-flex items-center bg-white text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                          Ver producto
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-white">
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-2xl mb-2 capitalize">
                        {item.type}
                      </h2>
                      <p className="text-white/80 text-sm md:text-base">
                        Próximamente
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black border-0 shadow-xl backdrop-blur-sm w-12 h-12" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black border-0 shadow-xl backdrop-blur-sm w-12 h-12" />
      </Carousel>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index + 1 
                ? "bg-blue-600 scale-110" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar opcional */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <div 
          className="bg-blue-600 h-1 transition-all duration-300 rounded-full"
          style={{ width: `${(current / bannerData.length) * 100}%` }}
        />
      </div>

      {/* Debug info (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm">Error cargando banners: {error}</p>
          <p className="text-xs mt-2">Usando datos de fallback.</p>
        </div>
      )}
    </div>
  );
};

export default Banner;