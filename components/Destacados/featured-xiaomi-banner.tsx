"use client";

import { useGetFeaturedXiaomi } from "@/api/useGetFeaturedXiaomi";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ProductType } from "@/types/products";
import SkeletonSchema from "./skeletonSchema";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";

const FeaturedXiaomiBanner = () => {
  const { result, loading, error } = useGetFeaturedXiaomi();
  const router = useRouter();

  const handleProductClick = (productSlug: string) => {
    router.push(`/product/${productSlug}`);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center p-6 bg-red-50 dark:bg-red-900 rounded-xl border border-red-100 dark:border-red-700">
          <p className="text-red-600 dark:text-red-400 text-lg font-medium">Error al cargar productos Xiaomi destacados</p>
          <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Si no hay productos o está cargando, no mostrar el banner
  if (loading || !result || result.length === 0) {
    return loading ? (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-orange-600">
            <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium">Cargando productos Xiaomi destacados...</p>
          </div>
          <SkeletonSchema grid={3} />
        </div>
      </div>
    ) : null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header del banner con estilo Xiaomi */}
      <div className="text-center mb-8 relative">
        <div className="inline-flex items-center gap-3 mb-4">
          {/* Logo/Icono Xiaomi estilizado */}
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Mi</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Productos Xiaomi Destacados
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Descubre la innovación y calidad que caracteriza a Xiaomi con nuestra selección especial
        </p>
        
        {/* Decoración */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
        </div>
      </div>

      {/* Carousel de productos */}
      <div className="relative">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-amber-50/30 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl -z-10"></div>
        
        <div className="p-6">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {result.map((product: ProductType) => {
                if (!product?.productName) return null;

                const { id, productName, price, images, slug, brand } = product;

                const imageUrl =
                  images && Array.isArray(images) && images.length > 0 && images[0]?.url
                    ? images[0].url.startsWith('http') 
                      ? images[0].url 
                      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].url}`
                    : "/placeholder.png";

                return (
                  <CarouselItem
                    key={id}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4 xl:basis-1/5"
                  >
                    <Card 
                      className="group h-full bg-white dark:bg-gray-800 border-2 border-orange-100 dark:border-orange-800/30 shadow-lg rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-orange-300 dark:hover:border-orange-600"
                      onClick={() => handleProductClick(slug)}
                    >
                      <CardContent className="p-0">
                        {/* Imagen del producto con overlay Xiaomi */}
                        <div className="relative h-36 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={productName}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.png";
                            }}
                          />
                          
                          {/* Overlay gradiente */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-colors duration-300"></div>
                          
                          {/* Badge Xiaomi */}
                          <div className="absolute top-3 left-3">
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                              Xiaomi
                            </div>
                          </div>
                          
                          {/* Icono de ver más */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-10 h-10 bg-white/95 dark:bg-gray-900/95 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Contenido del producto */}
                        <div className="p-3 space-y-2">
                          <div className="space-y-1">
                            <h3
                              className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight line-clamp-2 min-h-[2rem] group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300"
                              title={productName}
                            >
                              {productName}
                            </h3>
                            
                            {/* Marca si está disponible */}
                            {brand && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {brand.brandName}
                              </p>
                            )}
                          </div>

                            <p className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                              ${typeof price === "number" ? price.toLocaleString() : "Consultar"}
                            </p>

                          <button 
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-medium py-2 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductClick(slug);
                            }}
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default FeaturedXiaomiBanner;