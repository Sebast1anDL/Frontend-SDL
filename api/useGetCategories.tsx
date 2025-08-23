import { useEffect, useState } from "react";
import { CategoryType } from "@/types/category";

interface UseGetCategoriesReturn {
  result: CategoryType[] | null;
  loading: boolean;
  error: string;
}

export function useGetCategories(): UseGetCategoriesReturn {
  const [result, setResult] = useState<CategoryType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=image`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();

        if (!json) {
          throw new Error("Respuesta vacía del servidor");
        }

        if (!json.data) {
          throw new Error("Respuesta sin campo 'data'");
        }

        if (!Array.isArray(json.data)) {
          throw new Error("El campo 'data' no es un array");
        }

        // Filtrar categorías válidas (Strapi v5)
        const validCategories = json.data.filter((category: any) => {
          return category.categoryName && category.slug;
        });
        
        setResult(validCategories);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error desconocido al cargar categorías";
        setError(errorMessage);
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
      fetchCategories();
    } else {
      setError("NEXT_PUBLIC_BACKEND_URL no está configurado");
      setLoading(false);
    }
  }, []);

  return { result, loading, error };
}