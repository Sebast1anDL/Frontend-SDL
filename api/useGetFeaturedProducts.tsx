import { useEffect, useState } from "react";
import { ProductType } from "@/types/products";

interface UseGetFeaturedProductsReturn {
  result: ProductType[] | null;
  loading: boolean;
  error: string;
}

export function useGetFeaturedProducts(): UseGetFeaturedProductsReturn {
  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();

        if (!json || !json.data || !Array.isArray(json.data)) {
          throw new Error("Estructura de respuesta inesperada");
        }

        setResult(json.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error desconocido al cargar productos destacados";
        setError(errorMessage);
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
      fetchFeaturedProducts();
    } else {
      setError("NEXT_PUBLIC_BACKEND_URL no está configurado");
      setLoading(false);
    }
  }, []);

  return { result, loading, error };
}
