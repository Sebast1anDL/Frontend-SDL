"use client";

import { useGetCategories } from "@/api/useGetCategories";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/category";

const BannerCategory = () => {
  const { result, loading, error } = useGetCategories();
  const router = useRouter();

  const handleCategoryClick = (slug: string) => {
    router.push(`/category/${slug}`);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Categorías</h2>
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400 text-lg font-medium">Error al cargar categorías</p>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <Card className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!result || result.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Categorías</h2>
        <div className="text-center p-12 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-800/50 rounded-full flex items-center justify-center">
            <span className="text-2xl">📂</span>
          </div>
          <p className="text-amber-700 dark:text-amber-300 text-lg font-semibold">No hay categorías disponibles</p>
          <p className="text-amber-600 dark:text-amber-400 mt-2 text-sm">
            Asegúrate de tener categorías creadas en tu backend.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-8 text-blue-900 dark:text-blue-400">Explora por Categorías</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Encuentra exactamente lo que buscas</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {result.map((category: CategoryType) => {
          if (!category?.categoryName) return null;

          const { id, categoryName, slug, image } = category;

          // Función mejorada para obtener la URL de la imagen
          const getImageUrl = () => {
            try {
              // Debug: imprime la estructura de la imagen
              console.log('Image structure:', image);
              
              // Si image es un array y tiene elementos
              if (Array.isArray(image) && image.length > 0) {
                const firstImage = image[0];
                if (firstImage?.url) {
                  // Si la URL ya es completa (comienza con http), la usamos tal como está
                  if (firstImage.url.startsWith('http')) {
                    return firstImage.url;
                  }
                  // Si es una URL relativa, la combinamos con la URL del backend
                  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${firstImage.url}`;
                }
              }
              
              // Si image es un objeto directo (no array)
              if (image && !Array.isArray(image) && typeof image === 'object' && 'url' in image) {
                const imageObj = image as any;
                if (imageObj.url) {
                  if (imageObj.url.startsWith('http')) {
                    return imageObj.url;
                  }
                  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageObj.url}`;
                }
              }
              
              return "/placeholder-category.png";
            } catch (err) {
              console.error('Error processing image:', err);
              return "/placeholder-category.png";
            }
          };

          const imageUrl = getImageUrl();

          return (
            <Card 
              key={id}
              className="group cursor-pointer h-full border-0 shadow-lg hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-300 rounded-2xl overflow-hidden transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => handleCategoryClick(slug)}
            >
              <CardContent className="p-0 relative aspect-square">
                {/* Imagen de fondo que ocupa toda la card */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                  <img
                    src={imageUrl}
                    alt={categoryName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      console.error('Error loading image:', imageUrl);
                      (e.target as HTMLImageElement).src = "/placeholder-category.png";
                    }}
                  />
                </div>

                {/* Overlay gradiente siempre visible para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/30 transition-all duration-300"></div>
                
                {/* Overlay adicional para hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>

                {/* Contenido superpuesto */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  {/* Icono de flecha en la esquina superior derecha */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Título de la categoría */}
                  <h3 className="font-bold text-white text-xl mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {categoryName}
                  </h3>
                  
                  {/* Indicador con animación */}
                  <div className="inline-flex items-center text-sm font-medium text-white/90 group-hover:text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-80 group-hover:opacity-100">
                    Ver productos
                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Brillo sutil en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BannerCategory;