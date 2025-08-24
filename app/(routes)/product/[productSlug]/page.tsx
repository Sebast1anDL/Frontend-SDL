"use client";

import { useGetProductBySlug } from "@/api/useGetProductBySlug";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Header/navbar";
import Footer from "@/components/Footer/footer";
import { use } from "react";

interface ProductPageProps {
  params: Promise<{
    productSlug: string;
  }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const resolvedParams = use(params);
  const { productSlug } = resolvedParams;
  
  console.log('Product page productSlug:', productSlug); // Debug log
  const { result, loading, error } = useGetProductBySlug(productSlug);
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const getProductImageUrl = (images: any) => {
    try {
      if (Array.isArray(images) && images.length > 0) {
        const image = images[selectedImageIndex] || images[0];
        if (image?.url) {
          return image.url.startsWith('http') 
            ? image.url 
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`;
        }
      }
      return "/placeholder-product.png";
    } catch {
      return "/placeholder-product.png";
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              {/* Breadcrumb skeleton */}
              <div className="flex items-center space-x-2 mb-8">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image skeleton */}
                <div>
                  <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4"></div>
                  <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    ))}
                  </div>
                </div>

                {/* Content skeleton */}
                <div className="space-y-6">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                  </div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-red-100 dark:border-red-800 max-w-md mx-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Error al cargar
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => router.back()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Volver atrás
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!result) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md mx-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Producto no encontrado
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              El producto que buscas no existe o no está disponible.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Ir al inicio
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const product = result;

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <button 
              onClick={() => router.push('/')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {product.category && (
              <>
                <button 
                  onClick={() => router.push(`/category/${product.category?.slug}`)}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {product.category.categoryName}
                </button>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
            <span className="text-gray-900 dark:text-white font-medium">{product.productName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={getProductImageUrl(product.images)}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-product.png";
                  }}
                />
              </div>

              {/* Image Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image: any, index: number) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImageIndex === index
                          ? 'border-blue-600 ring-2 ring-blue-200'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url.startsWith('http') ? image.url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                        alt={`${product.productName} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-product.png";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product Name & Brand */}
              <div>
                {product.brand && (
                  <Badge variant="outline" className="mb-3">
                    {product.brand.brandName}
                  </Badge>
                )}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.productName}
                </h1>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${product.price?.toLocaleString() || 'Consultar precio'}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Precio en pesos uruguayos (UYU)
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      Descripción
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Product Details */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                    Detalles del producto
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {product.category && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Categoría:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {product.category.categoryName}
                        </p>
                      </div>
                    )}
                    {product.brand && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Marca:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {product.brand.brandName}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Estado:</span>
                      <p className={`font-medium ${product.active ? 'text-green-600' : 'text-red-600'}`}>
                        {product.active ? 'Disponible' : 'No disponible'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">SKU:</span>
                      <p className="font-medium text-gray-900 dark:text-white font-mono text-xs">
                        {product.documentId}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={!product.active}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                  </svg>
                  {product.active ? 'Agregar al carrito' : 'No disponible'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1 sm:flex-none border-2 border-gray-200 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favoritos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;