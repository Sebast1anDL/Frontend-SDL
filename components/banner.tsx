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

export const DataBanner = [
  { id: 1, title: "Celulares Xiaomi", link: "#", img: "/xiaomiCEL.jpg" },
  { id: 2, title: "TVs Samsung", link: "#", img: "/samsungTV.jpg" },
  { id: 3, title: "Monitores Asus", link: "#", img: "/asusMON.jpg" },
  { id: 4, title: "Notbooks Lenovo", link: "#", img: "/lenovoNOT.webp" },
];

const Banner = () => {
  const router = useRouter();
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleItemClick = (link: string) => {
    if (link !== "#") {
      router.push(link);
    }
  };

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
          {DataBanner.map((item) => (
            <CarouselItem key={item.id}>
              <div
                className="relative h-48 md:h-64 lg:h-80 cursor-pointer group overflow-hidden rounded-lg shadow-lg"
                onClick={() => handleItemClick(item.link)}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={item.id === 1}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Title overlay */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-2xl mb-2">
                    {item.title.replace(/([A-Z])/g, ' $1').trim()}
                  </h2>
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-flex items-center bg-white text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                      Ver productos
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
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
        {DataBanner.map((_, index) => (
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
          style={{ width: `${(current / DataBanner.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Banner;