"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { Carousel, CarouselContent } from "../ui/carousel";
import {ResponseType} from "@/types/response";
import SkeletonSchema from "./skeletonSchema";

const FeaturedProducts = () => {
  const { result, loading, error }: ResponseType = useGetFeaturedProducts();
  console.log("Featured Products:", result, loading, error);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Productos Destacados</h2>
      
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonSchema grid={4} />}
          
          {!loading && !error && result && result.length > 0 && 
            result.map((product, index) => (
              <div key={product.id || index} className="pl-2 md:pl-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Aquí deberías agregar el contenido real del producto */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {product.attributes?.name || 'Producto'}
                    </h3>
                    <p className="text-gray-600">
                      ${product.attributes?.price || '0'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
          
          {!loading && !error && result && result.length === 0 && (
            <div className="text-gray-500 text-center w-full">
              <p>No hay productos destacados disponibles</p>
            </div>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;