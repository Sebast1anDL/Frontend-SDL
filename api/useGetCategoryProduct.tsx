import { useEffect, useState } from "react";
import { CategoryWithProducts } from "@/types/category-with-products";
import { ProductType } from "@/types/products";

interface UseGetCategoryProductReturn {
  result: CategoryWithProducts | null;
  loading: boolean;
  error: string;
}

export function useGetCategoryProduct(slug: string | string[]): UseGetCategoryProductReturn {
  const [result, setResult] = useState<CategoryWithProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryWithProducts = async () => {
      try {
        setLoading(true);
        setError("");

        // Normalizar el slug (puede venir como array de Next.js)
        const categorySlug = Array.isArray(slug) ? slug[0] : slug;
        
        if (!categorySlug) {
          throw new Error("Slug de categoría no válido");
        }

        console.log("Buscando categoría con slug:", categorySlug);

        // Step 1: Obtener la categoría con sus marcas y los productos de esas marcas
        const categoryUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?filters[slug][$eq]=${categorySlug}&populate[brands][populate][products][populate]=*&populate=image`;
        
        console.log("URL de categoría:", categoryUrl);

        const categoryResponse = await fetch(categoryUrl);
        
        if (!categoryResponse.ok) {
          throw new Error(`Error HTTP ${categoryResponse.status}: ${categoryResponse.statusText}`);
        }

        const categoryData = await categoryResponse.json();
        console.log("Respuesta de categoría:", categoryData);

        if (!categoryData.data || categoryData.data.length === 0) {
          throw new Error("Categoría no encontrada");
        }

        const category = categoryData.data[0]; // Tomamos la primera (debería ser única por slug)
        
        // Step 2: Extraer todos los productos de todas las marcas de esta categoría
        const allProducts: ProductType[] = [];
        const brandInfo: Array<{id: number, brandName: string, slug: string}> = [];

        if (category.brands && Array.isArray(category.brands)) {
          category.brands.forEach((brand: any) => {
            // Guardar info de la marca
            brandInfo.push({
              id: brand.id,
              brandName: brand.brandName,
              slug: brand.slug
            });

            // Extraer productos de esta marca
            if (brand.products && Array.isArray(brand.products)) {
              brand.products.forEach((product: any) => {
                // Solo agregar productos activos
                if (product.active !== false) {
                  allProducts.push({
                    ...product,
                    brand: {
                      id: brand.id,
                      brandName: brand.brandName,
                      slug: brand.slug
                    }
                  });
                }
              });
            }
          });
        }

        // Step 3: Construir el resultado final
        const categoryWithProducts: CategoryWithProducts = {
          id: category.id,
          documentId: category.documentId,
          categoryName: category.categoryName,
          slug: category.slug,
          image: category.image,
          products: allProducts,
          totalProducts: allProducts.length,
          brands: brandInfo,
          // Agregar otros campos de CategoryType que tengas
        };

        console.log(`Categoría encontrada: ${category.categoryName}`);
        console.log(`Total de marcas: ${brandInfo.length}`);
        console.log(`Total de productos: ${allProducts.length}`);

        setResult(categoryWithProducts);

      } catch (err) {
        console.error("Error en useGetCategoryProduct:", err);
        const errorMessage = err instanceof Error ? err.message : "Error desconocido al cargar categoría y productos";
        setError(errorMessage);
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    if (process.env.NEXT_PUBLIC_BACKEND_URL && slug) {
      fetchCategoryWithProducts();
    } else {
      setError("NEXT_PUBLIC_BACKEND_URL no está configurado o slug no válido");
      setLoading(false);
    }
  }, [slug]);

  return { result, loading, error };
}