"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ProductType } from "@/types/products";
import SkeletonSchema from "./skeletonSchema";
import { Card, CardContent } from "../ui/card";

const FeaturedProducts = () => {
  const { result, loading, error } = useGetFeaturedProducts();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Productos Destacados</h2>
        <div className="text-center p-8 bg-red-50 dark:bg-red-900 rounded-xl border border-red-100 dark:border-red-700">
          <p className="text-red-600 dark:text-red-400 text-lg font-medium">Error al cargar productos destacados</p>
          <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-8 text-blue-900 dark:text-blue-400">Productos Destacados</h2>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium">Cargando productos destacados...</p>
          </div>
          <SkeletonSchema grid={4} />
        </div>
      ) : (
        <>
          {!result || result.length === 0 ? (
            <div className="text-center p-12 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-amber-100 dark:border-gray-600">
              <p className="text-amber-700 dark:text-amber-400 text-lg font-semibold">No hay productos destacados disponibles</p>
            </div>
          ) : (
            <Carousel className="w-full">
              <CarouselContent className="-ml-3">
                {result.map((product: ProductType) => {
                  if (!product?.productName) return null;

                  const { id, productName, price, images } = product;

                  const imageUrl =
                    images && Array.isArray(images) && images.length > 0 && images[0]?.url
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].url}`
                      : "/placeholder.png";

                  return (
                    <CarouselItem
                      key={id}
                      className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/6"
                    >
                      <Card className="group h-full bg-white dark:bg-gray-800 border-0 dark:border-gray-700 shadow-sm rounded-2xl overflow-hidden">
                        <CardContent className="p-0">
                          {/* Imagen del producto */}
                          <div className="relative h-36 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={productName}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                          </div>

                          {/* Contenido del producto */}
                          <div className="p-3 space-y-2">
                            <h3
                              className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight line-clamp-2 min-h-[2rem]"
                              title={productName}
                            >
                              {productName}
                            </h3>

                            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                              ${typeof price === "number" ? price.toFixed(2) : "N/A"}
                            </p>

                            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium py-2 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md">
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
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProducts;
