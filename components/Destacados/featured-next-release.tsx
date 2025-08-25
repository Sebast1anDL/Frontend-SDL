"use client";

import { useGetNextReleaseProducts } from "@/api/useGetNextReleaseProducts";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ProductType } from "@/types/products";
import SkeletonSchema from "./skeletonSchema";
import { Card, CardContent } from "../ui/card";

const FeaturedNextRelease = () => {
  const { result, loading, error } = useGetNextReleaseProducts();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center p-6 bg-red-50 dark:bg-red-900 rounded-xl border border-red-100 dark:border-red-700">
          <p className="text-red-600 dark:text-red-400 text-lg font-medium">Error al cargar próximos lanzamientos</p>
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
          <div className="flex items-center gap-2 text-purple-600">
            <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium">Cargando próximos lanzamientos...</p>
          </div>
          <SkeletonSchema grid={3} />
        </div>
      </div>
    ) : null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header sofisticado */}
      <div className="text-center mb-10 relative">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 via-indigo-100/20 to-blue-100/20 dark:from-purple-900/10 dark:via-indigo-900/10 dark:to-blue-900/10 rounded-3xl blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-4 mb-6">
            {/* Icono futurista */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              {/* Efecto de resplandor */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            </div>

            <div className="text-left">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Próximos Lanzamientos
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Coming Soon</span>
                <div className="w-8 h-[1px] bg-gradient-to-r from-purple-400 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Descubre las innovaciones que están por llegar. Estos productos revolucionarios estarán disponibles próximamente
          </p>
        </div>
      </div>

      {/* Carousel de productos */}
      <div className="relative">
        {/* Fondo decorativo avanzado */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/50 via-gray-50/30 to-slate-50/50 dark:from-slate-900/30 dark:via-gray-900/20 dark:to-slate-900/30 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-transparent to-blue-50/20 dark:from-purple-900/5 dark:via-transparent dark:to-blue-900/5 rounded-3xl"></div>
        
        <div className="relative z-10 p-8">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {result.map((product: ProductType) => {
                if (!product?.productName) return null;

                const { id, productName, price, images, brand } = product;

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
                    <Card className="group h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/90 dark:hover:bg-gray-800/90">
                      <CardContent className="p-0">
                        {/* Imagen con efectos sofisticados */}
                        <div className="relative h-36 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={productName}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter group-hover:brightness-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.png";
                            }}
                          />
                          
                          {/* Overlay gradiente sofisticado */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-purple-500/10 group-hover:from-black/50 transition-all duration-500"></div>
                          
                          {/* Badge "Coming Soon" */}
                          <div className="absolute top-3 left-3">
                            <div className="relative">
                              <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-2xl">
                                Coming Soon
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-full blur-md opacity-30 animate-pulse"></div>
                            </div>
                          </div>
                          
                          {/* Icono de info */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                            <div className="w-8 h-8 bg-white/95 dark:bg-gray-900/95 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20">
                              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>

                          {/* Efecto de brillo en hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] duration-1000"></div>
                        </div>

                        {/* Contenido del producto */}
                        <div className="p-3 space-y-2">
                          <div className="space-y-1">
                            <h3
                              className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight line-clamp-2 min-h-[2rem] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                              title={productName}
                            >
                              {productName}
                            </h3>
                            
                            {/* Marca si está disponible */}
                            {brand && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium opacity-75">
                                {brand.brandName}
                              </p>
                            )}
                          </div>

                          {/* Precio con estilo futurista */}
                          <div className="space-y-2">
                            <p className="text-lg font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                              ${typeof price === "number" ? price.toLocaleString() : "Por anunciar"}
                            </p>

                            {/* Botón deshabilitado estilizado */}
                            <div className="relative">
                              <button 
                                disabled
                                className="w-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium py-2 rounded-xl transition-all duration-300 cursor-not-allowed opacity-75 relative overflow-hidden"
                              >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                  Próximamente
                                </span>
                                
                                {/* Efecto de espera */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] animate-pulse"></div>
                              </button>
                              
                              {/* Texto adicional */}
                              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 font-medium">
                                Disponible pronto
                              </p>
                            </div>
                          </div>
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

export default FeaturedNextRelease;