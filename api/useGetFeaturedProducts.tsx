import { useEffect, useState } from "react";

export function useGetFeaturedProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;
  
  const [result, setResult] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        const json = await res.json();
        setResult(json.data);
      } catch (err) {
        setError("Error al cargar los productos destacados");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { result, loading, error };
}
