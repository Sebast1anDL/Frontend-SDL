import { useEffect, useState } from "react";

interface ProductAttribute {
  name: string;
  price: number;
  description?: string;
}

interface Product {
  id: number;
  attributes: ProductAttribute;
}

interface UseGetFeaturedProductsReturn {
  result: Product[] | null;
  loading: boolean;
  error: string;
}

export function useGetFeaturedProducts(): UseGetFeaturedProductsReturn {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;
  
  const [result, setResult] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError("");
        
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        
        const json = await res.json();
        
        if (json && Array.isArray(json.data)) {
          setResult(json.data);
        } else {
          throw new Error("Estructura de respuesta inesperada");
        }
        
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : "Error al cargar los productos destacados";
        setError(errorMessage);
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [url]);

  return { result, loading, error };
}