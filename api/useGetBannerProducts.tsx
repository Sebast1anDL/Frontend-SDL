// api/useGetBannerProducts.ts
import { useState, useEffect } from 'react';
import { ProductType } from '@/types/products';

interface BannerProduct {
  type: 'samsung' | 'lenovo' | 'iphone' | 'asus';
  product: ProductType | null;
  img: string;
}

interface UseGetBannerProductsResult {
  result: BannerProduct[];
  loading: boolean;
  error: string;
}

export function useGetBannerProducts(): UseGetBannerProductsResult {
  const [result, setResult] = useState<BannerProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBannerProducts = async () => {
      try {
        setLoading(true);
        setError('');

        console.log('Fetching banner products...');

        // Definir los tipos de banner con sus imágenes correspondientes
        const bannerTypes = [
          { type: 'samsung' as const, field: 'samsungBanner', img: '/samsung-banner.webp' },
          { type: 'lenovo' as const, field: 'lenovoBanner', img: '/lenovo-banner.jpg' },
          { type: 'iphone' as const, field: 'iphoneBanner', img: '/iphone-banner.webp' },
          { type: 'asus' as const, field: 'asusBanner', img: '/asus-banner.webp' },
        ];

        const bannerProducts: BannerProduct[] = [];

        // Obtener productos para cada tipo de banner
        for (const banner of bannerTypes) {
          try {
            const productsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[${banner.field}][$eq]=true&filters[active][$eq]=true&populate=*&pagination[limit]=1`;
            
            console.log(`Fetching ${banner.type} banner product:`, productsUrl);
            
            const response = await fetch(productsUrl);
            
            if (!response.ok) {
              console.error(`Error fetching ${banner.type} banner product:`, response.status);
              bannerProducts.push({
                type: banner.type,
                product: null,
                img: banner.img,
              });
              continue;
            }

            const { data: productsData } = await response.json();
            
            if (productsData && productsData.length > 0) {
              const productData = productsData[0];
              
              // Transformar el producto
              const transformedProduct: ProductType = {
                id: productData.id,
                documentId: productData.documentId,
                productName: productData.productName,
                slug: productData.slug,
                description: productData.description || '',
                active: productData.active ?? true,
                isFeatured: productData.isFeatured ?? false,
                price: productData.price || 0,
                createdAt: productData.createdAt,
                updatedAt: productData.updatedAt,
                publishedAt: productData.publishedAt,
                asusBanner: productData.asusBanner ?? false,
                samsungBanner: productData.samsungBanner ?? false,
                iphoneBanner: productData.iphoneBanner ?? false,
                lenovoBanner: productData.lenovoBanner ?? false,
                nextRelease: productData.nextRelease ?? false,
                featuredXiaomi: productData.featuredXiaomi ?? false,
                images: productData.images || [],
                brand: productData.brand || null,
                category: productData.category || null,
              };

              bannerProducts.push({
                type: banner.type,
                product: transformedProduct,
                img: banner.img,
              });
            } else {
              bannerProducts.push({
                type: banner.type,
                product: null,
                img: banner.img,
              });
            }
          } catch (bannerError) {
            console.error(`Error fetching ${banner.type} banner product:`, bannerError);
            bannerProducts.push({
              type: banner.type,
              product: null,
              img: banner.img,
            });
          }
        }

        setResult(bannerProducts);

      } catch (err) {
        console.error('Error fetching banner products:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar los productos del banner');
        setResult([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerProducts();
  }, []);

  return { result, loading, error };
}