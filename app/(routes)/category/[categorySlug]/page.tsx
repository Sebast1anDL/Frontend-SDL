"use client";

import { useGetCategoryProduct } from "@/api/useGetCategoryProduct";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Navbar from "@/components/Header/navbar";
import { use } from "react";

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

const CategoryPage = ({ params }: CategoryPageProps) => {
   const { categorySlug } = use(params);
  const { result, loading, error } = useGetCategoryProduct(categorySlug);
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'featured'>('featured');

  const handleProductClick = (productSlug: string) => {
    router.push(`/product/${productSlug}`);
  };

  const getProductImageUrl = (images: any) => {
    try {
      if (Array.isArray(images) && images.length > 0) {
        const firstImage = images[0];
        if (firstImage?.url) {
          return firstImage.url.startsWith('http') 
            ? firstImage.url 
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${firstImage.url}`;
        }
      }
      return "/placeholder-product.png";
    } catch {
      return "/placeholder-product.png";
    }
  };

  const sortProducts = (products: any[]) => {
    const sorted = [...products];
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.productName.localeCompare(b.productName));
      case 'price-low':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'featured':
        return sorted.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
      default:
        return sorted;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <div className="max-w-7xl mx-auto px-4 py-16">
              <div className="animate-pulse">
                <div className="h-8 bg-white/20 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-white/20 rounded w-1/2 mb-8"></div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
                    <CardContent className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
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
              Categoría no encontrada
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              La categoría que buscas no existe o no está disponible.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Ir al inicio
            </button>
          </div>
        </div>
      </>
    );
  }

  const { categoryName, products, totalProducts, brands } = result;
  const sortedProducts = sortProducts(products);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)'
              }}
            ></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-20">
            <nav className="flex items-center space-x-2 text-sm text-white/80 mb-8">
              <button 
                onClick={() => router.push('/')}
                className="hover:text-white transition-colors duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Inicio
              </button>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white font-medium">{categoryName}</span>
            </nav>
            
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {categoryName}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="font-semibold">{totalProducts}</span>
                  <span>producto{totalProducts !== 1 ? 's' : ''}</span>
                </div>
                
                {brands.length > 0 && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-semibold">{brands.length}</span>
                    <span>marca{brands.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-4">
              {brands.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Marcas:</span>
                  {brands.slice(0, 4).map((brand) => (
                    <Badge key={brand.id} variant="secondary" className="hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-pointer">
                      {brand.brandName}
                    </Badge>
                  ))}
                  {brands.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{brands.length - 4} más
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high' | 'featured')}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Destacados</option>
                <option value="name">A-Z</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
              
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center p-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
                No hay productos disponibles
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Esta categoría no tiene productos en este momento. Te invitamos a explorar otras categorías.
              </p>
            </div>
          ) : (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product) => (
                <Card 
                  key={product.id}
                  className={`group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-gray-900/25 transition-all duration-500 transform hover:scale-[1.02] bg-white dark:bg-gray-800 ${
                    viewMode === 'list' ? 'flex flex-row h-48' : 'rounded-2xl'
                  }`}
                  onClick={() => handleProductClick(product.slug)}
                >
                  <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 ${
                    viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                  }`}>
                    <img
                      src={getProductImageUrl(product.images)}
                      alt={product.productName}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-product.png";
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardContent className={`${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''} p-6`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs font-medium">
                          {(product as any).brand?.brandName || 'Sin marca'}
                        </Badge>
                        {viewMode === 'grid' && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {product.productName}
                      </h3>
                      
                      {product.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                    
                    <div className={`flex items-center justify-between ${viewMode === 'list' ? 'mt-4' : 'mt-6'}`}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${product.price?.toLocaleString() || 'Consultar'}
                        </span>
                      </div>
                      
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100">
                        Ver detalles
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;