// api/useGetProductBySlug.ts
import { useState, useEffect } from 'react';
import { ProductType } from '@/types/products';

interface UseGetProductBySlugResult {
  result: ProductType | null;
  loading: boolean;
  error: string;
}

export function useGetProductBySlug(slug: string): UseGetProductBySlugResult {
  const [result, setResult] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      console.log('Fetching product with slug:', slug); // Debug log
      
      if (!slug) {
        console.log('No slug provided'); // Debug log
        setError('Slug del producto no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        // Diferentes formatos de URL para probar con Strapi v5
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
        
        console.log('Fetching URL:', url); // Debug log
        console.log('BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL); // Debug log
        
        const response = await fetch(url);
        
        console.log('Response status:', response.status); // Debug log
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText); // Debug log
          throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
        }

        const { data } = await response.json();
        
        if (!data || data.length === 0) {
          setResult(null);
          return;
        }

        // Strapi v5 devuelve el producto como el primer elemento del array
        const productData = data[0];
        
        // Transformar la respuesta de Strapi v5 al formato esperado
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
          images: productData.images || [],
          brand: productData.brand || null,
          category: productData.category || null,
        };

        setResult(transformedProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar el producto');
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { result, loading, error };
}