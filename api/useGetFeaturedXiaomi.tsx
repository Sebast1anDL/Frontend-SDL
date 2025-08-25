// api/useGetFeaturedXiaomi.ts
import { useState, useEffect } from "react";
import { ResponseType } from "@/types/response";
import { ProductType } from "@/types/products";

export function useGetFeaturedXiaomi() {
  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedXiaomi = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[featuredXiaomi][$eq]=true&filters[active][$eq]=true&sort=createdAt:desc`;

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        
        if (json?.data && Array.isArray(json.data)) {
          setResult(json.data);
        } else {
          setResult([]);
        }
      } catch (err) {
        console.error("Error fetching featured Xiaomi products:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedXiaomi();
  }, []);

  return { result, loading, error };
}